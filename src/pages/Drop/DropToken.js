import { useState } from 'react';
import { Box, Typography, CircularProgress, Tooltip } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { InputField, Button } from '../../components';
import { useStyles } from '../../theme/styles/pages/drop/dropMainContentStyles';
import { getName, getAllowance, approve } from '../../contracts/functions/erc20Functions';
import { createDrop, isDropCreated } from '../../contracts/functions/dropFactoryFunctions';
import { useDropInputs, useLoading } from '../../hooks';
import { getTokenLogo, checkDropName } from '../../redux';

const tokenRegex = /^[a-zA-Z0-9]*$/;
const dropNameRegex = /^[a-zA-Z0-9 ]*$/;

const DropToken = () => {
  const classes = useStyles();
  const {
    token,
    dropName,
    tokenName,
    tokenLogo,
    dropExists,
    approved,
    validated,
    loading,
    error,
    changeTabF,
    saveFieldsF,
  } = useDropInputs();
  const { account } = useWeb3React();
  const {
    loading: { dapp },
  } = useLoading();

  // const [formData, setFormData] = useState({
  //   validated: token ? true : false,
  //   error: '',
  //   loading: false,
  // });
  // const { validated, error, loading } = formData;

  const handleTokenChange = ({ target }) => {
    const token = target?.value;
    if (tokenRegex.test(token)) {
      saveFieldsF({ token });
      validateAddress(token);
    }
  };

  const handleDropNameChange = async ({ target }) => {
    const _dropName = target?.value;
    if (dropNameRegex.test(_dropName)) {
      saveFieldsF({ dropName: _dropName });
      // await checkDropName(_dropName, token);
    }
  };

  const handleClick = async () => {
    //setFormData({ ...formData, dropExists: false });
    saveFieldsF({ token: web3.utils.toChecksumAddress(token) });
    //setContent('dates');
    changeTabF('dates');
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
        // setFormData({
        //   ...formData,
        //   validated: false,
        //   loading: true,
        //   error: '',
        // });
        saveFieldsF({
          dropExists: false,
          approved: 0,

          validated: false,
          loading: true,
          error: '',
        });

        const _tokenName = await getName(token);
        if (web3.utils.isAddress(token) && _tokenName) {
          saveFieldsF({
            tokenName: _tokenName,
            tokenLogo: await getTokenLogo(web3.utils.toChecksumAddress(token)),
            dropExists: await isDropCreated(token),
            approved: await getAllowance(token, account),

            validated: true,
            loading: false,
            error: '',
          });
          // setFormData({
          //   ...formData,
          //   validated: true,
          //   loading: false,
          //   error: '',
          // });
        } else {
          saveFieldsF({
            tokenName: 'Unknown',
            dropExists: false,
            approved: 0,

            validated: false,
            error: 'Please enter a correct Token Address',
            loading: false,
          });
          // setFormData({
          //   ...formData,
          //   validated: false,
          //   error: 'Please enter a correct Token Address',
          //   loading: false,
          // });
        }
      } else {
        saveFieldsF({ dropExists: false, approved: 0, validated: false, error: '' });
        //setFormData({ ...formData, validated: false, error: '' });
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
  // });

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
        placeholder='Token Address'
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
        placeholder='Name This Drop'
        name='dropName'
        value={dropName}
        onChange={handleDropNameChange}
        autoComplete='off'
        inputProps={{ maxLength: 15 }}
        // disabled={!validated}
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

      {/* {validated && dropExists && (
        <Typography variant='body2' className={classes.dropExist}>
          Drop already exists
        </Typography>
      )} */}
    </Box>
  );
};

export default DropToken;
