import axios from 'axios';

export const FETCH_USER = 'fetch_user';

export const fetchUser = () => dispatch => {
  axios
    .get('/api/current_user')
    .then(res => dispatch({ type: FETCH_USER, payload: res.data }));
};

export const createBBGUsername = bbgUsername => dispatch => {
  axios
    .post('/api/add-bbg-username', { bbgUsername })
    .then(res => dispatch({ type: FETCH_USER, payload: res.data }));
};
