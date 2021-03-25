import { Fragment, useState } from 'react';
import { Box, Typography, Collapse } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useWeb3React } from '@web3-react/core';

import { useStyles } from '../../theme/styles/pages/drop/dropStyles';
import DropMain from './DropMain';
import DropDashboard from './DropDashboard';

const Drop = () => {
  const classes = useStyles();
  const { account } = useWeb3React();
  const [expand, setExpand] = useState(true);

  const handleToggle = () => {
    setExpand(!expand);
  };

  return account ? (
    <Fragment>
      <Collapse in={expand}>
        <DropMain />
      </Collapse>
      <Box
        className={`${classes.collapse} ${!expand ? classes.hideBorder : ''}`}
        onClick={handleToggle}
      >
        {expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        <Typography variant='body2' className={classes.triggerText}>
          Drop Dashboard
        </Typography>
      </Box>
      <Collapse in={!expand}>
        <DropDashboard />
      </Collapse>
    </Fragment>
  ) : (
    <Box className={classes.noWallet}>
      <Typography variant='body2'>CONNECT WALLET</Typography>
    </Box>
  );
};

export default Drop;
