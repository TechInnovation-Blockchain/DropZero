import { useState } from 'react';
import { Box, Typography, CircularProgress, Tooltip } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { InputField, Button } from '../../components';
import { useStyles } from '../../theme/styles/pages/drop/dropMainContentStyles';
import { getName } from '../../contracts/functions/erc20Functions';
import { createDrop } from '../../contracts/functions/dropFactoryFunctions';
import { useDropInputs } from '../../hooks';
import { getTokenLogo } from '../../redux';

const DropToken = ({ setContent }) => {
  const classes = useStyles();
  const { token, tokenType, tokenName, tokenLogo, saveFieldsF } = useDropInputs();
  const { account } = useWeb3React();
  const [formData, setFormData] = useState({
    validated: token ? true : false,
    error: '',
    loading: false,
  });
  const { validated, error, loading } = formData;

  const handleChange = e => {
    if (e?.target) {
      saveFieldsF({ [e.target.name]: e.target.value });
      setFormData({ ...formData, error: '' });
    }
  };

  const handleClick = async () => {
    // createDrop(token, account);
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
        const _tokenName = await getName(token);
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
            error: 'Please enter a correct Token Address',
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

  const handleAlphaOnly = e => {
    const regex = /^[a-zA-Z,. ']*$/;
    !regex.test(e.key) && e.preventDefault();
  };

  return (
    <Box className={classes.mainContainer}>
      {validated ? (
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
        // value={token.length < 30 ? token : token.substring(token, 30) + '...'}
        value={token}
        onChange={handleChange}
        autoComplete='off'
        onKeyUp={validateAddress}
        inputProps={{ maxLength: 42 }}
        onKeyDown={handleKeyDown}
        className={token.length === 42 ? classes.smallerField : ''}
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

      <InputField
        placeholder='Token Type'
        name='tokenType'
        value={tokenType}
        onChange={handleChange}
        autoComplete='off'
        inputProps={{ maxLength: 20 }}
        onKeyDown={handleAlphaOnly}
      />

      <Tooltip title='Example: "Early Birds"'>
        <HelpOutlineIcon className={classes.help} />
      </Tooltip>

      <Box>
        <Button disabled={!validated} onClick={handleClick}>
          <span>Next</span>
          <ArrowForwardIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default DropToken;
