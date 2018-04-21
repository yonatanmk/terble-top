export const SET_IS_FETCHING = 'set_isFetching';
export const REMOVE_IS_FETCHING = 'remove_isFetching';

export default {
  fetchCount: 0,
  start(dispatch) {
    this.fetchCount += 1;
    if (this.fetchCount === 1) {
      dispatch({ type: SET_IS_FETCHING });
    }
  },
  stop(dispatch) {
    if (this.fetchCount > 0) {
      this.fetchCount -= 1;
    }
    if (this.fetchCount === 0) {
      dispatch({ type: REMOVE_IS_FETCHING });
    }
  },
};
