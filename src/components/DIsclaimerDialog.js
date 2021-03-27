import { Fragment } from 'react';
import { Dialog as DialogMui, Typography, DialogContent, Button } from '@material-ui/core';

import { useStyles } from '../theme/styles/components/disclaimerStyles';

const Disclaimer = ({ open, handleClose, heading, btnOnClick }) => {
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
          <Typography variant='body2' className={classes.heading}>
            {heading}
          </Typography>

          <Typography variant='body2' className={classes.content}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s
            <br />
            <br /> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </Typography>

          <Button color='primary' onClick={btnOnClick} style={{ marginTop: '10px' }}>
            I Understand
          </Button>
        </DialogContent>
      </DialogMui>
    </Fragment>
  );
};

export default Disclaimer;
