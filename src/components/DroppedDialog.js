import { Fragment } from 'react';
import { Dialog, Typography, DialogContent, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { useStyles } from '../theme/styles/components/dropDialogStyles';
import Button from './Button';

const DroppedDialog = ({ open, setOpen }) => {
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
          <IconButton size='small' onClick={handleClose} className={classes.closeBtn}>
            <CloseIcon />
          </IconButton>
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
