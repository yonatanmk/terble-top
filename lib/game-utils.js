const shouldUpdateGame = (dbGame, bbgGame) => {
  // if no dbGame, return true
  return !dbGame;
};

const utils = {
  shouldUpdateGame,
};

module.exports = utils;
