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
    position: 'relative',
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
    '& svg': {
      position: 'absolute',
      right: 12,
      top: 12,
      color: theme.palette.text.secondary,
      cursor: 'pointer',
      '&:hover': {
        color: theme.palette.text.primary,
      },
    },
  },
  accordionBtn: {
    fontSize: '14px',
    width: '150px',
    margin: '8px auto',
    display: 'flex',
  },
}));
