import { FETCH_GAMES } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_GAMES:
      return action.payload || [];
    default:
      return state;
  }
}
