import { useState } from 'react';
import { Box, Typography, Tooltip } from '@material-ui/core';

import { useStyles } from '../theme/styles/components/claimTabsStyles';
import RenderTokens from './RenderTokens';
import PageAnimation from './PageAnimation';
import { useClaims } from '../hooks';

const ClaimTabs = ({ goBack }) => {
  const classes = useStyles();
  const { lockedClaims, unlockedClaims } = useClaims();

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
            ACTIVE
          </Typography>

          <Typography
            onClick={() => setTab('lock')}
            className={tab === 'lock' ? classes.activeTab : ''}
            variant='body2'
            style={{ position: 'relative' }}
          >
            UPCOMING
            {lockedClaims.length > 0 && (
              <Tooltip title='You have upcoming claims' arrow>
                <span className={classes.upcoming}></span>
              </Tooltip>
            )}
          </Typography>
        </Box>

        {tab === 'unlock' ? (
          <PageAnimation in={tab} key={tab} reverse={1}>
            <RenderTokens unlocked tokens={unlockedClaims} goBack={goBack} />
          </PageAnimation>
        ) : (
          <PageAnimation in={tab} key={tab} reverse={0}>
            <RenderTokens tokens={lockedClaims} goBack={goBack} />
          </PageAnimation>
        )}
      </Box>
    </Box>
  );
};

export default ClaimTabs;
