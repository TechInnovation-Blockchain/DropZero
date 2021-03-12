import { Box, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { InputField, Button } from '../../components';
import { useStyles } from '../../theme/styles/pages/drop/dropMainContentStyles';

const DropAmount = ({ setContent }) => {
  const classes = useStyles();

  const handleKeyDown = e => {
    ['+', '-', 'e'].includes(e.key) && e.preventDefault();
  };

  return (
    <Box className={classes.mainContainer}>
      <Typography variant='body2' className={classes.para}>
        How Many of these tokens would you like to drop ?
      </Typography>
      <InputField placeholder='0.0' type='number' onKeyDown={handleKeyDown} />
      <Box className={classes.btnContainer}>
        <Button onClick={() => setContent('token')}>
          <ArrowBackIcon />
          <span>Back</span>
        </Button>
        <Button onClick={() => setContent('uploadCSV')}>
          <span>Next</span>
          <ArrowForwardIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default DropAmount;
