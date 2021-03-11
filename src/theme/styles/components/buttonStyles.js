import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 0),
    fontWeight: '600',
    fontSize: '16px',
    color: '#fff',
    borderRadius: 2,
    width: '150px',
    '& svg': {
      color: '#fff',
      width: '20px',
    },
    '& span': {
      margin: '0 10px',
    },
    '@media(max-width:550px)': {
      width: '120px',
      '& span': {
        margin: '0 5px',
      },
    },
  },
}));
