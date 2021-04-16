import { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';

import { PageAnimation } from '../../components';
import DropToken from './DropToken';
import DropDates from './DropDates';
import DropCSV from './DropCSV';
import { useDropInputs } from '../../hooks';

const DropMain = () => {
  const { currentTab, currentAccount, clearFieldsF } = useDropInputs();
  const { account } = useWeb3React();

  useEffect(() => {
    if (currentAccount !== account && account) {
      clearFieldsF(account);
    }
  }, [account]);

  return (
    <PageAnimation in={true} reverse={0}>
      <Box style={{ textAlign: 'center' }}>
        {currentTab === 'token' ? (
          <DropToken />
        ) : currentTab === 'dates' ? (
          <DropDates />
        ) : currentTab === 'uploadCSV' ? (
          <DropCSV />
        ) : null}
      </Box>
    </PageAnimation>
  );
};

export default DropMain;
