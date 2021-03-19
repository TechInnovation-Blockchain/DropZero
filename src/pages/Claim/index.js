import { Fragment, useState } from 'react';
import { Box, Typography, Collapse } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useWeb3React } from '@web3-react/core';

import { useStyles } from '../../theme/styles/pages/claim/claimStyles';
import ClaimMain from './ClaimMain';
import ClaimDashboard from './ClaimDashboard';

const Claim = () => {
  const classes = useStyles();
  const { account } = useWeb3React();
  const [expand, setExpand] = useState(true);

  const handleToggle = () => {
    setExpand(!expand);
  };

  return account ? (
    <Fragment>
      <Collapse in={expand}>
        <ClaimMain />
      </Collapse>
      <Box
        className={`${classes.collapse} ${!expand ? classes.hideBorder : ''}`}
        onClick={handleToggle}
      >
        {expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        <Typography variant='body2' className={classes.triggerText}>
          Claim Dashboard
        </Typography>
      </Box>
      <Collapse in={!expand}>
        <ClaimDashboard />
      </Collapse>
    </Fragment>
  ) : (
    <Box className={classes.noWallet}>
      <Typography variant='body2'>CONNECT WALLET</Typography>
    </Box>
  );
};

export default Claim;
