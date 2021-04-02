import { Box, Typography } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { DATE_FORMAT } from '../../config/constants';

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
        Enter Start and End dates for token claims
      </Typography>

      <KeyboardDatePicker
        className={classes.datePicker}
        placeholder='Start Date'
        value={startDate}
        format={DATE_FORMAT}
        onChange={date => handleDateTimeChange(date, 'startDate')}
        InputProps={{ disableUnderline: true }}
        disablePast
        autoComplete='off'
      />

      <KeyboardDatePicker
        className={classes.datePicker}
        placeholder='End Date'
        value={endDate}
        format={DATE_FORMAT}
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
