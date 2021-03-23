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
    margin: '10px auto',
    width: '80%',
    height: '50px',
    backgroundColor: theme.palette.background.input,
    border: `1px solid ${theme.palette.primary.main}`,
    // backgroundColor: theme.palette.background.secondary,
    // border: `1px solid ${theme.palette.background.secondary}`,
    borderRadius: 10,
    '& p': {
      fontWeight: 'bolder',
    },
    cursor: 'pointer',
  },

  selected: {
    backgroundColor: theme.palette.primary.main,
    // border: `1px solid #fff`,
    // border: `3px solid ${theme.palette.primary.main}`,
    borderRadius: 10,
  },

  secondaryText: {
    color: theme.palette.text.secondary,
  },
}));
