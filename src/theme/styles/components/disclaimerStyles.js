import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  mainContainer: {
    background: '#000',
    height: 'auto !important',
    backgroundColor: theme.palette.background.dialog,
    '& .MuiDialogActions-root': {
      justifyContent: 'center',
    },
  },
  heading: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    width: '100%',
    textAlign: 'center',
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
