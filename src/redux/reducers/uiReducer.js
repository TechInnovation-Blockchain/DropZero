import * as uiTypes from '../types/uiTypes';

const initialState = {
  theme: localStorage.getItem('theme') || 'dark',
  loading: { walletConnection: false },
  snackbar: { open: false },
};

const uiReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case uiTypes.TOGGLE_THEME:
      const theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', theme);
      return { ...state, theme };
    case uiTypes.LOADING:
      return { ...state, loading: { ...state.loading, ...payload } };
    case uiTypes.SHOW_SNACKBAR:
      return { ...state, snackbar: { open: true, ...payload } };
    case uiTypes.HIDE_SNACKBAR:
      return { ...state, snackbar: { open: false } };
    default:
      return state;
  }
};

export default uiReducer;
