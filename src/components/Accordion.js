import { useState, Fragment } from 'react';
import {
  Accordion as MUIAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStyles } from '../theme/styles/components/accordionStyles';

import WithdrawDialog from './WithdrawDialog';
import Button from './Button';

const Accordion = ({ data: { name, img }, expanded, setExpanded, claim }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <MUIAccordion
      className={classes.accordian}
      expanded={expanded === name}
      onChange={handleChange(name)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Box className={classes.accordianHeader}>
          <Typography variant='body2'>12,000</Typography>
          <img src={img} alt='aqua' width='25px' />
          <Typography variant='body2'>{name}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box className={classes.accordianContentWrapper}>
          <Box className={classes.accordianContent}>
            <Typography variant='body2'>Total Amount</Typography>
            <Typography variant='body2'>12,000</Typography>
          </Box>
          <Box className={classes.accordianContent}>
            <Typography variant='body2'>Token</Typography>
            <Typography variant='body2'>Aqua</Typography>
          </Box>
          {claim && (
            <Box className={classes.accordianContent}>
              <Typography variant='body2'>Claimed On</Typography>
              <Typography variant='body2'>25/03/21</Typography>
            </Box>
          )}
          {!claim ? (
            <Fragment>
              <Box className={classes.accordianContent}>
                <Typography variant='body2'>Total Claim</Typography>
                <Typography variant='body2'>4,000</Typography>
              </Box>
              <Box className={classes.accordianContent}>
                <Typography variant='body2'>Available Amount</Typography>
                <Typography variant='body2'>8,000</Typography>
              </Box>
              <Box className={classes.accordianContent}>
                <Typography variant='body2'>Expiry</Typography>
                <Typography variant='body2'>25/03/21</Typography>
              </Box>
              <Button onClick={() => setOpen(true)} className={classes.accordionBtn}>
                <span>Withdraw</span>
              </Button>
            </Fragment>
          ) : null}
          <WithdrawDialog
            open={open}
            setOpen={setOpen}
            text='Are you sure you want to withdraw token'
          />
        </Box>
      </AccordionDetails>
    </MUIAccordion>
  );
};

export default Accordion;
