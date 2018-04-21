import axios from 'axios';

import isFetching from './isFetching';
import { fetchGames } from './games';

export const FETCH_USER = 'fetch_user';

export const fetchUser = () => dispatch => {
  isFetching.start(dispatch);
  return axios
    .get('/api/current_user')
    .then(res => {
      dispatch({ type: FETCH_USER, payload: res.data })
      return res.data;
    })
    .then(user => {
      if (user) {
        dispatch(fetchGames())
      }
    })
    .finally(() => isFetching.stop(dispatch));
};

export const createBBGUsername = bbgUsername => dispatch => {
  isFetching.start(dispatch);
  return axios
    .post('/api/fetch-games', { bbgUsername })
    .then(res => dispatch({ type: FETCH_USER, payload: res.data }))
    .then(() => dispatch(fetchGames()))
    .finally(() => isFetching.stop(dispatch));
};
