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
import { isMobile } from 'react-device-detect';

import { useStyles } from '../theme/styles/components/accordionStyles';
import Button from './Button';
import Dialog from './Dialog';
import PauseDrop from './PauseDrop';
import { DATE_FORMAT, NoLogo, ETHERSCAN_ADDRESS_BASE_URL } from '../config/constants';
import { getTokenLogo, getCSVFile } from '../redux';
import { getSymbol, getName } from '../contracts/functions/erc20Functions';
import { withdraw } from '../contracts/functions/dropFactoryFunctions';
import { trunc, truncFileName } from '../utils/formattingFunctions';
import { useDropDashboard, useLoading } from '../hooks';

const Accordion = ({ data, expanded, setExpanded, claim }) => {
  const classes = useStyles();
  const { withdrawDropsF } = useDropDashboard();
  const { account } = useWeb3React();
  const {
    loading: { dapp },
  } = useLoading();

  const [formData, setFormData] = useState({
    tokenLogo: NoLogo,
    tokenSymbol: '',
    tokenName: '',
    open: false,
    loadingCSVFile: false,
    _withdraw: false,
  });
  const { open, tokenLogo, tokenSymbol, tokenName, _withdraw, loadingCSVFile } = formData;
  const {
    _id,
    dropperAddress,
    tokenAddress,
    dropName,
    endDate,
    amount,
    totalAmount,
    totalClaimed,
    pauseDrop,
    merkleRoot,
    claimedDate,
  } = data;

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleWithdrawConfirm = async () => {
    setFormData({ ...formData, open: false });
    await withdraw(_id, dropperAddress, tokenAddress, account, merkleRoot, () => {
      withdrawDropsF(data);
      setFormData({ ...formData, _withdraw: true, open: false });
    });
  };

  const handleCSVDownload = async e => {
    setFormData({ ...formData, loadingCSVFile: true });
    const fileURL = await getCSVFile(data?._id, tokenName);
    console.log(fileURL);
    if (fileURL) {
      window.location.assign(fileURL);
      //window.location.href = fileURL;
    }
    setFormData({ ...formData, loadingCSVFile: false });
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
          _withdraw: data.withDraw,
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
            <a href={ETHERSCAN_ADDRESS_BASE_URL + tokenAddress} target='_blank'>
              <img src={tokenLogo} alt={tokenSymbol} width='30px' />
            </a>
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
              (isMobile && tokenName.length >= 14) || tokenName.length >= 19 ? (
                <Tooltip title={tokenName}>
                  <Typography variant='body2'>
                    {truncFileName(tokenName, isMobile ? 14 : 19)}
                  </Typography>
                </Tooltip>
              ) : (
                <Typography variant='body2'>{tokenName}</Typography>
              )
            ) : (
              <Skeleton animation='wave' width='80px' height='30px' />
            )}
          </Box>
          {dropName && (
            <Box
              className={classes.accordianContent}
              style={{ alignItems: 'flex-start', minHeight: '20px', height: 'auto' }}
            >
              <Typography variant='body2'>Drop name</Typography>
              <Typography variant='body2'>{dropName}</Typography>
            </Box>
          )}
          {claim && (
            <Box className={classes.accordianContent}>
              <Typography variant='body2'>Claimed on</Typography>
              <Typography variant='body2'>{format(new Date(claimedDate), DATE_FORMAT)}</Typography>
            </Box>
          )}
          {!claim ? (
            <Fragment>
              <Dialog
                open={open}
                handleClose={() => setFormData({ ...formData, open: false })}
                btnText='Confirm'
                btnOnClick={handleWithdrawConfirm}
                renderContent={
                  <Typography variant='body2'>
                    Please confirm you are withdrawing{' '}
                    <Tooltip title={totalAmount}>
                      <Typography variant='body2' component='span'>
                        {trunc(totalAmount - totalClaimed)}{' '}
                      </Typography>
                    </Tooltip>
                    tokens from Dropzero to be returned to your connected wallet
                  </Typography>
                }
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
                  <Typography variant='body2'>{format(new Date(endDate), DATE_FORMAT)}</Typography>
                </Box>
              )}

              {_withdraw !== true && (
                <Box className={classes.accordianContent}>
                  <Typography variant='body2'>Pause claims</Typography>
                  <PauseDrop
                    value={pauseDrop}
                    dropId={_id}
                    merkleRoot={merkleRoot}
                    tokenAddress={tokenAddress}
                    disabled={totalAmount - totalClaimed === 0}
                  />
                </Box>
              )}

              <Box className={`${classes.btnWrapper} ${loadingCSVFile ? classes.btnLoading : ''}`}>
                {_withdraw !== true && (
                  <Button
                    loading={dapp === 'withdraw'}
                    onClick={() => setFormData({ ...formData, open: true })}
                    className={classes.accordionBtn}
                  >
                    <span>Withdraw</span>
                  </Button>
                )}
                <Button
                  onClick={handleCSVDownload}
                  loading={loadingCSVFile}
                  className={classes.accordionBtn}
                >
                  <span>Claim Status</span>
                </Button>
              </Box>
            </Fragment>
          ) : null}
        </Box>
      </AccordionDetails>
    </MUIAccordion>
  );
};

export default Accordion;
