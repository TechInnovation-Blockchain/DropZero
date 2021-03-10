import { useState } from 'react';
import { Box } from '@material-ui/core';

import DropToken from './DropToken';
import DropAmount from './DropAmount';
import DropCSV from './DropCSV';

const DropMain = () => {
  const [content, setContent] = useState('token');

  return (
    <Box style={{ textAlign: 'center' }}>
      {content === 'token' ? (
        <DropToken setContent={setContent} />
      ) : content === 'amount' ? (
        <DropAmount setContent={setContent} />
      ) : content === 'uploadCSV' ? (
        <DropCSV setContent={setContent} />
      ) : null}
    </Box>
  );
};

export default DropMain;
