import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Web3 from 'web3';

import { useStyles } from '../theme/styles/components/auqaAccordianStyles';
import Button from './Button';
import { ETHERSCAN_ADDRESS_BASE_URL } from '../config/constants';
import {trunc} from '../utils/formattingFunctions';
import TokenImg from '../assets/FLASH.png';
import {useWeb3React} from "@web3-react/core";
import {BigNumber} from "ethers";

const FlashV3Accordian = ({ data }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const snapshotWeiAmount = (1000 * data.data.FlashV3Tokens_V1plusV2Snapshot_Int) + ""
  const eligiblityWeiAmount = (1000 * data.data.FlashV3Tokens_ProjectedOct31_Int) + ""
  const totalWeiAmount = (1000 * data.data.FlashV3Tokens_GrandTotal) + ""

  const web3context = useWeb3React();
  var walletAddress = web3context.account

  return (
    <Accordion
      className={classes.aquaAccordian}
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
    >
      <AccordionSummary
        expandIcon={
          <IconButton size='small' style={{ padding: 0 }}>
            <ExpandMoreIcon />
          </IconButton>
        }
        aria-controls='panel1a-content'
        id='panel1a-header'
        className={classes.summary}
      >
        <Grid container className={classes.header}>
          <Grid item xs={2} className={classes.tokenImg}>
            <a
              href={ETHERSCAN_ADDRESS_BASE_URL + '0xd8e187a1436026c278c60f3190895f850238bdc7'}
              target='_blank'
              rel='noreferrer'
            >
              <img src={TokenImg} alt={'abc'} />
            </a>
          </Grid>
          <Grid item xs={10} className={classes.tokenInfo}>
            <Box className={classes.tokenName}>
              <Tooltip title='Flash V3 Token'>
                <Typography varaint='body2'>Flash V3</Typography>
              </Tooltip>
            </Box>
            <Box className={classes.tokenAmount}>
              <Tooltip title={Web3.utils.fromWei(totalWeiAmount, "kwei")}>
                <Typography varaint='body2'>{trunc(Web3.utils.fromWei(totalWeiAmount, "kwei"))}</Typography>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Box className={classes.accordianContentWrapper}>
          <Box className={classes.accordianContent}>
            <Typography variant='body2'>Snapshot amount</Typography>
            <Tooltip title={Web3.utils.fromWei(snapshotWeiAmount, "kwei")} placement='bottom-end'>
              <Typography variant='body2'>{trunc(Web3.utils.fromWei(snapshotWeiAmount, "kwei"))}</Typography>
            </Tooltip>
          </Box>
          <Box className={classes.accordianContent}>
            <Typography variant='body2'>Earned Amount</Typography>
            <Tooltip title={Web3.utils.fromWei(eligiblityWeiAmount, "kwei")} placement='bottom-end'>
              <Typography variant='body2'>{trunc(Web3.utils.fromWei(eligiblityWeiAmount, "kwei"))}</Typography>
            </Tooltip>
          </Box>
          <Box className={classes.accordianContent}>
            <Typography variant='body2'>Total Amount</Typography>
            <Tooltip title={Web3.utils.fromWei(totalWeiAmount, "kwei")} placement='bottom-end'>
              <Typography variant='body2'>{trunc(Web3.utils.fromWei(totalWeiAmount, "kwei"))}</Typography>
            </Tooltip>
          </Box>
          <Typography variant='body2' className={classes.lpPara}>
            Earn a 4x multiplier by&nbsp;
              <a href={"https://blockzerolabs.io/xlp"} target={"_blank"}>
                <span style={{"color": "#7FFFB3"}}>
                providing XIO liquidity
                </span>
              </a>
            &nbsp;(paired with ETH, DAI or USDC) on Uniswap v2
            <br />(applies to earned amount only)
          </Typography>
          <Typography variant='body2' className={`${classes.lpPara} ${classes.infoPara}`}>
            Eligibility can be&nbsp;
            <a href={"https://bz.to/address-flashv3credits/?" + walletAddress} target={"_blank"}>
                <span style={{"color": "#7FFFB3"}}>
                tracked here
                </span>
            </a>
          </Typography>
          <Typography variant='body2' className={`${classes.lpPara} ${classes.infoPara}`}>
            Flash V3 is not claimable until launch
          </Typography>
          <Button disabled={true} className={classes.accordionBtn}>
            <span>Claim</span>
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default FlashV3Accordian;
