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
    dropNameError,
    changeTabF,
    saveFieldsF,
  } = useDropInputs();
  const { account } = useWeb3React();
  const {
    loading: { dapp },
  } = useLoading();

  const handleTokenChange = ({ target }) => {
    const token = target?.value;
    if (tokenRegex.test(token)) {
      saveFieldsF({ token, dropName: '', dropNameError: '' });
      validateAddress(token);
    }
  };

  const handleDropNameChange = ({ target }) => {
    const _dropName = target?.value;
    if (dropNameRegex.test(_dropName)) {
      saveFieldsF({
        dropName: _dropName,
        dropNameError: '',
      });
      if (_dropName.trim() !== '') {
        saveFieldsF({ loading: 'dropName' });
        setTimeout(async () => {
          const res = await checkDropName(_dropName, token);
          saveFieldsF({ dropNameError: res ? '' : 'Drop already exists', loading: '' });
        }, 500);
      }
    }
  };

  const handleClick = async () => {
    saveFieldsF({ token: web3.utils.toChecksumAddress(token) });
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
        saveFieldsF({
          dropExists: false,
          approved: 0,

          validated: false,
          loading: 'token',
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
        } else {
          saveFieldsF({
            tokenName: 'Unknown',
            dropExists: false,
            approved: 0,

            validated: false,
            error: 'Please enter a correct Token Address',
            loading: '',
          });
        }
      } else {
        saveFieldsF({ dropExists: false, approved: 0, validated: false, error: '' });
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
        placeholder='Token Address'
        name='token'
        value={token}
        onChange={handleTokenChange}
        autoComplete='off'
        inputProps={{ maxLength: 42 }}
        className={token.length === 42 ? classes.smallerField : ''}
      />
      {loading === 'token' && (
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
        disabled={!validated}
      />
      {loading === 'dropName' && (
        <Box className={classes.loading} style={{ top: '67%' }}>
          <CircularProgress size={12} color='inherit' />
          <Typography variant='body2'>Verifying</Typography>
        </Box>
      )}
      <Typography variant='body2' className={classes.error} style={{ top: '67%' }}>
        {dropNameError}
      </Typography>

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
        <Button
          disabled={
            !validated ||
            !dropExists ||
            approved <= 0 ||
            loading !== '' ||
            dropNameError !== '' ||
            dropName === ''
          }
          onClick={handleClick}
        >
          <span>Next</span>
          <ArrowForwardIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default DropToken;
