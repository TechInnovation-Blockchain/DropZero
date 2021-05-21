import { useState, useEffect } from 'react';
import { Box, Typography, Tooltip, CircularProgress } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PublishIcon from '@material-ui/icons/Publish';
import { useWeb3React } from '@web3-react/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { utils } from 'ethers';

import { Button, Dialog, ActionDialog, DisclaimerDialog } from '../../components';
import { useStyles } from '../../theme/styles/pages/drop/dropMainContentStyles';
import { useDropInputs, useLoading, useDropDashboard, useJWT, useSnackbar } from '../../hooks';
import { getBalance, getDecimal } from '../../contracts/functions/erc20Functions';
import { addDropData } from '../../contracts/functions/dropFactoryFunctions';
import { truncFileName, trunc } from '../../utils/formattingFunctions';
import { logMessage } from '../../utils/log';
import { validateCSV, removeDuplicateAddress, toFixed } from '../../utils/validatingFunctions';
import TempCSV from '../../assets/temp.csv';
import BalanceTree from '../../utils/balanceTree';
import { showModal } from '../../redux';

const fileNameRegex = /^[a-zA-Z0-9]{1,15}.csv$/i;

const DropCSV = () => {
  const classes = useStyles();
  const {
    token,
    startDate,
    endDate,
    dropName,
    csv,
    clearFieldsF,
    uploadCSVF,
    clearCSVF,
    changeTabF,
  } = useDropInputs();
  const { account } = useWeb3React();
  const { getUserDropsF } = useDropDashboard();
  const {
    loading: { dapp },
  } = useLoading();
  const { jwt } = useJWT();
  const { showSnackbarF } = useSnackbar();

  const [formData, setFormData] = useState({
    file: null,
    csvError: '',
    open: false,
    openDis: false,
    loadingContent: '',
    totalAmount: 0,
    totalAddress: 0,
    balance: 0,
  });
  const [content, setContent] = useState();
  const [decimal, setDecimal] = useState();

  const {
    file,
    csvError,
    open,
    openDis,
    totalAmount,
    totalAddress,
    balance,
    loadingContent,
  } = formData;

  const uploadingCSV = _file => {
    if (_file) {
      if (fileNameRegex.test(_file.name)) {
        setFormData({
          ...formData,
          csvError: '',
          loadingContent: 'Validating CSV',
          totalAmount: 0,
          totalAddress: 0,
        });
        const fileReader = new FileReader();
        fileReader.onloadend = async e => {
          const _content = e.target.result;
          setContent(_content);
          logMessage('CSV Content', _content);
          const _decimal = await getDecimal(token);
          setDecimal(_decimal);
          const { validCSVError, _totalAmount, _totalAddress } = validateCSV(
            _content.split('\n'),
            _decimal
          );
          if (validCSVError === '') {
            const balance = await getBalance(token, account);
            setFormData({
              ...formData,
              file: _file,
              csvError: '',
              loadingContent: '',
              totalAmount: _totalAmount,
              totalAddress: _totalAddress,
              balance: Number(utils.formatUnits(balance.toString(), _decimal).toString()),
            });
          } else {
            setFormData({
              ...formData,
              file: _file,
              csvError: validCSVError,
              loadingContent: '',
            });
          }
        };
        fileReader.readAsText(_file);
      } else {
        setFormData({
          ...formData,
          file: _file,
          csvError: 'Invalid filename',
        });
      }
    }
  };

  const handleUploadChange = ({ target }) => {
    const _file = target?.files[0];
    target.value = '';
    uploadingCSV(_file);
  };

  const uploadCSVOnServer = async () => {
    setFormData({ ...formData, loadingContent: 'Uploading CSV', openDis: false });
    //const decimal = await getDecimal(token);
    const data = {
      file,
      account,
      token,
      startDate,
      endDate,
      dropName: dropName.trim(),
      decimal,
      totalAmount,
    };
    uploadCSVF(data, jwt, () => {
      setFormData({ ...formData, loadingContent: '', open: false, openDis: false });
      //setFormData({ ...formData, loadingContent: 'Verifying merkle root' });
    });
  };

  const handleDisclaimerClose = () => {
    setFormData({ ...formData, openDis: false });
    uploadCSVOnServer();
  };

  const handleDrop = e => {
    e.preventDefault();
    const _file = e.dataTransfer.files[0];
    const extension = _file?.name?.substring(_file?.name?.lastIndexOf('.', _file?.name?.length));
    if (extension === '.csv') uploadingCSV(_file);
  };

  const handleAllowDrop = e => {
    e.preventDefault();
  };

  const createDrop = async (merkleRoot, dropperId) => {
    //const decimal = await getDecimal(token);
    const regex = new RegExp('^-?\\d+(?:.\\d{0,' + decimal + '})?');
    const tokenAmount =
      totalAmount.toString().split('.').length > 1
        ? totalAmount.toString().match(regex)[0]
        : totalAmount.toString();
    const dropData = {
      tokenAmount: utils.parseUnits(tokenAmount, decimal).toString(),
      startDate: startDate
        ? Math.round(new Date(startDate).getTime() / 1000)
        : Math.round(Date.now() / 10000),
      endDate: endDate ? Math.round(new Date(endDate).getTime() / 1000) : 4294967295,
      merkleRoot,
      tokenAddress: token,
      walletAddress: account,
      dropperId,
    };
    await addDropData(
      dropData,
      jwt,
      () => {
        setFormData({ ...formData, loadingContent: '', open: false });
        clearCSVF();
      },
      () => {
        clearFieldsF();
        getUserDropsF(jwt);
      }
    );
  };

  const calculateMerkleRoot = timestamp => {
    let csvData = [];
    const _content = content.split('\n');
    for (let i = 1; i < _content.length; i++) {
      if (_content[i] !== '') {
        const _data = _content[i].split(',');
        csvData.push({ address: _data[0].toLowerCase(), amount: toFixed(_data[1], decimal) });
      }
    }

    csvData = removeDuplicateAddress(csvData, decimal);
    csvData.push({
      address: '0x0000000000000000000000000000000000000000',
      amount: timestamp,
    });

    const balanceTree = new BalanceTree(csvData, decimal);
    const merkleRoot = balanceTree.getHexRoot();
    logMessage('merkleRoot', merkleRoot);
    return merkleRoot;
  };

  const verifyMerkleRoot = (serverMerkleRoot, dropperId, timestamp) => {
    setFormData({ ...formData, loadingContent: 'Verifying root hash' });
    const merkleRoot = calculateMerkleRoot(timestamp);
    logMessage('server merkleRoot', serverMerkleRoot);
    if (serverMerkleRoot === merkleRoot) {
      showSnackbarF({ message: 'Root hash verified', severity: 'success' });
      createDrop(serverMerkleRoot, dropperId);
    } else {
      showModal({
        variant: 'error',
        open: true,
        showCloseBtn: true,
        btnText: 'Dismiss',
        text: 'Root hash verification failed',
      });
      showSnackbarF({ message: 'Verification failed', severity: 'error' });
    }
    setFormData({ ...formData, loadingContent: '', open: false, openDis: false });
  };

  useEffect(() => {
    const merkleRoot = csv?.merkle_root;
    const dropperId = csv?.dropper_id;
    const date = csv?.date;
    if (merkleRoot) {
      //createDrop(merkleRoot, dropperId);
      verifyMerkleRoot(merkleRoot, dropperId, date);
    }
  }, [csv]);

  return (
    <Box className={classes.mainContainer}>
      <Dialog
        open={open}
        handleClose={() => setFormData({ ...formData, open: false })}
        secondaryText='If there are errors, please upload a new file. No changes can be made after you press CONFIRM.'
        btnText='Confirm'
        btnOnClick={() => setFormData({ ...formData, openDis: true, open: false })}
        errorMsg={
          balance < totalAmount ? 'Your current wallet have insufficient amount of tokens' : ''
        }
        renderContent={
          <Typography variant='body2'>
            {`Please confirm you are submitting ${totalAddress} addresses for a total of `}
            <Tooltip title={totalAmount}>
              <Typography variant='body2' component='span'>
                {trunc(totalAmount)}{' '}
              </Typography>
            </Tooltip>
            tokens.
          </Typography>
        }
      />

      <DisclaimerDialog
        open={openDis}
        heading='Disclaimer'
        handleClose={() => setFormData({ ...formData, openDis: false })}
        btnOnClick={handleDisclaimerClose}
        type='drop'
      />

      <ActionDialog
        variant='loading'
        open={loadingContent === 'Uploading CSV' || loadingContent === 'Verifying root hash'}
        text={loadingContent}
      />

      <Typography variant='body2' className={classes.para}>
        Who would you like to drop these tokens to?
      </Typography>

      <label className={classes.fileUploader} onDrop={handleDrop} onDragOver={handleAllowDrop}>
        <input type='file' accept='.csv' onChange={handleUploadChange} />
        <Box>
          <Typography variant='body2'>
            {file ? truncFileName(file.name, 20) : 'Choose or drag file'}
          </Typography>
          {csvError === 'Invalid filename' && (
            <Tooltip title='Example: "filename.csv" upto 15 characters are allowed'>
              <HelpOutlineIcon className={classes.help} style={{ top: '32%', right: 10 }} />
            </Tooltip>
          )}
        </Box>
      </label>

      {loadingContent === 'Validating CSV' && (
        <Box className={classes.loading} style={{ top: '57%' }}>
          <CircularProgress size={12} color='inherit' />
          <Typography variant='body2'>Validating CSV</Typography>
        </Box>
      )}

      <Typography variant='body2' className={classes.error} style={{ top: '57%' }}>
        {csvError}
      </Typography>

      <Box className={classes.btnContainer}>
        <Button onClick={() => changeTabF('dates')}>
          <ArrowBackIcon />
          <span>Back</span>
        </Button>
        <Button
          disabled={file && csvError === '' ? false : true}
          onClick={() => setFormData({ ...formData, open: true })}
          loading={dapp === 'upload'}
        >
          <span>Upload</span>
          {dapp !== 'upload' && <PublishIcon />}
        </Button>
      </Box>
      <Typography component='a' href={TempCSV} download='sample.csv' variant='body2'>
        Download sample CSV
      </Typography>
    </Box>
  );
};

export default DropCSV;
