const mongoose = require('mongoose');
const rp = require('request-promise');
const parser = require('xml2json');

const { getBestPlayerNumber, roundRating } = require('./bbg-api-parse');
const { hasKeys } = require('./misc');

const Game = mongoose.model('games');

const REQUIRED_GAME_KEYS = ['gameId', 'name', 'minPlayers', 'maxPlayers', 'averageRating'];

const ignoreGame = bbgGame => {
  const { owned, isExpansion } = bbgGame;

  return !owned ||
    isExpansion ||
    !hasKeys(bbgGame, REQUIRED_GAME_KEYS);
};

const createGameFromBBG = bbgGame => {
  const {
    gameId,
    name,
    image,
    maxPlayers,
    minPlayers,
    averageRating,
  } = bbgGame;

  const rating = roundRating(averageRating);

  return {
    _id: gameId,
    name,
    image,
    maxPlayers,
    minPlayers,
    rating,
  };
};

const saveGameFromBBG = bbgGame => {
  const { gameId } = bbgGame;

  return Game.findOne({ _id: gameId })
    .then(dbGame => {
      if (dbGame && dbGame.bestPlayers) {
        return;
      }
      return rp(`https://www.boardgamegeek.com/xmlapi/boardgame/${gameId}?&stats=1`)
        .then(body => {
          const json = JSON.parse(parser.toJson(body));
          const bestPlayers = getBestPlayerNumber(json);
          return { dbGame, bestPlayers };
        })
        .catch(() => {
          if (dbGame) {
            console.log(`ERROR: Cant Update ${bbgGame && bbgGame.name}. ID ${bbgGame.gameId}`);
          } else {
            console.log(`ERROR: Saving ${bbgGame && bbgGame.name} without bestPlayers`);
            const game = createGameFromBBG(bbgGame);
            (new Game(game)).save();
          }
        });
    })
    .then(body => {
      const { dbGame, bestPlayers } = body;
      if (dbGame) {
        console.log(`SUCCESS: Updating ${bbgGame && bbgGame.name} with bestPlayers`);
        dbGame.bestPlayers = bestPlayers;
        dbGame.save();
      } else {
        console.log(`SUCCESS: Saving ${bbgGame && bbgGame.name} with bestPlayers`);
        const game = { ...createGameFromBBG(bbgGame), bestPlayers };
        (new Game(game)).save();
      }
    });
};

const utils = {
  saveGameFromBBG,
  ignoreGame,
};

module.exports = utils;
