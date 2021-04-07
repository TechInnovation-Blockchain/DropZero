import { useState, Fragment, useEffect } from 'react';
import {
  Accordion as MUIAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid,
  Tooltip,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { format } from 'date-fns';
import { Skeleton } from '@material-ui/lab';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { useStyles } from '../theme/styles/components/accordionStyles';
import Button from './Button';
import Dialog from './Dialog';
import { DATE_FORMAT, NoLogo } from '../config/constants';
import { getTokenLogo, getCSVFile } from '../redux';
import { getSymbol, getName } from '../contracts/functions/erc20Functions';
import { withdraw } from '../contracts/functions/dropFactoryFunctions';
import PauseDrop from './PauseDrop';
import { trunc } from '../utils/formattingFunctions';
import { useDropDashboard } from '../hooks';

const Accordion = ({ data, expanded, setExpanded, claim }) => {
  const classes = useStyles();
  const { withdrawDropsF } = useDropDashboard();
  const { account } = useWeb3React();

  const [formData, setFormData] = useState({
    tokenLogo: NoLogo,
    tokenSymbol: '',
    tokenName: '',
    open: false,
    csvFile: '',
  });
  const { open, tokenLogo, tokenSymbol, tokenName, csvFile } = formData;
  const {
    _id,
    tokenAddress,
    tokenType,
    endDate,
    amount,
    totalAmount,
    totalClaimed,
    pauseDrop,
    merkleRoot,
  } = data;

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleWithdrawConfirm = async () => {
    setFormData({ ...formData, open: false });
    await withdraw(tokenAddress, account, merkleRoot, () => {
      withdrawDropsF(account, _id);
    });
  };

  useEffect(() => {
    if (tokenAddress) {
      const fetchAPI = async () => {
        const logo = await getTokenLogo(Web3.utils.toChecksumAddress(tokenAddress));
        const symbol = await getSymbol(tokenAddress);
        const name = await getName(tokenAddress);
        let _csvFile = '';
        if (!claim) {
          _csvFile = await getCSVFile(data?._id, name);
        }
        setFormData({
          tokenLogo: logo,
          tokenSymbol: symbol ? symbol : 'Unknown',
          tokenName: name ? name : '',
          csvFile: _csvFile,
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
            <Tooltip title={claim ? amount : totalAmount} placement='bottom-end'>
              <Typography style={{ textAlign: 'right' }} variant='body2'>
                {trunc(claim ? amount : totalAmount)}
              </Typography>
            </Tooltip>
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
      </AccordionSummary>
      <AccordionDetails>
        <Box className={classes.accordianContentWrapper}>
          <Box className={classes.accordianContent}>
            <Typography variant='body2'>Total amount</Typography>
            <Tooltip title={claim ? amount : totalAmount} placement='bottom-end'>
              <Typography variant='body2'>{trunc(claim ? amount : totalAmount)}</Typography>
            </Tooltip>
          </Box>
          <Box className={classes.accordianContent}>
            <Typography variant='body2'>Token</Typography>
            {tokenName ? (
              <Typography variant='body2'>{tokenName}</Typography>
            ) : (
              <Skeleton animation='wave' width='80px' height='30px' />
            )}
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
                handleClose={() => setFormData({ ...formData, open: false })}
                text={`Please confirm you are withdrawing ${trunc(
                  totalAmount
                )} tokens from Dropzero to be returned to your connected wallet`}
                btnText='Confirm'
                btnOnClick={handleWithdrawConfirm}
              />

              <Box className={classes.accordianContent}>
                <Typography variant='body2'>Total claimed</Typography>
                <Tooltip title={totalClaimed} placement='bottom-end'>
                  <Typography variant='body2'>{trunc(totalClaimed)}</Typography>
                </Tooltip>
              </Box>
              <Box className={classes.accordianContent}>
                <Typography variant='body2'>Total unclaimed</Typography>
                <Tooltip title={totalAmount - totalClaimed} placement='bottom-end'>
                  <Typography variant='body2'>{trunc(totalAmount - totalClaimed)}</Typography>
                </Tooltip>
              </Box>
              {endDate && (
                <Box className={classes.accordianContent}>
                  <Typography variant='body2'>Expiry</Typography>
                  <Typography variant='body2'>{format(endDate, DATE_FORMAT)}</Typography>
                </Box>
              )}

              <Box className={classes.accordianContent}>
                <Typography variant='body2'>Pause Claims</Typography>
                <PauseDrop
                  value={pauseDrop}
                  dropId={_id}
                  merkleRoot={merkleRoot}
                  tokenAddress={tokenAddress}
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
                <Button disabled={csvFile === ''} className={classes.accordionBtn}>
                  <a href={csvFile} target='_blank'>
                    <span>Claim Status</span>
                  </a>
                </Button>
                {/* <Button
                  onClick={() => setFormData({ ...formData, openPause: true })}
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
