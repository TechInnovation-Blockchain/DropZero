import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
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
  },
}));
