import { SET_IS_FETCHING, REMOVE_IS_FETCHING } from '../actions/types';

export default function (state = false, action) {
  switch (action.type) {
    case SET_IS_FETCHING:
      return true;
    case REMOVE_IS_FETCHING:
      return false;
    default:
      return state;
  }
}
