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
    position: 'relative',
  },
  noWallet: {
    height: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '100px',
    '& p': {
      color: theme.palette.error.main,
      fontWeight: 700,
      fontSize: '14px',
    },
  },
  paused: {
    width: '10px',
    height: '10px',
    backgroundColor: '#f6c343',
    borderRadius: '50%',
    position: 'absolute',
    top: '4px',
    right: '-16px',
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
