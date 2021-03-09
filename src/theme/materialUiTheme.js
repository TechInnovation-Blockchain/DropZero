import { createMuiTheme } from '@material-ui/core/styles';

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#65C988',
    },
    background: {
      main: '#1F1F1F',
      primary: '#121212',
      secondary: '#292929',
    },
    text: {
      primary: '#fff',
      secondary: '#C5C5C5',
    },
    typography: {
      fontFamily: 'Montserrat',
    },
    border: {
      lightBorder: '#333',
    },
  },
});

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#65C988',
    },
    background: {
      main: '#F5F5F5',
      primary: '#121212',
      secondary: '#FFFFFF',
    },
    text: {
      primary: '#000',
      secondary: '#666',
    },
    typography: {
      fontFamily: 'Montserrat',
    },
    border: {
      lightBorder: '#ccc',
    },
  },
});
