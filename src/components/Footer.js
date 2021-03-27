import { useState } from 'react';
import { Box, Typography } from '@material-ui/core';

import { useStyles } from '../theme/styles/components/footerStyles';
import DisclaimerDialog from './DIsclaimerDialog';

const Footer = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [heading, setHeading] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = heading => {
    setOpen(true);
    setHeading(heading);
  };

  return (
    <Box className={classes.footer}>
      <DisclaimerDialog
        open={open}
        heading={heading}
        handleClose={handleClose}
        btnOnClick={handleClose}
      />
      {/* <Typography component='a' target='_blank' href='!#' variant='body2'>
        Terms & Conditions
      </Typography>
      <Typography component='a' target='_blank' href='!#' variant='body2'>
        Privacy & Disclaimers
      </Typography> */}
      <Typography onClick={() => handleOpen('Terms & Conditions')} variant='body2'>
        Terms & Conditions
      </Typography>
      <Typography onClick={() => handleOpen('Privacy & Disclaimers')} variant='body2'>
        Privacy & Disclaimers
      </Typography>
    </Box>
  );
};

export default Footer;
