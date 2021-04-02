import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    '& p': {
      fontSize: '10px',
      cursor: 'pointer',
      color: theme.palette.text.secondary,
      '&:hover': {
        color: theme.palette.text.primary,
      },
    },
    '& p:first-child': {
      marginRight: '15px',
    },
  },
}));
