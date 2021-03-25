import { Box, Typography } from '@material-ui/core';
import { useStyles } from '../theme/styles/components/footerStyles';

const Footer = () => {
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <Typography component='a' target='_blank' href='!#' variant='body2'>
        Terms & Conditions
      </Typography>
      <Typography component='a' target='_blank' href='!#' variant='body2'>
        Privacy & Disclaimers
      </Typography>
    </Box>
  );
};

export default Footer;
