import { useState } from 'react';
import { Box } from '@material-ui/core';

import { PageAnimation } from '../../components';
import DropToken from './DropToken';
import DropDates from './DropDates';
import DropCSV from './DropCSV';

const DropMain = () => {
  const [content, setContent] = useState('token');

  return (
    <PageAnimation in={true} reverse={1}>
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
