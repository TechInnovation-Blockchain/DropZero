import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  collapse: {
    background: theme.palette.background.secondary,
    // background: theme.palette.background.primary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    width: '100%',
    borderTop: `1px solid ${theme.palette.border.lightBorder}`,
    padding: theme.spacing(1, 0, 2, 0),
    '& svg': {
      color: '#7AE668',
    },
  },
  triggerText: {
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 5,
  },
}));
