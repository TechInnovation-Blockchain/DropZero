import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  mainContainer: {
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    margin: '0 auto',
  },
  para: {
    fontWeight: 'bolder',
    width: '85%',
    margin: '8px auto',
    wordSpacing: '3px',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '90%',
  },
  fileUploader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    '& input[type=file]': {
      display: 'none',
    },
    '& div': {
      backgroundColor: theme.palette.background.input,
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: 10,
      padding: theme.spacing(1.1, 1),
      margin: theme.spacing(1, 0),
      width: '100%',
      cursor: 'pointer',
      '& p': {
        fontWeight: 'bold',
        fontSize: '16px',
        color: '#626262',
      },
    },
  },
  button: {
    margin: theme.spacing(1, 0),
    fontWeight: '800',
    fontSize: '16px',
    color: '#000',
    borderRadius: 2,
    width: '150px',
    '& svg': {
      color: '#fff',
      width: '20px',
    },
    '& span': {
      margin: '0 10px',
    },
  },
}));
