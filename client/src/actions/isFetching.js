export const SET_IS_FETCHING = 'set_isFetching';
export const REMOVE_IS_FETCHING = 'remove_isFetching';

export const start = () => {
  return { type: SET_IS_FETCHING };
};
export const stop = () => {
  return { type: REMOVE_IS_FETCHING };
};

export default {
  start,
  stop,
};
