import axios from 'axios';
import { FETCH_USER, FETCH_GAMES } from './types';

export const fetchUser = () => dispatch => {
  axios
    .get('/api/current_user')
    .then(res => dispatch({ type: FETCH_USER, payload: res.data }));
};

export const fetchGames = bbgUsername => dispatch => {
  axios
    .post('/api/games', { bbgUsername })
    .then(res => dispatch({ type: FETCH_GAMES, payload: res.data }));
};

export const createBBGUsername = bbgUsername => dispatch => {
  axios
    .post('/api/add-bbg-username', { bbgUsername })
    .then(res => dispatch({ type: FETCH_USER, payload: res.data }));
};
