import { Box, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { InputField, Button } from '../../components';
import { useStyles } from '../../theme/styles/pages/drop/dropMainContentStyles';

const DropAmount = ({ setContent }) => {
  const classes = useStyles();

  return (
    <Box className={classes.mainContainer}>
      <Typography variant='body2' className={classes.para}>
        How Many of these tokens would you like to drop ?
      </Typography>
      <InputField placeholder='Enter Amount' />
      <Box className={classes.btnContainer}>
        <Button text='Back' leftIcon={<ArrowBackIcon />} onClick={() => setContent('token')} />
        <Button
          text='Next'
          rightIcon={<ArrowForwardIcon />}
          onClick={() => setContent('uploadCSV')}
        />
      </Box>
    </Box>
  );
};

export default DropAmount;
