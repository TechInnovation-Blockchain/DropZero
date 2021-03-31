import { Fragment } from 'react';
import { Grid, Box, Typography, IconButton, Tooltip } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useStyles } from '../theme/styles/components/claimTokenCardStyles';
import { trunc } from '../utils/formattingFunctions';
import Counter from './Counter';

const ClaimTokenCard = ({
  img,
  token,
  amount,
  startDate,
  expiry,
  type,
  showArrow,
  onArrowClick,
  onClick,
  className,
}) => {
  const classes = useStyles();

  return (
    <Fragment>
      {!showArrow && <Counter date={startDate} />}
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
            <img src={img} alt={token} />
          </a>
        </Grid>
        <Grid item xs={10} className={classes.tokenInfo}>
          <Box className={classes.tokenName}>
            <Typography varaint='body2'>{token}</Typography>
            <Typography varaint='body2'>{!showArrow ? '20 Mar 2021' : ''}</Typography>
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
              <Typography varaint='body2'>XLP</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ClaimTokenCard;
