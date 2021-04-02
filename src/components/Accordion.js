import { useState, Fragment, useEffect } from 'react';
import {
  Accordion as MUIAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Switch,
  Grid,
  Tooltip,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { format } from 'date-fns';
import { Skeleton } from '@material-ui/lab';
import Web3 from 'web3';

import { useStyles } from '../theme/styles/components/accordionStyles';
import Button from './Button';
import Dialog from './Dialog';
import TempCSV from '../assets/temp.csv';
import { DATE_FORMAT, NoLogo } from '../config/constants';
import { getTokenLogo } from '../redux';
import { getSymbol, getName } from '../contracts/functions/erc20Functions';
import { trunc } from '../utils/formattingFunctions';

const Accordion = ({ data, expanded, setExpanded, claim }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    tokenLogo: NoLogo,
    tokenSymbol: '',
    tokenName: '',
    open: false,
    openStop: false,
    checked: false,
  });
  const { open, openStop, checked, tokenLogo, tokenSymbol, tokenName } = formData;
  const { _id, tokenAddress, tokenType, endDate, amount } = data;

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClose = () => {
    setFormData({ ...formData, open: false });
  };

  const handleStopClose = () => {
    setFormData({ ...formData, openStop: false, checked: true });
  };

  const handleSwitchChange = () => {
    if (checked) {
      setFormData({ ...formData, checked: false });
    } else {
      setFormData({ ...formData, openStop: true });
    }
  };

  useEffect(() => {
    if (tokenAddress) {
      const fetchAPI = async () => {
        const logo = await getTokenLogo(Web3.utils.toChecksumAddress(tokenAddress));
        const symbol = await getSymbol(tokenAddress);
        const name = await getName(tokenAddress);
        setFormData({
          tokenLogo: logo,
          tokenSymbol: symbol ? symbol : 'Unknown',
          tokenName: name ? name : '',
        });
      };

      fetchAPI();
    }
  }, [tokenAddress]);

  return (
    <MUIAccordion
      className={classes.accordian}
      expanded={expanded === _id}
      onChange={handleChange(_id)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Grid container className={classes.accordianHeader}>
          <Grid item xs={5}>
            {amount && (
              <Tooltip title={amount} placement='bottom-end'>
                <Typography style={{ textAlign: 'right' }} variant='body2'>
                  {trunc(amount)}
                </Typography>
              </Tooltip>
            )}
          </Grid>
          <Grid item xs={2} style={{ textAlign: 'center' }}>
            <img src={tokenLogo} alt={tokenSymbol} width='30px' />
          </Grid>
          <Grid item xs={5}>
            {tokenSymbol ? (
              <Typography style={{ textAlign: 'left' }} variant='body2'>
                {tokenSymbol}
              </Typography>
            ) : (
              <Skeleton animation='wave' width='80px' height='30px' />
            )}
          </Grid>
        </Grid>
        {/* <Box className={classes.accordianHeader}>
          <Typography variant='body2'>12,000</Typography>
          <img src={tokenLogo} alt={tokenName} width='25px' />
          <Typography variant='body2'>{tokenName}</Typography>
        </Box> */}
      </AccordionSummary>
      <AccordionDetails>
        <Box className={classes.accordianContentWrapper}>
          <Box className={classes.accordianContent}>
            <Typography variant='body2'>Total amount</Typography>
            <Tooltip title={amount} placement='bottom-end'>
              <Typography variant='body2'>{amount}</Typography>
            </Tooltip>
          </Box>
          <Box className={classes.accordianContent}>
            <Typography variant='body2'>Token</Typography>
            <Typography variant='body2'>{tokenName}</Typography>
          </Box>
          {tokenType && (
            <Box
              className={classes.accordianContent}
              style={{ alignItems: 'flex-start', minHeight: '20px', height: 'auto' }}
            >
              <Typography variant='body2'>Token type</Typography>
              <Typography variant='body2'>{tokenType}</Typography>
            </Box>
          )}
          {claim && (
            <Box className={classes.accordianContent}>
              <Typography variant='body2'>Claimed on</Typography>
              <Typography variant='body2'>25 Mar 2021</Typography>
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
                text='Please confirm you want to pause all the claims '
                btnText='Confirm'
                btnOnClick={handleStopClose}
              />
              <Box className={classes.accordianContent}>
                <Typography variant='body2'>Total claimed</Typography>
                <Typography variant='body2'>4,000</Typography>
              </Box>
              <Box className={classes.accordianContent}>
                <Typography variant='body2'>Total unclaimed</Typography>
                <Typography variant='body2'>8,000</Typography>
              </Box>
              <Box className={classes.accordianContent}>
                <Typography variant='body2'>Expiry</Typography>
                <Typography variant='body2'>25th Mar 2021</Typography>
              </Box>

              <Box className={classes.accordianContent}>
                <Typography variant='body2'>Pause Claims</Typography>
                <Switch
                  checked={checked}
                  onChange={handleSwitchChange}
                  color='primary'
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </Box>

              <Box className={classes.btnWrapper}>
                {/* <Button
                  onClick={() => setFormData({ ...formData, open: true })}
                  className={classes.accordionBtn}
                >
                  <span>Withdraw</span>
                </Button> */}
                <Button
                  onClick={() => setFormData({ ...formData, open: true })}
                  className={classes.accordionBtn}
                >
                  <span>Withdraw</span>
                </Button>
                <Button className={classes.accordionBtn}>
                  <a
                    href={TempCSV}
                    download={`${tokenSymbol}-claimed-status-(${format(
                      Date.now(),
                      DATE_FORMAT
                    )}).csv`}
                  >
                    <span>Claim Status</span>
                  </a>
                </Button>
                {/* <Button
                  onClick={() => setFormData({ ...formData, openStop: true })}
                  className={classes.accordionBtn}
                >
                  <span>Stop</span>
                </Button> */}
              </Box>
              {/* <Typography
                className={classes.accordionLink}
                href={TempCSV}
                download
                variant='body2'
                component='a'
              >
                Claimed Status
              </Typography> */}
            </Fragment>
          ) : null}
        </Box>
      </AccordionDetails>
    </MUIAccordion>
  );
};

export default Accordion;
