import { ThemeProvider } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import '../theme/main.css';
import Layout from './Layout';
import { darkTheme, lightTheme } from '../theme/materialUiTheme';

const App = () => {
  const theme = useSelector(state => state.ui.theme);
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Layout />
    </ThemeProvider>
  );
};

export default App;
