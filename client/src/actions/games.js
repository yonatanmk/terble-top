import axios from 'axios';

export const FETCH_GAMES = 'fetch_games';
export const UPDATE_GAME = 'update_game';

export const fetchGames = () => dispatch => {
  return axios
    .get('/api/games')
    .then(res => dispatch({ type: FETCH_GAMES, payload: res.data }));
};

export const getBestPlayers = gameId => dispatch => {
  return axios
    .post('/api/get-best-players', { gameId })
    .then(res => dispatch({ type: UPDATE_GAME, payload: res.data }));
};
