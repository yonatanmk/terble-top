export const sortGames = (games, playerNumber) => {
  const goldGames = [];
  const silverGames = [];
  games.forEach(game => {
    if (game.bestPlayers === parseInt(playerNumber, 10)) {
      goldGames.push(game);
    } else {
      silverGames.push(game);
    }
  });
  return [
    ...goldGames.sort(gameNameAlphabeticalSort),
    ...silverGames.sort(gameNameAlphabeticalSort),
  ];
};

const gameNameAlphabeticalSort = (a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
};
