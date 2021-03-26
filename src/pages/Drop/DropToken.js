import { useState } from 'react';
import { Box, Typography, CircularProgress } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { KeyboardDatePicker } from '@material-ui/pickers';
import web3 from 'web3';

import { InputField, Button } from '../../components';
import { useStyles } from '../../theme/styles/pages/drop/dropMainContentStyles';
import { name } from '../../contracts/functions/erc20Functions';
import { useDropInputs } from '../../hooks';
import { getTokenLogo } from '../../redux';

const DropToken = ({ setContent }) => {
  const classes = useStyles();
  const { token, tokenName, tokenLogo, date, saveFieldsF } = useDropInputs();
  const [formData, setFormData] = useState({
    validated: token ? true : false,
    error: '',
    loading: false,
  });
  const [dateError, setDateError] = useState(false);
  const { validated, error, loading } = formData;

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
    saveFieldsF({ token: web3.utils.toChecksumAddress(token) });
    setContent('dates');
  };

  const validateAddress = () => {
    setTimeout(async () => {
      if (token) {
        setFormData({
          ...formData,
          loading: true,
        });
        const _tokenName = await name(token);
        if (web3.utils.isAddress(token) && _tokenName) {
          saveFieldsF({
            ...formData,
            tokenName: _tokenName,
            tokenLogo: await getTokenLogo(web3.utils.toChecksumAddress(token)),
          });
          setFormData({ ...formData, validated: true, loading: false });
        } else {
          saveFieldsF({ tokenName: 'Unknown' });
          setFormData({
            ...formData,
            validated: false,
            error: 'Invalid Token Address',
            loading: false,
          });
        }
      } else {
        setFormData({ ...formData, validated: false, error: '' });
      }
    }, 500);
  };

  const handleKeyDown = e => {
    const regex = /^[a-zA-Z0-9]*$/;
    !regex.test(e.key) && e.preventDefault();
  };

  return (
    <Box className={classes.mainContainer}>
      {validated && web3.utils.isAddress(token) ? (
        <Box className={classes.tokenInfo}>
          <img src={tokenLogo} alt='logo' width='30px' />
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
        inputProps={{ maxLength: 42 }}
        onKeyDown={handleKeyDown}
      />
      {loading && (
        <Box className={classes.loading}>
          <CircularProgress size={12} color='inherit' />
          <Typography variant='body2'>Verifying</Typography>
        </Box>
      )}
      <Typography variant='body2' className={classes.error}>
        {error}
      </Typography>

      {/* <KeyboardDatePicker
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
      /> */}

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
