import { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Web3ReactProvider } from '@web3-react/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import '../theme/main.css';
import Layout from './Layout';
import { darkTheme, lightTheme } from '../theme/materialUiTheme';
import { getLibrary } from '../utils/web3ConnectFunctions';
import { useTheme } from '../hooks';

const App = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.style.setProperty(
      `--mainBackground`,
      theme === 'light' ? lightTheme.palette.background.main : darkTheme.palette.background.main
    );
  }, [theme]);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Layout />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Web3ReactProvider>
  );
};

export default App;
