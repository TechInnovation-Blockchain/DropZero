import { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PublishIcon from '@material-ui/icons/Publish';
import CSVReader from 'react-csv-reader';

import { Button, Dialog } from '../../components';
import { useStyles } from '../../theme/styles/pages/drop/dropMainContentStyles';
import { useDropInputs } from '../../hooks';
import TempCSV from '../../assets/temp.csv';

const DropCSV = ({ setContent }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    file: null,
    error: '',
    open: false,
  });
  const { clearFieldsF } = useDropInputs();
  const { file, error, open } = formData;

  // const uploadCSV = e => {
  //   if (e.target.files[0]) {
  //     setFormData({...formData, file:e.target.files[0]});
  //     console.log(e.target.files[0]);
  //   }
  // };

  const handleForce = (data, file) => {
    if (data && data[0].hasOwnProperty('account') && data[0].hasOwnProperty('amount')) {
      setFormData({
        ...formData,
        file,
        error: '',
      });
    } else {
      setFormData({
        ...formData,
        file,
        error: 'Invalid CSV',
      });
    }
  };

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, '_'),
  };

  const handleClose = () => {
    setFormData({ ...formData, open: false });
  };

  const handleUpload = () => {
    setFormData({ ...formData, open: true });
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
        text='You are about to deposite 100.00 tokens that will be claimable by 153 different
        addresses'
        btnText='Drop'
        btnOnClick={handleClick}
      />
      <Typography variant='body2' className={classes.para}>
        Who would you like to drop these tokens to ?
      </Typography>
      <label className={classes.fileUploader}>
        <CSVReader
          cssClass='csv-reader-input'
          onFileLoaded={handleForce}
          parserOptions={papaparseOptions}
          inputId='ObiWan'
          inputName='ObiWan'
        />
        <Box>
          <Typography variant='body2'>{file ? file.name : 'Select File'}</Typography>
        </Box>
      </label>
      <Typography variant='body2' className={classes.error} style={{ top: '57%' }}>
        {error}
      </Typography>
      {/* <label className={classes.fileUploader}>
        <input type='file' accept='.csv' onChange={uploadCSV} />
        <Box>
          <Typography variant='body2'>{fileName ? fileName : 'Select File'}</Typography>
        </Box>
      </label> */}
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
