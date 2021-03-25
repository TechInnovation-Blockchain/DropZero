import { useSelector } from 'react-redux';

import { toggleTheme, setLoading, showSnackbar, hideSnackbar } from '../redux';
import { useDispatchWrap } from './utilHooks';

export const useTheme = () => {
  const theme = useSelector(state => state.ui.theme);
  const toggleThemeF = useDispatchWrap(toggleTheme);

  return { theme, toggleThemeF };
};

export const useLoading = () => {
  const loading = useSelector(state => state.ui.loading);
  const setLoadingF = useDispatchWrap(setLoading);

  return { loading, setLoadingF };
};

export const useSnackbar = () => {
  const snackbar = useSelector(state => state.ui.snackbar);
  const showSnackbarF = useDispatchWrap(showSnackbar);
  const hideSnackbarF = useDispatchWrap(hideSnackbar);

  return { ...snackbar, showSnackbarF, hideSnackbarF };
};
