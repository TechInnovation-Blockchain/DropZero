import { useState } from 'react';
import Countdown from 'react-countdown';
import { Box } from '@material-ui/core';

import { useStyles } from '../theme/styles/components/counterStyles';

const Counter = ({ date }) => {
  const classes = useStyles();
  const [disable, setDisable] = useState(date > Date.now() ? true : false);

  return disable ? (
    <Box className={classes.overlay}>
      <Countdown date={date} onComplete={() => setDisable(false)}></Countdown>
    </Box>
  ) : null;
};

export default Counter;
