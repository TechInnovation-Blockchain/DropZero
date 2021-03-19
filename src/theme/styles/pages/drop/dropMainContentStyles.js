import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  mainContainer: {
    height: '350px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    margin: '0 auto',
    '& a': {
      color: theme.palette.primary.main,
      position: 'absolute',
      bottom: 30,
      fontSize: '14px',
      letterSpacing: '1.5px',
    },
  },
  para: {
    fontWeight: 'bolder',
    width: '90%',
    margin: '8px auto',
    '@media(max-width:550px)': {
      width: '100%',
    },
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '90%',
    '@media(max-width:330px)': {
      width: '95%',
    },
  },
  datePicker: {
    backgroundColor: theme.palette.background.input,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 10,
    padding: theme.spacing(0.4, 1),
    margin: theme.spacing(1.8, 0),
    width: '95%',
    '& .MuiInputBase-input': {
      textAlign: 'center',
      fontWeight: 'bolder',
      color: theme.palette.text.secondary,
      letterSpacing: '1.5px',
    },
    '& svg': {
      color: theme.palette.text.placeholder,
      width: '20px',
    },
    '& .MuiInputAdornment-root': {
      position: 'absolute',
      right: 0,
    },
    '& .MuiIconButton-root': {
      padding: '5px',
    },
    '& .MuiFormHelperText-root': {
      position: 'absolute',
      bottom: -20,
      fontWeight: 700,
    },
  },
  error: {
    color: theme.palette.error.main,
    fontWeight: 700,
    position: 'absolute',
    left: 15,
    fontSize: '12px',
  },
  fileUploader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    '& input[type=file]': {
      display: 'none',
    },
    '& .MuiBox-root': {
      backgroundColor: theme.palette.background.input,
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: 10,
      padding: theme.spacing(1.1, 1),
      margin: theme.spacing(1.8, 0),
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
  tokenInfo: {
    width: 250,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1, 0),
    height: '40px',
    '& p': {
      fontWeight: 700,
      marginLeft: 10,
    },
  },
}));
