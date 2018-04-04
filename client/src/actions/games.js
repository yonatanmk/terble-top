import axios from 'axios';

import isFetching from './isFetching';
import { FETCH_USER } from './users';

export const SET_GAMES = 'set_games';
export const UPDATE_GAME = 'update_game';

export const fetchGames = () => dispatch => {
  return axios
    .get('/api/games')
    .then(res => dispatch({ type: SET_GAMES, payload: res.data }));
};

export const getBestPlayers = gameId => dispatch => {
  return axios
    .post('/api/get-best-players', { gameId })
    .then(res => dispatch({ type: UPDATE_GAME, payload: res.data }))
    .catch(err => console.log(err));
};

export const refreshGames = () => dispatch => {
  dispatch(isFetching.start());
  return axios
    .post('/api/fetch-games')
    .then(res => dispatch({ type: FETCH_USER, payload: res.data }))
    .then(() => dispatch(fetchGames()))
    .finally(() => dispatch(isFetching.stop()));
};
