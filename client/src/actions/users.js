import axios from 'axios';

import isFetching from './isFetching';
import { fetchGames } from './games';

export const FETCH_USER = 'fetch_user';

export const fetchUser = () => dispatch => {
  dispatch(isFetching.start());
  return axios
    .get('/api/current_user')
    .then(res => dispatch({ type: FETCH_USER, payload: res.data }))
    .then(() => dispatch(fetchGames()))
    .finally(() => dispatch(isFetching.stop()));
};

export const createBBGUsername = bbgUsername => dispatch => {
  dispatch(isFetching.start());
  return axios
    .post('/api/fetch-games', { bbgUsername })
    .then(res => dispatch({ type: FETCH_USER, payload: res.data }))
    .then(() => dispatch(fetchGames()))
    .finally(() => dispatch(isFetching.stop()));
};
