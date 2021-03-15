import { Snackbar as SnackbarMui, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';

import { useStyles } from '../theme/styles/components/snackbarStyles';
import { useSnackbar } from '../hooks';

const Snackbar = () => {
  const classes = useStyles();
  const { open, message, severity, hideSnackbarF } = useSnackbar();

  return (
    <SnackbarMui
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={hideSnackbarF}
      action={
        <IconButton size='small' aria-label='close' color='inherit' onClick={hideSnackbarF}>
          <CloseIcon fontSize='small' />
        </IconButton>
      }
    >
      <Alert onClose={hideSnackbarF} severity={severity} className={classes.snackbarStyles}>
        {message}
      </Alert>
    </SnackbarMui>
  );
};

export default Snackbar;
