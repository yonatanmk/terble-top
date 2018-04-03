import { FETCH_GAMES, UPDATE_GAME } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_GAMES:
      return action.payload || [];
    case UPDATE_GAME:
      const { payload } = action;
      const gamesArray = state.map(game => {
        return game._id === payload._id ? payload : game;
      });
      return payload ? gamesArray : state;
    default:
      return state;
  }
}
