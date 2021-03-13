import { Snackbar as SnackbarMui, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';

import { useStyles } from '../theme/styles/components/snackbarStyles';
import { hideSnackbar } from '../redux';

const Snackbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const snackbar = useSelector(state => state.ui.snackbar);

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <SnackbarMui
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={snackbar.open}
      {...(snackbar.noAutoHide ? {} : { autoHideDuration: 6000 })}
      onClose={handleClose}
      action={
        <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
          <CloseIcon fontSize='small' />
        </IconButton>
      }
    >
      <Alert onClose={handleClose} severity={snackbar.type} className={classes.snackbarStyles}>
        {snackbar.message}
      </Alert>
    </SnackbarMui>
  );
};

export default Snackbar;
