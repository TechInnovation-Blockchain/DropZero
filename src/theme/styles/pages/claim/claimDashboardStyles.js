import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  gridItem: {
    padding: theme.spacing(1.5, 1),
    textAlign: 'center',
  },
  lightText: {
    color: theme.palette.text.secondary,
  },
}));
