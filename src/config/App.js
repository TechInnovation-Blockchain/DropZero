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
    // document.body.style.setProperty(
    //   'background-color',
    //   theme === 'light' ? lightTheme.palette.background.main : darkTheme.palette.background.main
    // );
  }, [theme]);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <Layout />
      </ThemeProvider>
    </Web3ReactProvider>
  );
};

export default App;
