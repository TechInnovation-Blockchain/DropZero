import { Box, Typography } from '@material-ui/core';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Button } from '../../components';
import { useStyles } from '../../theme/styles/pages/drop/dropMainContentStyles';
import { useDropInputs } from '../../hooks';

const DropDates = ({ setContent }) => {
  const classes = useStyles();
  const { startDate, endDate, saveFieldsF } = useDropInputs();

  const handleDateTimeChange = (date, key) => {
    saveFieldsF({ [key]: date });
  };

  return (
    <Box className={classes.mainContainer}>
      <Typography variant='body2' className={classes.para}>
        Enter starting and ending dates of calims for the token
      </Typography>

      <KeyboardDateTimePicker
        className={classes.datePicker}
        placeholder='Start Date'
        value={startDate}
        format='MM/dd/yyyy hh:mm'
        onChange={date => handleDateTimeChange(date, 'startDate')}
        InputProps={{ disableUnderline: true }}
        disablePast
        autoComplete='off'
      />

      <KeyboardDateTimePicker
        className={classes.datePicker}
        placeholder='End Date'
        value={endDate}
        format='MM/dd/yyyy hh:mm'
        onChange={date => handleDateTimeChange(date, 'endDate')}
        InputProps={{ disableUnderline: true }}
        disablePast
        autoComplete='off'
      />

      <Box className={classes.btnContainer}>
        <Button onClick={() => setContent('token')}>
          <ArrowBackIcon />
          <span>Back</span>
        </Button>
        <Button
          // disabled={startDate && endDate ? false : true}
          // disabled={dateError}
          disabled={startDate != 'Invalid Date' && endDate != 'Invalid Date' ? false : true}
          onClick={() => setContent('uploadCSV')}
        >
          <span>Next</span>
          <ArrowForwardIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default DropDates;
