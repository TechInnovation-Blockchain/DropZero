import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  connectWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  connectBtn: {
    width: 'auto !important',
    fontSize: '14px !important',
    margin: '8px auto !important',
  },
  bottomError: {
    color: theme.palette.error.main,
    fontWeight: 700,
    fontSize: '12px',
  },
  btnWrapper: {
    display: 'flex',
  },
}));
