import { useState, useEffect } from 'react';
import { Box, Container } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';

import Routes from './Routes';
import { useStyles } from '../theme/styles/layout';
import { ConnectWallet, Snackbar, ActionDialog, DisclaimerDialog } from '../components';
import { useTheme, useModal, useJWT } from '../hooks';

const Layout = () => {
  const classes = useStyles();
  const { theme } = useTheme();
  const { modalProps } = useModal();
  const { unauthorized, getJWTF, authorizeF } = useJWT();
  const { account, deactivate } = useWeb3React();

  const [open, setOpen] = useState(localStorage.getItem('initail') ? false : true);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem('initail', true);
  };

  useEffect(() => {
    if (account) {
      getJWTF(account, Date.now());
    }
  }, [account]);

  useEffect(() => {
    if (unauthorized) {
      deactivate();
      authorizeF();
    }
  }, [unauthorized]);

  return !open ? (
    <Box className={`${classes.mainContainer} ${theme === 'light' ? classes.lightMainBox : ''}`}>
      <Container className={classes.container} maxWidth='xs'>
        <Routes />
      </Container>
      <ConnectWallet />
      <Snackbar />
      <ActionDialog {...modalProps} />
    </Box>
  ) : (
    <DisclaimerDialog
      heading='Disclaimer'
      type='main'
      open={open}
      handleClose={handleClose}
      btnOnClick={handleClose}
    />
  );
};

export default Layout;
