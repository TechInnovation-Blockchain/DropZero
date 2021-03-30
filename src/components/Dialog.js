import { Fragment } from 'react';
import { Dialog as DialogMui, Typography, DialogContent, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { useStyles } from '../theme/styles/components/dialogStyles';
import Button from './Button';

const Dialog = ({ open, handleClose, text, secondaryText, errorMsg, btnText, btnOnClick }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <DialogMui
        PaperProps={{ className: classes.mainContainer }}
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogContent className={classes.innerContainer}>
          <IconButton size='small' onClick={handleClose} className={classes.closeBtn}>
            <CloseIcon />
          </IconButton>
          <Typography variant='body2' className={classes.content}>
            {text}
          </Typography>
          {errorMsg ? (
            <Typography variant='body2' className={classes.errorMsg}>
              {errorMsg}
            </Typography>
          ) : (
            <Typography variant='body2' className={classes.secondaryText}>
              {secondaryText}
            </Typography>
          )}
          <Button onClick={btnOnClick} disabled={errorMsg ? true : false}>
            <span>{btnText}</span>
          </Button>
        </DialogContent>
      </DialogMui>
    </Fragment>
  );
};

export default Dialog;
