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

const saveOrUpdateGame = targetGame => {
  const { gameId } = targetGame;

  return Game.findOne({ _id: gameId })
    .then(dbGame => {
      if (dbGame && dbGame.bestPlayers) {
        return;
      }
      return rp(`https://www.boardgamegeek.com/xmlapi/boardgame/${gameId}?&stats=1`)
        .then(body => {
          const json = JSON.parse(parser.toJson(body));
          const bestPlayers = getBestPlayerNumber(json);
          if (dbGame) {
            console.log(`SUCCESS: Updating ${dbGame && dbGame.name} with bestPlayers`);
            dbGame.bestPlayers = bestPlayers;
            return dbGame.save();
          }
          console.log(`SUCCESS: Saving ${targetGame && targetGame.name} with bestPlayers`);
          const game = { ...createGameFromBBG(targetGame), bestPlayers };
          return (new Game(game)).save();
        })
        .catch(() => {
          if (dbGame) {
            console.log(`ERROR: Cant Update ${dbGame && dbGame.name}. ID ${dbGame._id}`);
            return dbGame;
          }
          console.log(`ERROR: Saving ${targetGame && targetGame.name} without bestPlayers`);
          const game = createGameFromBBG(targetGame);
          return (new Game(game)).save();
        });
    });
};

const utils = {
  saveOrUpdateGame,
  ignoreGame,
};

module.exports = utils;
