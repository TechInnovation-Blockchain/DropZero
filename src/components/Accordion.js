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

const Accordion = ({ data: { name, img }, expanded, setExpanded }) => {
  const classes = useStyles();

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
          <Box className={classes.accordianContent}>
            <Typography variant='body2'>Total Claim</Typography>
            <Typography variant='body2'>4,000</Typography>
          </Box>
          <Box className={classes.accordianContent}>
            <Typography variant='body2'>Available Amount</Typography>
            <Typography variant='body2'>Aqua</Typography>
          </Box>
          <Box className={classes.accordianContent}>
            <Typography variant='body2'>Expiry</Typography>
            <Typography variant='body2'>25/03/21</Typography>
          </Box>
          <WithdrawDialog />
        </Box>
      </AccordionDetails>
    </MUIAccordion>
  );
};

export default Accordion;
