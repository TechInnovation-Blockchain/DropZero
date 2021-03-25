import * as uiTypes from '../types/uiTypes';

export const toggleTheme = () => {
  return dispatch => {
    dispatch({ type: uiTypes.TOGGLE_THEME });
  };
};

export const setLoading = data => {
  return dispatch => {
    dispatch({ type: uiTypes.LOADING, payload: data });
  };
};

export const showSnackbar = data => {
  return dispatch => {
    dispatch({ type: uiTypes.SHOW_SNACKBAR, payload: data });
  };
};

export const hideSnackbar = () => {
  return dispatch => {
    dispatch({ type: uiTypes.HIDE_SNACKBAR });
  };
};
