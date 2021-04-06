import { useState, useEffect } from 'react';
import { Box, Typography, Tooltip, CircularProgress } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PublishIcon from '@material-ui/icons/Publish';
import { useWeb3React } from '@web3-react/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Web3 from 'web3';

import { Button, Dialog, ActionDialog, DisclaimerDialog } from '../../components';
import { useStyles } from '../../theme/styles/pages/drop/dropMainContentStyles';
import { useDropInputs, useLoading } from '../../hooks';
import { getBalance } from '../../contracts/functions/erc20Functions';
import { addDropData } from '../../contracts/functions/dropFactoryFunctions';
import { truncFileName, trunc } from '../../utils/formattingFunctions';
import { validateCSV } from '../../utils/validatingFunctions';
import TempCSV from '../../assets/temp.csv';

const fileNameRegex = /^[A-Z]{1,15}.csv$/i;

const DropCSV = ({ setContent }) => {
  const classes = useStyles();
  const {
    token,
    startDate,
    endDate,
    type,
    csv,
    clearFieldsF,
    uploadCSVF,
    clearCSVF,
  } = useDropInputs();
  const { account } = useWeb3React();
  const {
    loading: { dapp },
  } = useLoading();

  const [formData, setFormData] = useState({
    file: null,
    error: '',
    open: false,
    openDis: false,
    loadingContent: '',
    totalAmount: 0,
    totalAddress: 0,
    balance: 0,
    check: false,
  });

  const {
    file,
    error,
    open,
    openDis,
    totalAmount,
    totalAddress,
    balance,
    check,
    loadingContent,
  } = formData;

  const uploadingCSV = _file => {
    if (_file) {
      if (fileNameRegex.test(_file.name)) {
        setFormData({
          ...formData,
          loadingContent: 'Validating CSV',
          totalAmount: 0,
          totalAddress: 0,
        });
        const fileReader = new FileReader();
        fileReader.onloadend = async e => {
          const content = e.target.result;
          const { validCSV, _totalAmount, _totalAddress } = validateCSV(content.split('\n'));
          if (validCSV) {
            const balance = await getBalance(token, account);
            setFormData({
              ...formData,
              file: _file,
              error: '',
              loadingContent: '',
              totalAmount: _totalAmount,
              totalAddress: _totalAddress,
              balance: Number(balance),
            });
          } else {
            setFormData({
              ...formData,
              file: _file,
              error: 'Invalid CSV',
            });
          }
        };
        fileReader.readAsText(_file);
      } else {
        setFormData({
          ...formData,
          file: _file,
          error: 'Invalid filename',
        });
      }
    }
  };

  const handleUploadChange = e => {
    const _file = e?.target?.files[0];
    uploadingCSV(_file);
  };

  const handleClose = () => {
    setFormData({ ...formData, open: false });
  };

  const uploadCSVOnServer = () => {
    setFormData({ ...formData, loadingContent: 'Uploading CSV', openDis: false });
    const data = { file, account, token, startDate, endDate, type };
    uploadCSVF(data);
  };

  const handleConfirmClick = () => {
    const walletAddress = localStorage.getItem('userDrop');
    if (!(walletAddress && walletAddress === account)) {
      setFormData({ ...formData, openDis: true, open: false });
      return;
    }
    uploadCSVOnServer();
  };

  const handleDisclaimerClose = () => {
    if (check) {
      localStorage.setItem('userDrop', account);
    }
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

  const createDrop = async merkleRoot => {
    const dropData = {
      tokenAmount: Web3.utils.toWei(totalAmount.toString()),
      startDate: startDate
        ? Math.round(new Date(startDate).getTime() / 1000)
        : Math.round(Date.now() / 10000),
      endDate: endDate ? Math.round(new Date(endDate).getTime() / 1000) : 4294967295,
      merkleRoot,
      tokenAddress: token,
      walletAddress: account,
    };

    await addDropData(
      dropData,
      () => {
        setFormData({ ...formData, loadingContent: '', open: false });
        clearCSVF();
      },
      () => {
        clearFieldsF();
        setContent('token');
      }
    );
  };

  useEffect(() => {
    const merkleRoot = csv?.merkle_root;
    if (merkleRoot) {
      createDrop(merkleRoot);
    }
  }, [csv]);

  return (
    <Box className={classes.mainContainer}>
      <Dialog
        open={open}
        handleClose={handleClose}
        text={`Please confirm you are submitting ${totalAddress} addresses for a total of ${trunc(
          totalAmount
        )} tokens.`}
        secondaryText='If there are errors, please upload a new file. No changes can be made after you press CONFIRM.'
        btnText='Confirm'
        btnOnClick={handleConfirmClick}
        errorMsg={
          balance < totalAmount ? 'Your current wallet have insufficient amount of tokens' : ''
        }
      />

      <DisclaimerDialog
        open={openDis}
        heading='Disclaimer'
        handleClose={() => setFormData({ ...formData, openDis: false })}
        btnOnClick={handleDisclaimerClose}
        check={check}
        handleChange={() => setFormData({ ...formData, check: !check })}
        disableBackdrop
      />

      <ActionDialog
        variant='loading'
        open={loadingContent === 'Uploading CSV'}
        text='Uploading CSV'
      />

      <Typography variant='body2' className={classes.para}>
        Who would you like to drop these tokens to ?
      </Typography>

      <label className={classes.fileUploader} onDrop={handleDrop} onDragOver={handleAllowDrop}>
        <input type='file' accept='.csv' onChange={handleUploadChange} />
        <Box>
          <Typography variant='body2'>
            {file ? truncFileName(file.name, 20) : 'Choose or drag file'}
          </Typography>
          {error === 'Invalid filename' && (
            <Tooltip title='Example: "filename.csv" upto 15 characters are allowed'>
              <HelpOutlineIcon className={classes.help} style={{ top: '32%', right: 10 }} />
            </Tooltip>
          )}
        </Box>
      </label>

      {loadingContent === 'Validating CSV' && (
        <Box className={classes.loading} style={{ top: '58%' }}>
          <CircularProgress size={12} color='inherit' />
          <Typography variant='body2'>Validating CSV</Typography>
        </Box>
      )}

      <Typography variant='body2' className={classes.error} style={{ top: '58%' }}>
        {error}
      </Typography>

      <Box className={classes.btnContainer}>
        <Button onClick={() => setContent('dates')}>
          <ArrowBackIcon />
          <span>Back</span>
        </Button>
        <Button
          disabled={file && error === '' ? false : true}
          onClick={() => setFormData({ ...formData, open: true })}
          loading={dapp === 'upload'}
        >
          <span>Upload</span>
          {dapp !== 'upload' && <PublishIcon />}
        </Button>
      </Box>
      <Typography component='a' href={TempCSV} download='smaple.csv' variant='body2'>
        Download sample CSV
      </Typography>
    </Box>
  );
};

export default DropCSV;
