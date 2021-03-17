import { useState, useRef } from 'react';
import { Box, Typography } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import web3 from 'web3';

import { InputField, Button } from '../../components';
import { useStyles } from '../../theme/styles/pages/drop/dropMainContentStyles';
import { debounce } from '../../utils/formattingFunctions';

const DropToken = ({ setContent }) => {
  const classes = useStyles();
  const ref = useRef();
  const [formData, setFormData] = useState({ date: null, token: '', error: '' });
  const { token, date, error } = formData;

  const handleChange = e => {
    if (e?.target) {
      setFormData({ ...formData, [e.target.name]: e.target.value, error: '' });
    } else {
      setFormData({ ...formData, date: e });
    }
  };

  const handleClick = () => {
    if (token && web3.utils.isAddress(token)) {
      setContent('uploadCSV');
    } else {
      setFormData({ ...formData, error: 'Invalid Token' });
    }
  };

  const temp = () => {
    console.log('hello');
  };

  const validateAddress = () => {
    debounce(temp, 10);
  };

  // document.getElementById('abx').addEventListener('keyup', () => {
  //   let typingTimer;
  //   clearTimeout(typingTimer);
  //   if (token) {
  //     typingTimer = setTimeout(doneTyping, 5000);
  //   }
  // });

  // const doneTyping = () => {
  //   console.log('Hello');
  // };

  return (
    <Box className={classes.mainContainer}>
      <Typography variant='body2' className={classes.para}>
        Enter the token address of the asset you would like to drop
      </Typography>

      <InputField
        placeholder='Token Address*'
        name='token'
        onChange={handleChange}
        autoComplete='off'
        onKeyUp={validateAddress}
        id={'abx'}
      />
      <Typography variant='body2' className={classes.error}>
        {error}
      </Typography>

      <MuiPickersUtilsProvider value={token} utils={DateFnsUtils}>
        <KeyboardDatePicker
          className={classes.datePicker}
          margin='normal'
          id='date-picker-dialog'
          placeholder='MM/dd/yyyy'
          InputProps={{ disableUnderline: true }}
          format='MM/dd/yyyy'
          value={date}
          onChange={handleChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          autoComplete='off'
        />
      </MuiPickersUtilsProvider>
      <Box>
        <Button disabled={token ? false : true} onClick={handleClick}>
          <span>Next</span>
          <ArrowForwardIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default DropToken;
