import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  mainContainer: {
    width: '320px',
    margin: 0,
    borderRadius: 15,
    padding: theme.spacing(3, 0),
    backgroundColor: theme.palette.background.dialog,
  },
  innerContainer: {
    backgroundColor: theme.palette.background.dialog,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  content: {
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '25px',
    marginBottom: '10px',
    color: theme.palette.text.primary,
    width: '80%',
    '@media(max-width:330px)': {
      width: '100%',
      fontSize: '14px',
    },
  },
  renderContent: {
    '& p, span': {
      fontWeight: 'bold',
      fontSize: '16px',
      lineHeight: '25px',
      color: theme.palette.text.primary,
      width: '85%',
      margin: '0 auto',
      '@media(max-width:330px)': {
        width: '100%',
        fontSize: '14px',
      },
    },
    marginBottom: '10px',
  },
  closeBtn: {
    position: 'absolute',
    right: 12,
    top: 12,
    color: theme.palette.text.secondary,
    cursor: 'pointer',
  },
  secondaryText: {
    fontSize: '12px',
    color: theme.palette.text.secondary,
    width: '100%',
    lineHeight: '20px',
    marginBottom: '10px',
  },
  errorMsg: {
    color: theme.palette.error.main,
    fontWeight: 700,
    fontSize: '12px',
    marginBottom: '10px',
  },
  icon: {
    fontSize: '100px',
    marginBottom: '10px',
    color: theme.palette.primary.main,
  },
  externalLink: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.main,
    '& p': {
      fontSize: '12px',
    },
    '& svg': {
      fontSize: '20px',
      marginRight: '5px',
    },
  },
}));
