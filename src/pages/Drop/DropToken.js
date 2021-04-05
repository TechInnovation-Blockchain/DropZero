import { useState } from 'react';
import { Box, Typography, CircularProgress, Tooltip } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { InputField, Button } from '../../components';
import { useStyles } from '../../theme/styles/pages/drop/dropMainContentStyles';
import { getName, getAllowance } from '../../contracts/functions/erc20Functions';
import { createDrop, isDropCreated } from '../../contracts/functions/dropFactoryFunctions';
import { useDropInputs, useLoading } from '../../hooks';
import { getTokenLogo } from '../../redux';

const tokenRegex = /^[a-zA-Z0-9]*$/;
const tokenTypeRegex = /^[a-zA-Z ']*$/;

const DropToken = ({ setContent }) => {
  const classes = useStyles();
  const { token, tokenType, tokenName, tokenLogo, saveFieldsF } = useDropInputs();
  const { account } = useWeb3React();
  const {
    loading: { dapp },
  } = useLoading();

  const [formData, setFormData] = useState({
    validated: token ? true : false,
    error: '',
    loading: false,
    dropExists: false,
  });
  const { validated, error, loading, dropExists } = formData;

  const handleTokenChange = ({ target }) => {
    const token = target?.value;
    if (tokenRegex.test(token)) {
      saveFieldsF({ token });
      validateAddress(token);
    }
  };

  const handleTypeChange = ({ target }) => {
    const type = target?.value;
    if (tokenTypeRegex.test(type)) {
      saveFieldsF({ tokenType: type });
    }
  };

  const handleClick = async () => {
    saveFieldsF({ token: web3.utils.toChecksumAddress(token) });
    setContent('dates');
  };

  const handleDropCreate = async () => {
    await createDrop(token, account, () => setFormData({ ...formData, dropExists: true }));
  };

  const validateAddress = token => {
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
          setFormData({
            ...formData,
            validated: true,
            loading: false,
            dropExists: await isDropCreated(token),
          });
          await getAllowance(token, account);
        } else {
          saveFieldsF({ tokenName: 'Unknown' });
          setFormData({
            ...formData,
            validated: false,
            error: 'Please enter a correct Token Address',
            loading: false,
            dropExists: false,
          });
        }
      } else {
        setFormData({ ...formData, validated: false, error: '' });
      }
    }, 500);
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
        value={token}
        onChange={handleTokenChange}
        autoComplete='off'
        inputProps={{ maxLength: 42 }}
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
        onChange={handleTypeChange}
        autoComplete='off'
        inputProps={{ maxLength: 20 }}
      />

      <Tooltip title='Example: "Early Birds"'>
        <HelpOutlineIcon className={classes.help} />
      </Tooltip>

      <Box className={classes.btnContainer}>
        <Button loading={dapp} disabled={!validated || dropExists} onClick={handleDropCreate}>
          <span>Create</span>
        </Button>
        <Button disabled={!validated || !dropExists} onClick={handleClick}>
          <span>Next</span>
          <ArrowForwardIcon />
        </Button>
      </Box>

      {validated && dropExists && (
        <Typography variant='body2' className={classes.dropExist}>
          Drop already exists
        </Typography>
      )}
    </Box>
  );
};

export default DropToken;
