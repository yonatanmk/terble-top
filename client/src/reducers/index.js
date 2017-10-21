import { combineReducers } from 'redux';
import authReducer from './authReducer';
import gamesReducer from './gamesReducer';

export default combineReducers({
  auth: authReducer,
  games: gamesReducer,
});
