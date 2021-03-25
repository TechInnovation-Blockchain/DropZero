import { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PublishIcon from '@material-ui/icons/Publish';
import web3 from 'web3';

import { Button, Dialog, LoadingDialog } from '../../components';
import { useStyles } from '../../theme/styles/pages/drop/dropMainContentStyles';
import { useDropInputs } from '../../hooks';
import TempCSV from '../../assets/temp.csv';
// import { uploadCSV } from '../../redux';

const DropCSV = ({ setContent }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    file: null,
    error: '',
    open: false,
    loading: false,
    loadingContent: '',
  });
  const { csv, clearFieldsF, uploadCSVF } = useDropInputs();
  const { file, error, open, loading, loadingContent } = formData;

  const _uploadCSV = async e => {
    const _file = e?.target?.files[0];
    if (_file) {
      setFormData({
        ...formData,
        loading: true,
        loadingContent: 'Validating CSV',
      });
      const fileReader = new FileReader();
      fileReader.onloadend = e => {
        const content = e.target.result;
        // const columns = content.split('\n')[0].split(',');
        const validated = validateCSV(content.split('\n'));
        if (validated) {
          setFormData({
            ...formData,
            file: _file,
            error: '',
            loading: false,
          });
        } else {
          setFormData({
            ...formData,
            file: _file,
            error: 'Invalid CSV',
            loading: false,
          });
        }
        // if (columns[0] === 'address' && columns[1] === 'amount') {
        //   setFormData({
        //     ...formData,
        //     file: _file,
        //     error: '',
        //   });
        // } else {
        //   setFormData({
        //     ...formData,
        //     file: _file,
        //     error: 'Invalid CSV',
        //   });
        // }
      };
      fileReader.readAsText(_file);
    }
  };

  const validateCSV = data => {
    let validCSV = true;
    const header = data[0].split(',');
    if (header.length === 2 && header[0] === 'address' && header[1] === 'amount') {
      for (let i = 1; i < data.length - 1; i++) {
        const rowData = data[i].split(',');
        if (!web3.utils.isAddress(rowData[0]) || isNaN(rowData[1])) {
          validCSV = false;
          break;
        }
      }
    } else {
      validCSV = false;
    }
    return validCSV;
  };

  const handleClose = () => {
    setFormData({ ...formData, open: false });
  };

  const handleUpload = async () => {
    setFormData({ ...formData, loading: true, loadingContent: 'Uploading CSV' });
    await uploadCSVF(file);
    setFormData({ ...formData, loading: false, open: true, loadingContent: 'Uploading CSV' });
  };

  const handleClick = () => {
    clearFieldsF();
    setContent('token');
    handleClose();
  };

  return (
    <Box className={classes.mainContainer}>
      <Dialog
        open={open}
        handleClose={handleClose}
        // text='You are about to deposite 100.00 tokens that will be claimable by 153 different
        // addresses'
        text={`Please confirm you are submitting ${csv?.result?.csv_length} addresses for a total of ${csv?.result?.amount} tokens.`}
        secondaryText='If there are errors, please upload a new file. No changes can be made after you press CONFIRM'
        btnText='Confirm'
        btnOnClick={handleClick}
      />

      <LoadingDialog open={loading} text={loadingContent} />
      <Typography variant='body2' className={classes.para}>
        Who would you like to drop these tokens to ?
      </Typography>
      <Typography variant='body2' className={classes.error} style={{ top: '57%' }}>
        {error}
      </Typography>
      <label className={classes.fileUploader}>
        <input type='file' accept='.csv' onChange={_uploadCSV} />
        <Box>
          <Typography variant='body2'>{file ? file.name : 'Select File'}</Typography>
        </Box>
      </label>
      <Box className={classes.btnContainer}>
        <Button onClick={() => setContent('token')}>
          <ArrowBackIcon />
          <span>Back</span>
        </Button>
        <Button disabled={file && error === '' ? false : true} onClick={handleUpload}>
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
