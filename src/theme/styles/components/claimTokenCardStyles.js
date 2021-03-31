import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  mainContainer: {
    height: '70px',
    margin: theme.spacing(1, 0),
    padding: theme.spacing(0, 1),
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.border.lightBorder}`,
    background: theme.palette.background.secondary,
  },
  newContainer: {
    borderBottom: 'none',
    borderRadius: 5,
  },
  tokenImg: {
    '& img': {
      width: '30px',
      height: '30px',
      objectFit: 'contain',
      marginRight: '10px',
    },
  },
  tokenInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tokenName: {
    textAlign: 'left',
    maxWidth: '50%',
    '& p:first-child': {
      fontSize: '16px',
      fontWeight: 600,
      '@media(max-width:550px)': {
        fontSize: '14px',
      },
    },
    '& p:last-child': {
      fontSize: '12px',
      color: theme.palette.text.secondary,
      fontWeight: 500,
      marginTop: '2px',
      '@media(max-width:550px)': {
        fontSize: '10px',
      },
    },
  },
  tokenAmount: {
    textAlign: 'right',
    maxWidth: '50%',
    '& p:first-child': {
      color: theme.palette.primary.main,
      fontWeight: 600,
      fontSize: '16px',
      '@media(max-width:550px)': {
        fontSize: '14px',
      },
    },
    '& p:last-child': {
      fontSize: '12px',
      fontWeight: 500,
      marginTop: '2px',
      '@media(max-width:550px)': {
        fontSize: '10px',
      },
    },
  },
}));
