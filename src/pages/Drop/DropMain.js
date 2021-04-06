import { useState } from 'react';
import { Box } from '@material-ui/core';

import { PageAnimation } from '../../components';
import DropToken from './DropToken';
import DropDates from './DropDates';
import DropCSV from './DropCSV';
import { useDropInputs } from '../../hooks';

const DropMain = () => {
  const [content, setContent] = useState('token');
  const { clearFieldsF, clearCSVF } = useDropInputs();

  window.ethereum?.on('accountsChanged', () => {
    setContent('token');
    clearFieldsF();
    clearCSVF();
  });

  return (
    <PageAnimation in={true} reverse={0}>
      <Box style={{ textAlign: 'center' }}>
        {content === 'token' ? (
          <DropToken setContent={setContent} />
        ) : content === 'dates' ? (
          <DropDates setContent={setContent} />
        ) : content === 'uploadCSV' ? (
          <DropCSV setContent={setContent} />
        ) : null}
      </Box>
    </PageAnimation>
  );
};

export default DropMain;
