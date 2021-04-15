import { useState, useEffect } from 'react';
import { Box, Typography, Tooltip, CircularProgress } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PublishIcon from '@material-ui/icons/Publish';
import { useWeb3React } from '@web3-react/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { utils } from 'ethers';
import { BigNumber } from 'bignumber.js';

import { Button, Dialog, ActionDialog, DisclaimerDialog } from '../../components';
import { useStyles } from '../../theme/styles/pages/drop/dropMainContentStyles';
import { useDropInputs, useLoading, useDropDashboard } from '../../hooks';
import { getBalance, getDecimal } from '../../contracts/functions/erc20Functions';
import { addDropData } from '../../contracts/functions/dropFactoryFunctions';
import { truncFileName, trunc } from '../../utils/formattingFunctions';
import { logMessage } from '../../utils/log';
import { validateCSV } from '../../utils/validatingFunctions';
import TempCSV from '../../assets/temp.csv';

const fileNameRegex = /^[a-zA-Z0-9]{1,15}.csv$/i;

const DropCSV = () => {
  const classes = useStyles();
  const {
    token,
    startDate,
    endDate,
    dropName,
    csv,

    // file,
    // csvError,
    // totalAmount,
    // totalAddress,
    // balance,

    clearFieldsF,
    uploadCSVF,
    clearCSVF,
    changeTabF,
    saveFieldsF,
  } = useDropInputs();
  const { account } = useWeb3React();
  const { getUserDropsF } = useDropDashboard();
  const {
    loading: { dapp },
  } = useLoading();

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

  //console.log(BigNumber(0.1) + BigNumber(0.2));

  const uploadingCSV = _file => {
    if (_file) {
      if (fileNameRegex.test(_file.name)) {
        //saveFieldsF({ csvError: '', totalAmount: 0, totalAddress: 0 });
        setFormData({
          ...formData,
          csvError: '',
          loadingContent: 'Validating CSV',
          totalAmount: 0,
          totalAddress: 0,
        });
        const fileReader = new FileReader();
        fileReader.onloadend = async e => {
          const content = e.target.result;
          logMessage('CSV Content', content);
          const { validCSV, _totalAmount, _totalAddress } = validateCSV(content.split('\n'));
          if (validCSV) {
            const balance = await getBalance(token, account);
            const decimal = await getDecimal(token);
            setFormData({
              ...formData,
              file: _file,
              csvError: '',
              loadingContent: '',
              totalAmount: _totalAmount,
              totalAddress: _totalAddress,
              balance: Number(utils.formatUnits(balance.toString(), decimal).toString()),
            });
            // saveFieldsF({
            //   file: _file,
            //   csvError: '',
            //   totalAmount: _totalAmount,
            //   totalAddress: _totalAddress,
            //   balance: Number(utils.formatUnits(balance.toString(), decimal).toString()),
            // });
          } else {
            setFormData({
              ...formData,
              file: _file,
              csvError: 'Invalid CSV',
              loadingContent: '',
            });
            // saveFieldsF({
            //   file: _file,
            //   csvError: 'Invalid CSV',
            // });
          }
        };
        fileReader.readAsText(_file);
      } else {
        setFormData({
          ...formData,
          file: _file,
          csvError: 'Invalid filename',
        });
        // saveFieldsF({
        //   file: _file,
        //   csvError: 'Invalid filename',
        // });
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
    const decimal = await getDecimal(token);
    const data = { file, account, token, startDate, endDate, dropName, decimal };
    uploadCSVF(data, () => {
      setFormData({ ...formData, loadingContent: '', open: false, openDis: false });
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
    const decimal = await getDecimal(token);
    const dropData = {
      tokenAmount: utils.parseUnits(totalAmount.toString(), decimal).toString(),
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
      () => {
        setFormData({ ...formData, loadingContent: '', open: false });
        clearCSVF();
      },
      () => {
        clearFieldsF();
        //changeTabF('token');
        getUserDropsF(account);
      }
    );
  };

  useEffect(() => {
    const merkleRoot = csv?.merkle_root;
    const dropperId = csv?.dropper_id;
    if (merkleRoot) {
      createDrop(merkleRoot, dropperId);
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
        open={loadingContent === 'Uploading CSV'}
        text='Uploading CSV'
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
        <Box className={classes.loading} style={{ top: '58%' }}>
          <CircularProgress size={12} color='inherit' />
          <Typography variant='body2'>Validating CSV</Typography>
        </Box>
      )}

      <Typography variant='body2' className={classes.error} style={{ top: '58%' }}>
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
