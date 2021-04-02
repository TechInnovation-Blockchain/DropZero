import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  collapse: {
    background: theme.palette.background.primary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    width: '100%',
    borderTop: `1px solid ${theme.palette.border.lightBorder}`,
    padding: theme.spacing(1, 0, 2, 0),
    '& svg': {
      color: theme.palette.primary.main,
    },
    '&:hover p': {
      color: theme.palette.primary.main,
    },
  },
  hideBorder: {
    border: 'none',
  },
  triggerText: {
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 5,
  },
  noWallet: {
    height: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& p': {
      color: theme.palette.error.main,
      fontWeight: 700,
      fontSize: '14px',
    },
  },
  noData: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    '& p': {
      color: theme.palette.text.secondary,
    },
  },
}));
