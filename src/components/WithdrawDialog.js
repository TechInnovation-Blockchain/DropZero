import { useState, Fragment } from 'react';
import { Dialog, Typography, DialogContent } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { useStyles } from '../theme/styles/components/dropDialogStyles';
import Button from './Button';

const WithdrawDialog = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button onClick={handleClickOpen} className={classes.accordionBtn}>
        <span>Withdraw</span>
      </Button>
      <Dialog
        PaperProps={{ className: classes.mainContainer }}
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogContent className={classes.innerContainer}>
          <CloseIcon onClick={handleClose} />
          <Typography variant='body2'>Are you sure you want to withdraw token</Typography>
          <Button onClick={handleClose}>
            <span>Confirm</span>
          </Button>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default WithdrawDialog;
