import { useState } from 'react';
import { Box, Typography } from '@material-ui/core';

import { useStyles } from '../theme/styles/components/footerStyles';
import DisclaimerDialog from './DIsclaimerDialog';

const Footer = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className={classes.footer}>
      <DisclaimerDialog open={open} handleClose={handleClose} />
      <Typography component='a' target='_blank' href='!#' variant='body2'>
        Terms & Conditions
      </Typography>
      {/* <Typography onClick={() => setOpen(true)} variant='body2'>
        Terms & Conditions
      </Typography> */}
      <Typography component='a' target='_blank' href='!#' variant='body2'>
        Privacy & Disclaimers
      </Typography>
    </Box>
  );
};

export default Footer;
