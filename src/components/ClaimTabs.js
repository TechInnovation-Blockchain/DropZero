import { useState } from 'react';
import { Box, Typography } from '@material-ui/core';

import { useStyles } from '../theme/styles/components/claimTabsStyles';

const ClaimTabs = () => {
  const classes = useStyles();
  const [tab, setTab] = useState('unlock');

  return (
    <Box className={classes.mainContainer}>
      <Typography variant='body1' className={classes.heading}>
        Available Tokens
      </Typography>
      <Box className={classes.tabsWrapper}>
        <Box className={classes.tabs}>
          <Typography
            onClick={() => setTab('unlock')}
            className={tab === 'unlock' ? classes.activeTab : ''}
            variant='body2'
          >
            UNLOCK
          </Typography>

          <Typography
            onClick={() => setTab('lock')}
            className={tab === 'lock' ? classes.activeTab : ''}
            variant='body2'
          >
            LOCK
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ClaimTabs;
