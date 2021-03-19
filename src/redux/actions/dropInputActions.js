import * as dropInputTypes from '../types/dropInputTypes';

export const saveFields = data => {
  return dispatch => {
    dispatch({ type: dropInputTypes.SAVE_FIELDS, payload: data });
  };
};
