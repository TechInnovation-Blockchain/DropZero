import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  inputField: {
    backgroundColor: theme.palette.background.input,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 10,
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(1, 0),
    width: '95%',
    '& .MuiInputBase-input': {
      textAlign: 'center',
      fontWeight: 'bolder',
      color: theme.palette.text.secondary,
    },
  },
}));
