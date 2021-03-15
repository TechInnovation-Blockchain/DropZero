import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  mainContainer: {
    textAlign: 'center',
    minHeight: '350px',
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
    position: 'absolute',
    top: 20,
  },
  tokenContainer: {
    width: '100%',
    height: '200px',
    overflowY: 'auto',
  },
  token: {
    backgroundColor: theme.palette.background.input,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px auto',
    width: '80%',
    height: '50px',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 10,
    '& p': {
      fontWeight: 'bolder',
    },
    cursor: 'pointer',
  },
  selected: {
    backgroundColor: theme.palette.primary.main,
  },
  secondaryText: {
    color: theme.palette.text.secondary,
  },
}));
