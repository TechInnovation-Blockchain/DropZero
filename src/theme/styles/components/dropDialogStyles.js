import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  mainContainer: {
    width: '320px',
    height: '320px',
    margin: 0,
    borderRadius: 15,
    '@media(max-width:330px)': {
      width: '250px',
      height: '250px',
    },
  },
  innerContainer: {
    backgroundColor: theme.palette.background.dialog,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    '& p': {
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
  },
}));
