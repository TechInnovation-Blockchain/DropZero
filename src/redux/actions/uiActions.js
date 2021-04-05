import * as uiTypes from '../types/uiTypes';
import { store } from '../store';

export const toggleTheme = () => {
  return dispatch => {
    dispatch({ type: uiTypes.TOGGLE_THEME });
  };
};

export const setLoading = data => {
  return dispatch =>
    dispatch({
      type: uiTypes.LOADING,
      payload: data,
    });
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

export const initiallyRendered = () => {
  return dispatch => {
    dispatch({ type: uiTypes.INITIALLY_RENDERED });
  };
};

export const showModal = data => {
  store.dispatch({
    type: uiTypes.SHOW_MODAL,
    payload: data,
  });
};

export const showSnackbarInDeep = data => {
  store.dispatch({
    type: uiTypes.SHOW_SNACKBAR_INDEEP,
    payload: data,
  });
};

export const transactionPending = (snackBar, modal) => {
  store.dispatch({
    type: uiTypes.SHOW_SNACKBAR_INDEEP,
    payload: { message: 'Transaction Pending', severity: 'info', ...snackBar },
  });

  store.dispatch({
    type: uiTypes.SHOW_MODAL,
    payload: { variant: 'loading', open: true, showCloseBtn: true, ...modal },
  });

  store.dispatch({
    type: uiTypes.LOADING,
    payload: { dapp: true },
  });
};

export const transactionSuccess = (snackBar, modal) => {
  store.dispatch({
    type: uiTypes.SHOW_SNACKBAR_INDEEP,
    payload: { message: 'Transaction Successful', severity: 'success', ...snackBar },
  });

  store.dispatch({
    type: uiTypes.SHOW_MODAL,
    payload: { variant: 'success', open: true, showCloseBtn: true, btnText: 'Close', ...modal },
  });

  store.dispatch({
    type: uiTypes.LOADING,
    payload: { dapp: false },
  });
};

export const transactionRejected = (snackBar, modal) => {
  store.dispatch({
    type: uiTypes.SHOW_SNACKBAR_INDEEP,
    payload: { message: 'Transaction Rejected', severity: 'error', ...snackBar },
  });

  store.dispatch({
    type: uiTypes.SHOW_MODAL,
    payload: { variant: 'error', open: true, showCloseBtn: true, btnText: 'Dismiss', ...modal },
  });

  store.dispatch({
    type: uiTypes.LOADING,
    payload: { dapp: false },
  });
};

export const transactionFailed = (snackBar, modal) => {
  store.dispatch({
    type: uiTypes.SHOW_SNACKBAR_INDEEP,
    payload: { message: 'Transaction Failed', severity: 'error', ...snackBar },
  });

  store.dispatch({
    type: uiTypes.SHOW_MODAL,
    payload: { variant: 'error', open: true, showCloseBtn: true, btnText: 'Dismiss', ...modal },
  });

  store.dispatch({
    type: uiTypes.LOADING,
    payload: { dapp: false },
  });
};
