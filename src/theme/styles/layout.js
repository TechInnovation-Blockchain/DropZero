import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.background.main,
    color: theme.palette.text.primary,
    height: '100vh',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    '@media(550px)': {
      padding: '0',
    },
  },
  container: {
    background: theme.palette.background.secondary,
    margin: theme.spacing(0, 0.5),
    borderRadius: 30,
    border: `3px solid ${theme.palette.primary.main}`,
    width: '450px',
    '@media(max-width:550px)': {
      width: '100%',
    },
  },
}));
