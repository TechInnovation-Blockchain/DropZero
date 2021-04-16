import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  mainContainer: {
    height: '370px',
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
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@media(max-width:550px)': {
      width: '100%',
    },
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '90%',
    margin: theme.spacing(1, 0),
    '@media(max-width:550px)': {
      width: '100%',
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
      width: '95%',
      textAlign: 'center',
      bottom: -20,
      fontWeight: 500,
      fontSize: '10px',
    },
  },
  timePicker: {
    width: 'auto',
    '& .MuiInputBase-input': {
      textAlign: 'start',
      fontSize: '13px',
      height: '20px',
    },
  },
  error: {
    color: theme.palette.error.main,
    fontWeight: 500,
    position: 'absolute',
    //top: '49%',
    top: '47%',
    fontSize: '10px',
    '@media(max-width:550px)': {
      fontSize: '10px',
    },
    '@media(max-width:330px)': {
      top: '51%',
    },
  },
  fileUploader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',

    '& input[type=file]': {
      display: 'none',
    },
    '& .MuiBox-root': {
      backgroundColor: theme.palette.background.input,
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: 10,
      padding: theme.spacing(1, 1),
      margin: theme.spacing(2, 0),
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
    height: '50px',
    '& p': {
      fontWeight: 700,
      marginLeft: 10,
    },
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    position: 'absolute',
    //top: '49%',
    top: '47%',
    '& p': {
      marginLeft: 5,
      fontSize: '12px',
    },
  },
  smallerField: {
    '& .MuiInputBase-input': {
      fontSize: '11px',
    },
  },
  help: {
    position: 'absolute',
    //top: '58.5%',
    top: '56%',
    right: 15,
    color: theme.palette.text.placeholder,
  },
}));
