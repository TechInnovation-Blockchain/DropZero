import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  connectBtn: {
    width: 'auto !important',
    fontSize: '14px !important',
  },
  bottomError: {
    color: theme.palette.error.main,
    fontWeight: 700,
    fontSize: '12px',
  },
}));
