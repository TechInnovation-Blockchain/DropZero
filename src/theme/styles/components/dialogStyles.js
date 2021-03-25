import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  mainContainer: {
    width: '320px',
    minHeight: '320px',
    margin: 0,
    borderRadius: 15,
    '@media(max-width:330px)': {
      width: '250px',
      // minHeight: '250px',
    },
  },
  innerContainer: {
    backgroundColor: theme.palette.background.dialog,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative',
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
    fontWeight: 'bolder ',
    marginBottom: '10px',
  },
}));
