const mongoose = require('mongoose');
const rp = require('request-promise');
const parser = require('xml2json');

const { getBestPlayerNumber, roundRating } = require('./bbg-api-parse');

const Game = mongoose.model('games');

const saveGameFromBBG = bbgGame => {
  const {
    gameId,
    name,
    image,
    maxPlayers,
    minPlayers,
    averageRating,
    owned,
    isExpansion,
  } = bbgGame;

  if (!owned || isExpansion) {
    return;
  }
  Game.findOne({ _id: bbgGame.gameId })
    .then(dbGame => {
      if (dbGame && dbGame.bestPlayers) {
        return;
      } else if (dbGame) {
        rp(`https://www.boardgamegeek.com/xmlapi/boardgame/${gameId}?&stats=1`)
          .then(body => {
            const json = JSON.parse(parser.toJson(body));
            dbGame.bestPlayers = getBestPlayerNumber(json);
            console.log(`Updating ${bbgGame && bbgGame.name} with bestPlayers`);
            dbGame.save();
          })
          .catch(err => {
            console.log('Error Fetching Rating');
            console.log(`Not Updating ${bbgGame && bbgGame.name} with bestPlayers`);
          });
      } else {
        const rating = roundRating(averageRating);
        const game = {
          _id: gameId,
          name,
          image,
          maxPlayers,
          minPlayers,
          rating,
        };
        rp(`https://www.boardgamegeek.com/xmlapi/boardgame/${gameId}?&stats=1`)
          .then(body => {
            const json = JSON.parse(parser.toJson(body));
            game.bestPlayers = getBestPlayerNumber(json);
            console.log(`Saving ${bbgGame && bbgGame.name} with bestPlayers`);
            (new Game(game)).save();
          })
          .catch(err => {
            console.log('Error Fetching Rating');
            console.log(`Saving ${bbgGame && bbgGame.name} without bestPlayers`);
            (new Game(game)).save();
          });
      }
    });
}

const utils = {
  saveGameFromBBG,
};

module.exports = utils;
