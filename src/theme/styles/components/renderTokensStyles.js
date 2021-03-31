import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  btnWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: theme.spacing(0, 1),
    '& button': {
      width: '45%',
    },
  },
  token: {
    border: `3px solid ${theme.palette.background.secondary}`,
  },
  selected: {
    border: `3px solid ${theme.palette.primary.main}`,
  },
}));
