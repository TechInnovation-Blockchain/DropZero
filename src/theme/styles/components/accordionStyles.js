import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  accordian: {
    margin: theme.spacing(3, 0),
    '& .MuiIconButton-edgeEnd': {
      position: 'absolute',
      right: 10,
      color: theme.palette.text.primary,
    },
    background: theme.palette.background.accordion,
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
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(1, 0),
  },
}));
