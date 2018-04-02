import axios from 'axios';

import isFetching from './isFetching'

export const FETCH_USER = 'fetch_user';

export const fetchUser = () => dispatch => {
  dispatch(isFetching.start());
  axios
    .get('/api/current_user')
    .then(res => dispatch({ type: FETCH_USER, payload: res.data }))
    .finally(() => dispatch(isFetching.stop()));
};

export const createBBGUsername = bbgUsername => dispatch => {
  dispatch(isFetching.start());
  axios
    .post('/api/add-bbg-username', { bbgUsername })
    .then(res => dispatch({ type: FETCH_USER, payload: res.data }))
    .finally(() => dispatch(isFetching.stop()));
};
