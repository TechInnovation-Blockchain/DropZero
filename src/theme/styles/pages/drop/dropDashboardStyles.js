import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  mainContainer: {
    height: '300px',
  },
  lightText: {
    color: theme.palette.text.secondary,
  },
}));
