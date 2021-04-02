import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  connectWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '15px',
  },
  connectBtn: {
    width: 'auto !important',
    fontSize: '14px !important',
    margin: '8px auto !important',
  },
  bottomError: {
    color: theme.palette.error.main,
    fontWeight: 700,
    fontSize: '11px',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  btnWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  bottomPara: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.text.primary,
    '& p': {
      letterSpacing: '3px',
      fontSize: '12px',
      '@media (max-width:330px)': {
        fontSize: '12px',
      },
    },
  },
}));
