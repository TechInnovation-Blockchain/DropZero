import { Fragment } from 'react';
import {
  Dialog as DialogMui,
  Typography,
  DialogContent,
  CircularProgress,
} from '@material-ui/core';

import { useStyles } from '../theme/styles/components/dialogStyles';

const LoadingDialog = ({ open, handleClose, text }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <DialogMui
        PaperProps={{ className: classes.mainContainer }}
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogContent className={classes.innerContainer}>
          <CircularProgress size={80} style={{ marginBottom: 30 }} />
          <Typography variant='body2' className={classes.content}>
            {text}
          </Typography>
        </DialogContent>
      </DialogMui>
    </Fragment>
  );
};

export default LoadingDialog;
