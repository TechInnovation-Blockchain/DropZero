import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  overlay: {
    position: 'absolute',
    backgroundColor: theme.palette.background.overlay,
    width: '102%',
    height: '70px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& span': {
      fontSize: '20px',
      fontWeight: 'bold',
      fontFamily: 'Montserrat',
      letterSpacing: '2px',
      color: '#fff',
    },
  },
}));
