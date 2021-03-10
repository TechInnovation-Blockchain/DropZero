import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  mainContainer: {
    textAlign: 'center',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
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
  },
  token: {
    backgroundColor: theme.palette.background.input,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(1, 0),
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
}));
