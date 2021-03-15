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
      color: '#fff',
      fontSize: '14px',
      letterSpacing: '1.5px',
    },
    '@media(max-width:550px)': {
      width: '120px',
      '& span': {
        margin: '0 5px',
      },
    },
    boxShadow: 'none',
  },
  disabled: {
    background: `${theme.palette.background.disabled} !important`,
    '& span': {
      margin: '0 10px',
      color: `${theme.palette.text.disabled} !important`,
      fontSize: '14px',
      letterSpacing: '1.5px',
    },
    '& svg': {
      color: `${theme.palette.text.disabled} !important`,
    },
  },
}));
