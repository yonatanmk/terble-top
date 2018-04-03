import React from 'react';

export default ({ game, getBestPlayers }) => (
  <div>
    <h2>{game.name}</h2>
    <p>{game.minPlayers} to {game.maxPlayers} players</p>
    {game.bestPlayers && <p>Best with {game.bestPlayers} players</p>}
    {!game.bestPlayers &&
      <button className="get-best-player-button" onClick={getBestPlayers}>
        Get Best Player Number
      </button>
    }
    <img src={game.image} alt={game.name} width="200" />
  </div>
);
