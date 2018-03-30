const roundRating = rating => {
  return Math.round( rating * 10) / 10
};

const getBestPlayerNumber = json => {
  const bestNumPlayerPoll = json.boardgames.boardgame.poll
    .find((poll) => poll.name === 'suggested_numplayers');
  const bestplayerNum = bestNumPlayerPoll.results.sort((a, b) => {
    return getBestPlayerNumvotes(b) - getBestPlayerNumvotes(a);
  })[0];
  return bestplayerNum.numplayers;
};

const getBestPlayerNumvotes = option => {
  const result = option.result;
  const best = result.find( a => a.value === 'Best');
  return best.numvotes;
};

const parsers = {
  getBestPlayerNumber,
  roundRating,
};

module.exports = parsers;
