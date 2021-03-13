import { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PublishIcon from '@material-ui/icons/Publish';

import { Button, DroppedDialog } from '../../components';
import { useStyles } from '../../theme/styles/pages/drop/dropMainContentStyles';

const DropCSV = ({ setContent }) => {
  const classes = useStyles();
  const [fileName, setFileName] = useState('');
  const [open, setOpen] = useState(false);

  const uploadCSV = e => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <Box className={classes.mainContainer}>
      <Typography variant='body2' className={classes.para}>
        Who would you like to drop these tokens to ?
      </Typography>
      <label className={classes.fileUploader}>
        <input type='file' accept='.csv' onChange={uploadCSV} />
        <Box>
          <Typography variant='body2'>{fileName ? fileName : 'Select File'}</Typography>
        </Box>
      </label>
      <Box className={classes.btnContainer}>
        <Button onClick={() => setContent('amount')}>
          <ArrowBackIcon />
          <span>Back</span>
        </Button>
        <Button disabled={fileName ? false : true} onClick={() => setOpen(true)}>
          <span>Upload</span>
          <PublishIcon />
        </Button>
        <DroppedDialog open={open} setOpen={setOpen} />
      </Box>
      <Typography component='a' href='!#' variant='body2'>
        Download Sample CSV
      </Typography>
    </Box>
  );
};

export default DropCSV;
