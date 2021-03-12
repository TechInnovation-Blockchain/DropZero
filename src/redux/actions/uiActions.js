import * as uiTypes from '../types/uiTypes';

export const toggleTheme = () => {
  return dispatch => {
    dispatch({ type: uiTypes.TOGGLE_THEME });
  };
};

export const setLoading = data => {
  return dispatch => {
    dispatch({ type: uiTypes.LOADING, data });
  };
};
