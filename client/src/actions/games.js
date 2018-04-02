import axios from 'axios';

export const FETCH_GAMES = 'fetch_games';

export const fetchGames = () => dispatch => {
  console.log('Fetching Games')
  axios
    .get('/api/games')
    .then(res => dispatch({ type: FETCH_GAMES, payload: res.data }));
};
