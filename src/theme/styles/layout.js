import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme.palette.background.main,
    color: theme.palette.text.primary,
    padding: theme.spacing(4, 0),
    minHeight: '90vh',
  },
  container: {
    background: theme.palette.background.secondary,
    // background: theme.palette.background.primary,
    margin: theme.spacing(0, 0.5),
    borderRadius: 30,
    border: `3px solid ${theme.palette.primary.main}`,
    width: '450px',
    marginBottom: '20px',
    // padding: 0,
    overflowX: 'hidden',
    '@media(max-width:550px)': {
      width: '95%',
    },
  },
}));
