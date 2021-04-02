import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.background.main,
    color: theme.palette.text.primary,
    padding: theme.spacing(4, 0),
    minHeight: '100vh',
    boxSizing: 'border-box',
    position: 'relative',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage:
      'radial-gradient(50% 50% at 50% 50%, rgba(149, 255, 133, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
  },
  lightMainBox: {
    backgroundImage:
      'radial-gradient(50% 50% at 50% 50%, rgba(149, 255, 133, 0.3) 0%, rgba(255, 255, 255, 0) 100%)',
  },
  // mainBox: {
  //   backgroundPosition: 'center',
  //   backgroundRepeat: 'no-repeat',
  //   backgroundImage:
  //     'radial-gradient(50% 50% at 50% 50%, rgba(149, 255, 133, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
  //   width: '100%',
  //   display: 'flex',
  //   justifyContent: 'center',
  // },
  container: {
    background: theme.palette.background.primary,
    margin: theme.spacing(0, 0.5),
    borderRadius: 30,
    border: `3px solid ${theme.palette.primary.main}`,
    width: '450px',
    marginBottom: '20px',
    padding: 0,
    overflowX: 'hidden',
    '@media(max-width:550px)': {
      width: '95%',
    },
  },
  innerContainer: {
    '@media(max-width:330px)': {
      padding: '5px',
    },
  },
}));
