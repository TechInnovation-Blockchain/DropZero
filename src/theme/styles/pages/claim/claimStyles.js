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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '100px',
    '& p': {
      color: theme.palette.text.disabled,
      textTransform: 'uppercase',
      fontWeight: 700,
      fontSize: '12px',
      opacity: '0.8',
    },
  },
  noData: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    '& p': {
      color: theme.palette.text.secondary,
    },
  },
}));
