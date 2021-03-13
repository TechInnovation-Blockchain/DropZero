import { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';

import '../theme/main.css';
import Layout from './Layout';
import { darkTheme, lightTheme } from '../theme/materialUiTheme';
import { getLibrary } from '../utils/web3ConnectFunctions';

const App = () => {
  const theme = useSelector(state => state.ui.theme);

  useEffect(() => {
    document.body.style.setProperty(
      `--mainBackground`,
      theme === 'light'
        ? lightTheme.palette.background.primary
        : darkTheme.palette.background.primary
    );
  }, [theme]);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <Layout />
      </ThemeProvider>
    </Web3ReactProvider>
  );
};

export default App;
