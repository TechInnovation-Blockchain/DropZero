import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 0),
    fontWeight: '1000',
    fontSize: '16px',
    color: '#000',
    borderRadius: 2,
    width: '150px',
    margin: theme.spacing(1, 0),
    '& svg': {
      color: '#fff',
      width: '20px',
    },
    '& span': {
      margin: '0 10px',
    },
  },
}));
