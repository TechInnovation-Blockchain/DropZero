import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  mainContainer: {
    textAlign: 'center',
    minHeight: '350px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // background: 'red',
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

  tokenContainer: {
    width: '100%',
    height: '200px',
    overflowY: 'auto',
  },
  token: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '15px auto',
    width: '95%',
    // height: '50px',
    height: '80px',
    backgroundColor: theme.palette.background.input,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 10,
    padding: '0 10px',
    boxSizing: 'border-box',
    '& p': {
      fontSize: '12px',
      fontWeight: 'bolder',
      margin: '3px 0',
    },
    '& img': {
      width: '30px',
      height: '30px',
      objectFit: 'contain',
    },
    cursor: 'pointer',
  },

  selected: {
    backgroundColor: theme.palette.background.dialog,
    borderRadius: 10,
    border: `5px solid ${theme.palette.primary.main}}`,
  },

  secondaryText: {
    color: theme.palette.text.secondary,
  },
}));
