import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  mainContainer: {
    textAlign: 'center',
    minHeight: '370px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& button[disabled]': {
      color: theme.palette.text.secondary,
    },
  },
  logo: {
    width: '60px',
  },
  heading: {
    fontWeight: 'bolder',
    marginBottom: '10px',
  },

  tokenContainer: {
    width: '100%',
    height: '230px',
  },

  secondaryText: {
    color: theme.palette.text.secondary,
  },
  progress: {
    height: '370px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
