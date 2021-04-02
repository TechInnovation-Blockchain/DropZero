import { Fragment, useEffect, useState } from 'react';
import { Grid, Box, Typography, IconButton, Tooltip } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Web3 from 'web3';
import { format } from 'date-fns';
import { DATE_FORMAT } from '../config/constants';

import { useStyles } from '../theme/styles/components/claimTokenCardStyles';
import { trunc } from '../utils/formattingFunctions';
import Counter from './Counter';
import { getTokenLogo } from '../redux';
import { getName } from '../contracts/functions/erc20Functions';
import { NoLogo } from '../config/constants';

const ClaimTokenCard = ({ token, showArrow, amount, onArrowClick, onClick, className }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({ tokenLogo: NoLogo, tokenName: '' });
  const { tokenLogo, tokenName } = formData;
  const { tokenAddress, startDate, endDate, tokenType } = token;

  useEffect(() => {
    if (tokenAddress) {
      const fetchAPI = async () => {
        const logo = await getTokenLogo(Web3.utils.toChecksumAddress(tokenAddress));
        const name = await getName(tokenAddress);
        setFormData({ tokenLogo: logo, tokenName: name ? name : 'Unknown' });
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
        onClick={onClick}
      >
        <Grid item xs={2} className={classes.tokenImg}>
          <a
            href='https://rinkeby.etherscan.io/address/0x20398aD62bb2D930646d45a6D4292baa0b860C1f#code'
            target='_blank'
          >
            <img src={tokenLogo} alt={NoLogo} />
          </a>
        </Grid>
        <Grid item xs={10} className={classes.tokenInfo}>
          <Box className={classes.tokenName}>
            {tokenName ? (
              <Typography varaint='body2'>{tokenName}</Typography>
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
