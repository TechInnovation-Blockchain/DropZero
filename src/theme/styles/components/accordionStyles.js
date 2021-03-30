import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  accordian: {
    margin: theme.spacing(3, 0),
    '& .MuiIconButton-edgeEnd': {
      position: 'absolute',
      right: 10,
      color: theme.palette.text.primary,
    },
    background: theme.palette.background.secondary,
    boxShadow: 'none',
    '& svg': {
      color: theme.palette.text.secondary,
    },
  },
  accordianHeader: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    '& p': {
      minWidth: '80px',
      textAlign: 'center',
      margin: theme.spacing(0, 0.5),
      textTransform: 'uppercase',
      color: theme.palette.text.primary,
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
    },
    '& p:last-child': {
      textAlign: 'right',
    },
  },
  btnWrapper: {
    display: 'flex',
  },
  accordionBtn: {
    fontSize: '14px',
    width: '140px',
    margin: '8px auto',
    display: 'flex',
    '@media(max-width:550px)': {
      width: '48%',
    },
  },
  accordionLink: {
    color: theme.palette.primary.main,
    display: 'inline-block',
    width: '100%',
    textAlign: 'center',
  },
}));
