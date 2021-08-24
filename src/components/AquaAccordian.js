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
import { trunc } from '../utils/formattingFunctions';
import TokenImg from '../assets/AQUA.png';

const AquaAccordion = ({ data }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const { amount, multiplier } = data;

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
              <Tooltip title='Aqua Token'>
                <Typography varaint='body2'>Aqua</Typography>
              </Tooltip>
            </Box>
            <Box className={classes.tokenAmount}>
              <Tooltip title={Web3.utils.fromWei(amount)}>
                <Typography varaint='body2'>{trunc(Web3.utils.fromWei(amount))}</Typography>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Box className={classes.accordianContentWrapper}>
          <Box className={classes.accordianContent}>
            <Typography variant='body2'>Total amount</Typography>
            <Tooltip title={Web3.utils.fromWei(amount)} placement='bottom-end'>
              <Typography variant='body2'>{trunc(Web3.utils.fromWei(amount))}</Typography>
            </Tooltip>
          </Box>
          <Box className={classes.accordianContent}>
            <Typography variant='body2'>Avg. Multiplier</Typography>
            <Typography variant='body2'>{multiplier}</Typography>
          </Box>
          <Box className={classes.accordianContent}>
            <Typography variant='body2'>Base Rate</Typography>
            <Typography variant='body2'>0.01</Typography>
          </Box>
          <Typography variant='body2' className={classes.lpPara}>
            Earn a 4x multiplier by&nbsp;
              <a href={"https://blockzerolabs.io/xlp"} target={"_blank"}>
                <span style={{"color": "#7FFFB3"}}>
                providing XIO liquidity
                </span>
              </a>
            &nbsp;(paired with ETH, DAI or USDC) on Uniswap v2
          </Typography>
          <Typography variant='body2' className={`${classes.lpPara} ${classes.infoPara}`}>
            AquaFi is not claimable until launch
          </Typography>
          <Button disabled={true} className={classes.accordionBtn}>
            <span>Claim</span>
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default AquaAccordion;
