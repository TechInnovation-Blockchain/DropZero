import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  footer: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    // '& a': {
    //   color: theme.palette.text.secondary,
    //   marginRight: '15px',
    //   '&:hover': {
    //     color: theme.palette.text.primary,
    //   },
    // },
    '& p': {
      cursor: 'pointer',
      color: theme.palette.text.secondary,
      marginRight: '15px',
      '&:hover': {
        color: theme.palette.text.primary,
      },
    },
    '@media(max-width:550px)': {
      width: '100%',
      justifyContent: 'space-around',
      bottom: 10,
      right: 0,
      left: 0,
      '& p': {
        margin: 0,
        fontSize: '12px',
        letterSpacing: '2px',
      },
    },
    '@media(max-width:330px)': {
      flexDirection: 'column',
      position: 'static',
      '& p': {
        margin: theme.spacing(0.5, 0),
      },
    },
  },
}));
