import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  mainContainer: {
    background: '#000',
  },
  innerContainer: {
    backgroundColor: theme.palette.background.dialog,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: '10px',
    textTransform: 'uppercase',
  },
  content: {
    color: theme.palette.text.primary,
    fontSize: '12px',
    width: '100%',
    '& p': {
      textAlign: 'start',
    },
  },
  colored: {
    color: theme.palette.primary.main,
    fontWeight: '500',
  },
  checkboxWrapper: {
    width: '100%',
    marfinTop: '10px',
  },
  checkbox: {
    '& span': {
      fontSize: '12px',
      letterSpacing: '1px',
      fontFamily: 'Montserrat',
    },
  },
}));
