import {useEffect, useState} from 'react';
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
import TokenImg from '../assets/Kind.png';
import {useWeb3React} from "@web3-react/core";
import {BigNumber, ethers} from "ethers";
import axios from "axios";

const KINDAccordian = ({ data }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const [balance, setBalance] = useState("0");
  const [loaded, setLoaded] = useState(false);
  const [wallet, setWallet] = useState("");

  const web3context = useWeb3React();
  var walletAddress = web3context.account

  useEffect(() => {
    if(wallet !== walletAddress) {
      setBalance("0");
      setLoaded(false);
      setWallet(walletAddress);
    }

    if(loaded === false) {
      axios.get("https://bz.to/api/GetKindByAddress.aspx?address=" + walletAddress).then((result) => {

        setBalance(result.data.Data.KindTokens_GrandTotal_Gwei);
        setLoaded(true);
      });
    }
  })



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
              <Tooltip title='KIND'>
                <Typography varaint='body2'>KIND</Typography>
              </Tooltip>
            </Box>
            <Box className={classes.tokenAmount}>
              <Tooltip title={ethers.utils.formatUnits(balance, "18")}>
                <Typography varaint='body2'>{trunc(ethers.utils.formatUnits(balance, "18"))}</Typography>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Box className={classes.accordianContentWrapper}>
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
            <a href={"https://bz.to/address-kindcredits/?" + walletAddress} target={"_blank"}>
                <span style={{"color": "#7FFFB3"}}>
                tracked here
                </span>
            </a>
          </Typography>
          <Typography variant='body2' className={`${classes.lpPara} ${classes.infoPara}`}>
            KIND is not claimable until launch
          </Typography>
          <Button disabled={true} className={classes.accordionBtn}>
            <span>Claim</span>
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default KINDAccordian;
