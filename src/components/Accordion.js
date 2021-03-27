import { useState, Fragment } from 'react';
import {
  Accordion as MUIAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Switch,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useStyles } from '../theme/styles/components/accordionStyles';
import Button from './Button';
import Dialog from './Dialog';
import TempCSV from '../assets/temp.csv';

const Accordion = ({ data: { name, img }, expanded, setExpanded, claim }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({ open: false, openStop: false, checked: false });
  const { open, openStop, checked } = formData;

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClose = () => {
    setFormData({ ...formData, open: false });
  };

  const handleStopClose = () => {
    setFormData({ ...formData, openStop: false });
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
            <Typography variant='body2'>Total amount</Typography>
            <Typography variant='body2'>12,000</Typography>
          </Box>
          <Box className={classes.accordianContent}>
            <Typography variant='body2'>Token</Typography>
            <Typography variant='body2'>Aqua</Typography>
          </Box>
          {claim && (
            <Box className={classes.accordianContent}>
              <Typography variant='body2'>Claimed on</Typography>
              <Typography variant='body2'>25/03/21</Typography>
            </Box>
          )}
          {!claim ? (
            <Fragment>
              <Dialog
                open={open}
                handleClose={handleClose}
                text='Please confirm you are withdrawing 100.00 tokens from Dropzero to be returned to your connected wallet'
                btnText='Confirm'
                btnOnClick={handleClose}
              />
              <Dialog
                open={openStop}
                handleClose={handleStopClose}
                text='Please confirm you want to stop all the claims '
                btnText='Confirm'
                btnOnClick={handleStopClose}
              />
              <Box className={classes.accordianContent}>
                <Typography variant='body2'>Total claim</Typography>
                <Typography variant='body2'>4,000</Typography>
              </Box>
              <Box className={classes.accordianContent}>
                <Typography variant='body2'>Available amount</Typography>
                <Typography variant='body2'>8,000</Typography>
              </Box>
              <Box className={classes.accordianContent}>
                <Typography variant='body2'>Expiry</Typography>
                <Typography variant='body2'>25th Mar 2021</Typography>
              </Box>
              <Box className={classes.accordianContent}>
                <Typography variant='body2'>Pause Drop</Typography>
                <Switch
                  checked={checked}
                  onChange={() => setFormData({ ...formData, checked: !checked })}
                  color='primary'
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </Box>
              <Box className={classes.btnWrapper}>
                <Button
                  onClick={() => setFormData({ ...formData, open: true })}
                  className={classes.accordionBtn}
                >
                  <span>Withdraw</span>
                </Button>
                <Button
                  onClick={() => setFormData({ ...formData, openStop: true })}
                  className={classes.accordionBtn}
                >
                  <span>Stop</span>
                </Button>
              </Box>
              <Typography
                className={classes.accordionLink}
                href={TempCSV}
                download
                variant='body2'
                component='a'
              >
                Claimed Status
              </Typography>
            </Fragment>
          ) : null}
        </Box>
      </AccordionDetails>
    </MUIAccordion>
  );
};

export default Accordion;
