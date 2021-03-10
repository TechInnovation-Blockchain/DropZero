import { useState, Fragment } from 'react';
import { Dialog, Typography, DialogContent } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';

import { useStyles } from '../theme/styles/components/dropDialogStyles';
import Button from './Button';

const DroppedDialog = () => {
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
      <Button onClick={handleClickOpen}>
        <span>Upload</span>
        <PublishIcon />
      </Button>
      <Dialog
        PaperProps={{ className: classes.mainContainer }}
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogContent className={classes.innerContainer}>
          <Typography variant='body2'>
            You are about to deposite 100.00 tokens that will be claimable by 153 different
            addresses
          </Typography>
          <Button onClick={handleClose}>
            <span>Drop</span>
          </Button>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default DroppedDialog;
