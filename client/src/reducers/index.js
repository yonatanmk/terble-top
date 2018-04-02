import { combineReducers } from 'redux';
import userReducer from './userReducer';
import gamesReducer from './gamesReducer';
import isFetchingReducer from './isFetchingReducer';

export default combineReducers({
  user: userReducer,
  games: gamesReducer,
  isFetching: isFetchingReducer,
});
