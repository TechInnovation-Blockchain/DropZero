import { Fragment, useState, useEffect } from 'react';
import { Box, Typography, Collapse, Tooltip } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useWeb3React } from '@web3-react/core';

import { useStyles } from '../../theme/styles/pages/drop/dropStyles';
import DropMain from './DropMain';
import DropDashboard from './DropDashboard';
import { useInitiallyRedndering, useDropDashboard } from '../../hooks';

const Drop = () => {
  const classes = useStyles();
  const { account } = useWeb3React();
  const { initialRender, initiallyRenderedF } = useInitiallyRedndering();
  const { dropsPausing } = useDropDashboard();

  const [expand, setExpand] = useState(true);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setExpand(!expand);
  };

  useEffect(() => {
    if (initialRender) {
      setOpen(true);
      initiallyRenderedF();

      setTimeout(() => {
        setOpen(false);
      }, 5000);
    }
  }, []);

  // const temp = async () => {
  //   console.log(await window?.ethereum?._metamask?.isUnlocked());
  // };

  // temp();

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
          {dropsPausing && (
            <Tooltip title='Some drops are paused' arrow open={open}>
              <span
                className={classes.paused}
                onMouseOver={() => setOpen(true)}
                onMouseOut={() => setOpen(false)}
              ></span>
            </Tooltip>
          )}
        </Typography>
      </Box>
      <Collapse in={!expand}>
        <DropDashboard />
      </Collapse>
    </Fragment>
  ) : (
    <Box className={classes.noWallet}>
      <Typography variant='body2'>Connect your wallet to drop</Typography>
    </Box>
  );
};

export default Drop;
