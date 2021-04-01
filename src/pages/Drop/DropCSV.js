import { useState } from 'react';
import { Box, Typography, Tooltip } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PublishIcon from '@material-ui/icons/Publish';
import { useWeb3React } from '@web3-react/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import { Button, Dialog, LoadingDialog, DisclaimerDialog } from '../../components';
import { useStyles } from '../../theme/styles/pages/drop/dropMainContentStyles';
import { useDropInputs } from '../../hooks';
import { getBalance } from '../../contracts/functions/erc20Functions';
import { truncFileName } from '../../utils/formattingFunctions';
import { validateCSV } from '../../utils/validatingFunctions';
import TempCSV from '../../assets/temp.csv';

const fileNameRegex = /^[A-Z]{1,15}.csv$/i;

const DropCSV = ({ setContent }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    file: null,
    error: '',
    open: false,
    openDis: false,
    loading: false,
    loadingContent: '',
    totalAmount: 0,
    totalAddress: 0,
    balance: 0,
  });
  const { token, startDate, endDate, type, csv, clearFieldsF, uploadCSVF } = useDropInputs();
  const { account } = useWeb3React();
  const {
    file,
    error,
    open,
    openDis,
    loading,
    loadingContent,
    totalAmount,
    totalAddress,
    balance,
  } = formData;

  const uploadingCSV = _file => {
    if (_file) {
      if (fileNameRegex.test(_file.name)) {
        setFormData({
          ...formData,
          loading: true,
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
              loading: false,
              totalAmount: _totalAmount,
              totalAddress: _totalAddress,
              balance,
            });
          } else {
            setFormData({
              ...formData,
              file: _file,
              error: 'Invalid CSV',
              loading: false,
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

  const uploadCSVOnServer = async () => {
    setFormData({ ...formData, loading: true, loadingContent: 'Uploading CSV' });
    const data = { file, account, token, startDate, endDate, type };
    await uploadCSVF(data);
    setFormData({ ...formData, loading: false });
    clearFieldsF();
    setContent('token');
    handleClose();
  };

  const handleClick = async () => {
    const walletAddress = localStorage.getItem('userDrop');
    if (!(walletAddress && walletAddress === account)) {
      setFormData({ ...formData, openDis: true, open: false });
      return;
    }
    await uploadCSVOnServer();
  };

  const handleDisclaimerClose = async () => {
    setFormData({ ...formData, openDis: false });
    localStorage.setItem('userDrop', account);
    await uploadCSVOnServer();
  };

  const handleDrop = e => {
    e.preventDefault();
    const _file = e.dataTransfer.files[0];
    if (_file.type === 'text/csv') uploadingCSV(_file);
  };

  const handleAllowDrop = e => {
    e.preventDefault();
  };

  return (
    <Box className={classes.mainContainer}>
      <Dialog
        open={open}
        handleClose={handleClose}
        text={`Please confirm you are submitting ${totalAddress} addresses for a total of ${totalAmount} tokens.`}
        secondaryText='If there are errors, please upload a new file. No changes can be made after you press CONFIRM.'
        btnText='Confirm'
        btnOnClick={handleClick}
        errorMsg={
          balance > totalAmount ? 'Your current wallet have insufficient amount of tokens' : ''
        }
      />

      <DisclaimerDialog
        open={openDis}
        heading='Disclaimer'
        handleClose={() => setFormData({ ...formData, openDis: false })}
        btnOnClick={handleDisclaimerClose}
      />

      <LoadingDialog open={loading} text={loadingContent} />
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
        >
          <span>Upload</span>
          <PublishIcon />
        </Button>
      </Box>
      <Typography component='a' href={TempCSV} download variant='body2'>
        Download sample CSV
      </Typography>
    </Box>
  );
};

export default DropCSV;
