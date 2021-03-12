import { createMuiTheme } from '@material-ui/core/styles';

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#65C988',
    },
    background: {
      // main: '#121212',
      main: '#000',
      primary: '#121212',
      secondary: '#292929',
      input: '#000',
      dialog: '#0A0A0A',
      accordion: '#424242',
      secondary2: '#000',
    },
    text: {
      primary: '#fff',
      secondary: '#C5C5C5',
    },
    border: {
      lightBorder: '#333',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
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
      // primary: '#121212',
      primary: '#fff',
      // secondary: '#fff',
      secondary: '#F5F5F5',
      input: '#F5F5F5',
      dialog: '#fff',
      accordion: '#F5F5F5',
      secondary2: '#fff',
    },
    text: {
      primary: '#000',
      secondary: '#666',
    },
    border: {
      lightBorder: '#E7E8EA',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
});
