import { Box, Typography } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { InputField, Button } from '../../components';
import { useStyles } from '../../theme/styles/pages/drop/dropMainContentStyles';

const DropToken = ({ setContent }) => {
  const classes = useStyles();

  return (
    <Box className={classes.mainContainer}>
      <Typography variant='body2' className={classes.para}>
        Enter the token address of the asset you would like to drop
      </Typography>
      <InputField placeholder='Enter Token' />
      <Box>
        <Button onClick={() => setContent('amount')}>
          <span>Next</span>
          <ArrowForwardIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default DropToken;
