import { Fragment, useState, useEffect } from 'react';
import { Box, Typography, Collapse, Tooltip } from '@material-ui/core';
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
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setExpand(!expand);
  };

  useEffect(() => {
    setOpen(true);

    setTimeout(() => {
      setOpen(false);
    }, 5000);
  }, []);

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
        <Typography
          variant='body2'
          className={classes.triggerText}
          onMouseOver={() => setOpen(true)}
          onMouseOut={() => setOpen(false)}
        >
          Drop Dashboard
          <Tooltip title='Some drops are paused' open={open}>
            <span className={classes.paused}></span>
          </Tooltip>
        </Typography>
        {/* <Tooltip title='Some drops are paused'>
          <Box></Box>
        </Tooltip> */}
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
