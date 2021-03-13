import { Fragment } from 'react';
import { Dialog, Typography, DialogContent } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { useStyles } from '../theme/styles/components/dropDialogStyles';
import Button from './Button';

const WithdrawDialog = ({ open, setOpen, text }) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Dialog
        PaperProps={{ className: classes.mainContainer }}
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogContent className={classes.innerContainer}>
          <CloseIcon onClick={handleClose} />
          <Typography variant='body2'>{text}</Typography>
          <Button onClick={handleClose}>
            <span>Confirm</span>
          </Button>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default WithdrawDialog;
