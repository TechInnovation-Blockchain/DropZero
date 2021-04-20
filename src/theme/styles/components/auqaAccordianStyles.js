import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  aquaAccordian: {
    borderRadius: '5px !important',
    background: theme.palette.background.secondary,
    margin: theme.spacing(1, 0),
    boxShadow: 'none',
    '& .MuiIconButton-edgeEnd': {
      position: 'absolute',
      right: 10,
      bottom: 1,
      color: theme.palette.text.primary,
    },
  },
  summary: {
    height: '70px',
  },
  header: {
    alignItems: 'center',
  },
  tokenInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tokenImg: {
    '& img': {
      width: '30px',
      height: '30px',
      objectFit: 'contain',
      marginRight: '10px',
    },
  },
  tokenName: {
    textAlign: 'left',
    maxWidth: '50%',
    '& p': {
      fontSize: '16px',
      fontWeight: 600,
      '@media(max-width:550px)': {
        fontSize: '14px',
      },
    },
  },
  tokenAmount: {
    textAlign: 'right',
    maxWidth: '50%',
    position: 'absolute',
    right: 10,
    top: 10,
    '& p': {
      color: theme.palette.primary.main,
      fontWeight: 600,
      fontSize: '16px',
      '@media(max-width:550px)': {
        fontSize: '14px',
      },
    },
  },
  accordianContentWrapper: {
    width: '100%',
    '& p': {
      color: theme.palette.text.primary,
    },
  },
  accordianContent: {
    height: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(1, 0),
    '& p': {
      width: '50%',
      textAlign: 'left',
    },
    '& p:last-child': {
      textAlign: 'right',
    },
  },
  lpPara: {
    fontSize: '12px',
    fontWeight: 'bold',
    marginTop: '10px',
  },
}));
