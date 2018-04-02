import axios from 'axios';

export const FETCH_GAMES = 'fetch_games';

export const fetchGames = () => dispatch => {
  return axios
    .get('/api/games')
    .then(res => dispatch({ type: FETCH_GAMES, payload: res.data }));
};
