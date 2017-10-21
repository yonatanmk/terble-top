import React from 'react';

export default ({ game }) => (
  <div>
    <h2>{game.name}</h2>
    <p>{game.minPlayers} to {game.maxPlayers} players</p>
    <img src={game.image} alt={game.name} width="200" />
  </div>
);
