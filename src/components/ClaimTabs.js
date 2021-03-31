import { useState } from 'react';
import { Box, Typography } from '@material-ui/core';

import { useStyles } from '../theme/styles/components/claimTabsStyles';
import RenderTokens from './RenderTokens';
import PageAnimation from './PageAnimation';

import FLASH from '../assets/FLASH.png';

const tokens = [
  {
    rootHash: '0x20398ad62bb2d930646d45a6d4292baa0b860c1f',
    token: 'FLASH',
    img: FLASH,
    amount: 12345678,
  },
  {
    rootHash: '0x20398ad62bb2d930646d45a6d4292baa0b860c2f',
    token: 'FLASH',
    img: FLASH,
    amount: 123456789.144,
  },
  {
    rootHash: '0x20398ad62bb2d930646d45a6d4292baa0b860c3f',
    token: 'FLASH',
    img: FLASH,
    amount: 10000,
  },
];

const lockedTokens = [
  {
    rootHash: '0x20398ad62bb2d930646d45a6d4292baa0b860c1f',
    token: 'FLASH',
    img: FLASH,
    amount: 12345678,
    startDate: Date.now() + 2500000,
  },
  {
    rootHash: '0x20398ad62bb2d930646d45a6d4292baa0b860c2f',
    token: 'FLASH',
    img: FLASH,
    amount: 123456789.144,
    startDate: Date.now() + 3000000,
  },
  {
    rootHash: '0x20398ad62bb2d930646d45a6d4292baa0b860c3f',
    token: 'FLASH',
    img: FLASH,
    amount: 10000,
    startDate: Date.now() + 8500000,
  },
];

const ClaimTabs = ({ goBack }) => {
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

        {tab === 'unlock' ? (
          <PageAnimation in={tab} key={tab} reverse={1}>
            <RenderTokens unlocked tokens={tokens} goBack={goBack} />
          </PageAnimation>
        ) : (
          <PageAnimation in={tab} key={tab} reverse={0}>
            <RenderTokens tokens={lockedTokens} goBack={goBack} />
          </PageAnimation>
        )}
      </Box>
    </Box>
  );
};

export default ClaimTabs;
