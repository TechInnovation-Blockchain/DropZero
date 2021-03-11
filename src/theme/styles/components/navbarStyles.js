import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  mainContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: theme.spacing(2, 1),
    background: theme.palette.background.secondary,
  },
  navlink: {
    textDecoration: 'none',
    color: theme.palette.text.secondary,
    padding: theme.spacing(0, 1.5),
    textTransform: 'uppercase',
    '& .MuiTypography-body2': {
      letterSpacing: 5,
    },
  },
  activeNavlink: {
    color: theme.palette.text.primary,
  },
  navTypography: {
    fontWeight: 600,
  },
  logo: {
    cursor: 'pointer',
  },
}));
