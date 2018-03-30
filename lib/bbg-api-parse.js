const getBestPlayerNumvotes = option => {
  const { result } = option;
  const best = result.find(a => a.value === 'Best');
  return best.numvotes;
};

const getBestPlayerNumber = json => {
  const bestNumPlayerPoll = json.boardgames.boardgame.poll
    .find(poll => poll.name === 'suggested_numplayers');
  const bestplayerNum = bestNumPlayerPoll.results.sort((a, b) => getBestPlayerNumvotes(b) - getBestPlayerNumvotes(a))[0];
  return bestplayerNum.numplayers;
};

const roundRating = rating => Math.round(rating * 10) / 10;

const parsers = {
  getBestPlayerNumber,
  roundRating,
};

module.exports = parsers;
