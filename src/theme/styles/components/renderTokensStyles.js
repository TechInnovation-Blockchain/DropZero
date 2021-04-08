import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  btnWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: theme.spacing(0, 1),
    '& button': {
      width: '45%',
      '@media(max-width:550px)': {
        padding: theme.spacing(0.5),
        '& span': {
          fontSize: '12px',
        },
      },
    },
  },
  loadingBtn: {
    '& button': {
      '& span': {
        fontSize: '12px',
        padding: theme.spacing(0.2, 0),
      },
      '@media(max-width:550px)': {
        width: '48%',
        '& span': {
          fontSize: '10px',
        },
      },
    },
  },
  token: {
    border: `3px solid ${theme.palette.background.secondary}`,
  },
  selected: {
    border: `3px solid ${theme.palette.primary.main} !important`,
  },
  tokenContainer: {
    height: '160px',
    position: 'relative',
  },
  secondaryText: {
    color: theme.palette.text.secondary,
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    top: '45%',
  },
  bottomSec: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100px',
  },
}));
