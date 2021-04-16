import { useState } from 'react';
import Countdown from 'react-countdown';
import { Box } from '@material-ui/core';

import { useClaims } from '../hooks';
import { useStyles } from '../theme/styles/components/counterStyles';

const Counter = ({ date, token }) => {
  const classes = useStyles();
  const { lockedClaims, unlockedClaims, setLockAndUnlockClaimsF } = useClaims();

  const [disable, setDisable] = useState(date > Date.now() ? true : false);

  const handleComplete = () => {
    setDisable(false);
    setLockAndUnlockClaimsF({
      lockedClaims: lockedClaims.filter(item => item._id !== token._id),
      unlockedClaims: [...unlockedClaims, token],
    });
  };

  return disable ? (
    <Box className={classes.overlay}>
      <Countdown date={date} onComplete={handleComplete}></Countdown>
    </Box>
  ) : null;
};

export default Counter;
