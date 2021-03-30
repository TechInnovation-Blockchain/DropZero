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
  },

  tokenContainer: {
    width: '100%',
    height: '180px',
  },
  token: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px auto',
    width: '95%',
    height: '80px',
    backgroundColor: theme.palette.background.secondary,
    border: `3px solid ${theme.palette.background.secondary}`,
    borderRadius: 5,
    padding: theme.spacing(0, 2),
    boxSizing: 'border-box',
    position: 'relative',

    '& img': {
      width: '30px',
      height: '30px',
      objectFit: 'contain',
      marginRight: '10px',
    },
    // cursor: 'pointer',
  },
  // tokenInfo: {
  //   textAlign: 'left',
  //   display: 'flex',
  //   alignItems: 'center',
  //   '& p': {
  //     marginLeft: 10,
  //     textTrasform: 'uppercase',
  //     fontWeight: '600',
  //     fontSize: '16px',
  //   },
  // },
  tokenInfo: {
    display: 'flex',
    alignItems: 'center',
    '& p': {
      fontSize: '18px',
      fontWeight: 600,
    },
    // '& p:last-child': {
    //   fontSize: '12px',
    //   color: theme.palette.text.secondary,
    //   fontWeight: '500',
    //   marginTop: '5px',
    // },
  },
  tokenDetail: {
    textAlign: 'center',
    '& p': {
      margin: theme.spacing(0.5, 0),
      fontWeight: '500',
      '&:first-child': {
        color: theme.palette.primary.main,
        fontWeight: '600',
        fontSize: '16px',
      },
    },
  },
  selected: {
    backgroundColor: theme.palette.background.dialog,
    borderRadius: 10,
    border: `3px solid ${theme.palette.primary.main}}`,
  },
  secondaryText: {
    color: theme.palette.text.secondary,
  },
}));
