import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  mainContainer: {
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    margin: '0 auto',
  },
  para: {
    fontWeight: 'bolder',
    width: '80%',
    margin: '8px auto',
    fontSize: '16px',
    wordSpacing: '3px',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
}));
