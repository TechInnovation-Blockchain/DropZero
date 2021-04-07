import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Tooltip } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { InputField, Button } from '../../components';
import { useStyles } from '../../theme/styles/pages/drop/dropMainContentStyles';
import { getName, getAllowance, approve } from '../../contracts/functions/erc20Functions';
import { createDrop, isDropCreated } from '../../contracts/functions/dropFactoryFunctions';
import { useDropInputs, useLoading, useWeb3 } from '../../hooks';
import { getTokenLogo } from '../../redux';

const tokenRegex = /^[a-zA-Z0-9]*$/;
const tokenTypeRegex = /^[a-zA-Z ']*$/;

const DropToken = ({ setContent }) => {
  const classes = useStyles();
  const {
    token,
    tokenType,
    tokenName,
    tokenLogo,
    dropExists,
    approved,
    saveFieldsF,
  } = useDropInputs();
  // const { account } = useWeb3React();
  const { account } = useWeb3();
  const {
    loading: { dapp },
  } = useLoading();

  const [formData, setFormData] = useState({
    validated: token ? true : false,
    error: '',
    loading: false,
  });
  const { validated, error, loading } = formData;

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
    setFormData({ ...formData, dropExists: false });
    saveFieldsF({ token: web3.utils.toChecksumAddress(token) });
    setContent('dates');
  };

  const handleDropCreate = async () => {
    await createDrop(token, account, () => saveFieldsF({ dropExists: true }));
  };

  const handleApprove = async () => {
    await approve(token, account, () => saveFieldsF({ approved: 1 }));
  };

  const validateAddress = token => {
    setTimeout(async () => {
      if (token) {
        setFormData({
          ...formData,
          validated: false,
          loading: true,
          error: '',
        });
        saveFieldsF({
          dropExists: false,
          approved: 0,
        });

        const _tokenName = await getName(token);
        if (web3.utils.isAddress(token) && _tokenName) {
          saveFieldsF({
            tokenName: _tokenName,
            tokenLogo: await getTokenLogo(web3.utils.toChecksumAddress(token)),
            dropExists: await isDropCreated(token),
            approved: await getAllowance(token, account),
          });
          setFormData({
            ...formData,
            validated: true,
            loading: false,
            error: '',
          });
        } else {
          saveFieldsF({ tokenName: 'Unknown', dropExists: false, approved: 0 });
          setFormData({
            ...formData,
            validated: false,
            error: 'Please enter a correct Token Address',
            loading: false,
          });
        }
      } else {
        saveFieldsF({ dropExists: false, approved: 0 });
        setFormData({ ...formData, validated: false, error: '' });
      }
    }, 500);
  };

  // window.ethereum?.on('accountsChanged', () => {
  //   setFormData({
  //     ...formData,
  //     validated: false,
  //     error: '',
  //     loading: false,
  //   });

  //   saveFieldsF({
  //     dropExists: false,
  //     approved: 0,
  //     token: '',
  //   });
  // });

  // useEffect(() => {
  //   setFormData({
  //     ...formData,
  //     validated: false,
  //     error: '',
  //     loading: false,
  //   });

  //   saveFieldsF({
  //     dropExists: false,
  //     approved: 0,
  //     token: '',
  //   });
  //   console.log('hello');
  // }, [account]);

  // console.log(token);

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log('Token => ', token);
  //   }, 5000);
  // }, [account]);

  // console.log(formData);

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
        {dropExists && approved <= 0 ? (
          <Button loading={dapp === 'drop'} disabled={approved > 0} onClick={handleApprove}>
            <span>Approve</span>
          </Button>
        ) : (
          <Button
            loading={dapp === 'drop'}
            disabled={!validated || dropExists}
            onClick={handleDropCreate}
          >
            <span>Create</span>
          </Button>
        )}
        <Button disabled={!validated || !dropExists || approved <= 0} onClick={handleClick}>
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
