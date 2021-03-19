import { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import web3 from 'web3';

import { InputField, Button } from '../../components';
import { useStyles } from '../../theme/styles/pages/drop/dropMainContentStyles';
import { name } from '../../contracts/functions/erc20Functions';
import { useDropInputs } from '../../hooks';

const DropToken = ({ setContent }) => {
  const classes = useStyles();
  const { token, date, saveFieldsF } = useDropInputs();
  const [formData, setFormData] = useState({
    tokenName: 'Unknown',
    validated: token ? true : false,
    error: '',
  });
  const [dateError, setDateError] = useState(false);
  const { validated, tokenName, error } = formData;

  const handleChange = e => {
    if (e?.target) {
      saveFieldsF({ token: e.target.value });
      setFormData({ ...formData, error: '' });
    } else {
      saveFieldsF({ date: e });
      if (e == 'Invalid Date') {
        setDateError(true);
      } else {
        setDateError(false);
      }
    }
  };

  const handleClick = async () => {
    setContent('uploadCSV');
  };

  const validateAddress = () => {
    setTimeout(async () => {
      if (token) {
        const _tokenName = await name(token);
        if (web3.utils.isAddress(token) && _tokenName) {
          setFormData({ ...formData, validated: true, tokenName: _tokenName });
        } else {
          setFormData({
            ...formData,
            validated: false,
            tokenName: 'Unknown',
            error: 'Invalid Token',
          });
        }
      } else {
        setFormData({ ...formData, validated: false, error: '' });
      }
    }, 500);
  };

  return (
    <Box className={classes.mainContainer}>
      {validated && web3.utils.isAddress(token) ? (
        <Box className={classes.tokenInfo}>
          <img
            src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${web3.utils.toChecksumAddress(
              token
            )}/logo.png`}
            alt='logo'
            width='30px'
          />
          <Typography variant='body2'>{tokenName}</Typography>
        </Box>
      ) : (
        <Typography variant='body2' className={classes.para}>
          Enter the token address of the asset you would like to drop
        </Typography>
      )}

      <InputField
        placeholder='Token Address*'
        name='token'
        value={token}
        onChange={handleChange}
        autoComplete='off'
        onKeyUp={validateAddress}
        id='abx'
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
          disablePast
          autoComplete='off'
        />
      </MuiPickersUtilsProvider>
      <Box>
        <Button disabled={!validated || dateError} onClick={handleClick}>
          <span>Next</span>
          <ArrowForwardIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default DropToken;
