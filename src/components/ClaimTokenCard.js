import { Fragment, useEffect, useState } from 'react';
import { Grid, Box, Typography, IconButton, Tooltip } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Web3 from 'web3';
import { format } from 'date-fns';

import { useStyles } from '../theme/styles/components/claimTokenCardStyles';
import { trunc } from '../utils/formattingFunctions';
import Counter from './Counter';
import { getTokenLogo } from '../redux';
import { getName, getSymbol } from '../contracts/functions/erc20Functions';
import { DATE_FORMAT, ETHERSCAN_ADDRESS_BASE_URL, NoLogo } from '../config/constants';

const ClaimTokenCard = ({
  token,
  tokenAddress,
  showArrow,
  amount,
  onArrowClick,
  onClick,
  className,
}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({ tokenLogo: NoLogo, tokenName: '', tokenSymbol: '' });
  const { tokenLogo, tokenName, tokenSymbol } = formData;
  const { startDate, endDate, tokenType } = token;

  useEffect(() => {
    if (tokenAddress) {
      const fetchAPI = async () => {
        const logo = await getTokenLogo(Web3.utils.toChecksumAddress(tokenAddress));
        const name = await getName(tokenAddress);
        const symbol = await getSymbol(tokenAddress);
        setFormData({ tokenLogo: logo, tokenName: name, tokenSymbol: symbol });
      };

      fetchAPI();
    }
  }, [tokenAddress]);

  return (
    <Fragment>
      {!showArrow && <Counter date={new Date(startDate)} token={token} />}
      <Grid
        container
        className={`${classes.mainContainer} ${showArrow ? classes.newContainer : ''} ${
          className ? className : ''
        }`}
        onClick={onArrowClick ? onArrowClick : onClick}
      >
        <Grid item xs={2} className={classes.tokenImg}>
          <a href={ETHERSCAN_ADDRESS_BASE_URL + tokenAddress} target='_blank'>
            <img src={tokenLogo} alt={NoLogo} />
          </a>
        </Grid>
        <Grid item xs={10} className={classes.tokenInfo}>
          <Box className={classes.tokenName}>
            {tokenSymbol ? (
              <Tooltip title={tokenName}>
                <Typography varaint='body2'>{tokenSymbol}</Typography>
              </Tooltip>
            ) : (
              <Skeleton animation='wave' width='100px' height='30px' />
            )}
            <Typography varaint='body2'>
              {!showArrow && endDate ? format(new Date(endDate), DATE_FORMAT) : ''}
            </Typography>
          </Box>
          <Box className={classes.tokenAmount}>
            <Tooltip title={amount}>
              <Typography varaint='body2'>{trunc(amount)}</Typography>
            </Tooltip>
            {showArrow ? (
              <IconButton size='small' style={{ padding: 0 }} onClick={onArrowClick}>
                <ExpandMoreIcon />
              </IconButton>
            ) : (
              <Typography varaint='body2'>{tokenType}</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ClaimTokenCard;
