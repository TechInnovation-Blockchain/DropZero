import { useState } from 'react';
import { Box, Typography, Grid } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PublishIcon from '@material-ui/icons/Publish';
import web3 from 'web3';
import { KeyboardDateTimePicker } from '@material-ui/pickers';

import { Button, Dialog, LoadingDialog } from '../../components';
import { useStyles } from '../../theme/styles/pages/drop/dropMainContentStyles';
import { useDropInputs } from '../../hooks';
import TempCSV from '../../assets/temp.csv';

const DropCSV = ({ setContent }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    file: null,
    error: '',
    open: false,
    loading: false,
    loadingContent: '',
    section: 'startDate',
  });
  const { startDate, endDate, csv, saveFieldsF, clearFieldsF, uploadCSVF } = useDropInputs();
  const { file, error, open, loading, section, loadingContent } = formData;

  // const [date, setDate] = useState(null);

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

  // const handleDateTimeChange = (date, key, nextSection) => {
  //   console.log(date);
  //   if (date != null) {
  //     saveFieldsF({ [key]: date });
  //     setFormData({ ...formData, section: nextSection });
  //   }
  // };

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

      {/* {section === 'startDate' ? (
        <KeyboardDateTimePicker
          className={classes.datePicker}
          placeholder='Start Date'
          value={startDate}
          format='MM/dd/yyyy hh:mm'
          onChange={date => handleDateTimeChange(date, 'startDate', 'endDate')}
          InputProps={{ disableUnderline: true }}
          disablePast
          autoComplete='off'
        />
      ) : section === 'endDate' ? (
        <KeyboardDateTimePicker
          className={classes.datePicker}
          placeholder='End Date'
          value={endDate}
          format='MM/dd/yyyy hh:mm'
          onChange={date => handleDateTimeChange(date, 'endDate', 'uploadCSV')}
          InputProps={{ disableUnderline: true }}
          disablePast
          autoComplete='off'
        />
      ) : (
        <label className={classes.fileUploader}>
          <input type='file' accept='.csv' onChange={_uploadCSV} />
          <Box>
            <Typography variant='body2'>{file ? file.name : 'Select File'}</Typography>
          </Box>
        </label>
      )} */}

      <label className={classes.fileUploader}>
        <input type='file' accept='.csv' onChange={_uploadCSV} />
        <Box>
          <Typography variant='body2'>{file ? file.name : 'Select File'}</Typography>
        </Box>
      </label>
      <Box className={classes.btnContainer}>
        <Button onClick={() => setContent('dates')}>
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
