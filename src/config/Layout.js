import { Box, Container } from '@material-ui/core';

import Routes from './Routes';
import { useStyles } from '../theme/styles/layout';
import { ConnectWallet, Snackbar, Footer, ActionDialog } from '../components';
import { useTheme, useModal } from '../hooks';

const Layout = () => {
  const classes = useStyles();
  const { theme } = useTheme();
  const { modalProps } = useModal();

  return (
    <Box className={`${classes.mainContainer} ${theme === 'light' ? classes.lightMainBox : ''}`}>
      <Container className={classes.container} maxWidth='xs'>
        <Routes />
      </Container>
      <ConnectWallet />
      <Snackbar />
      <ActionDialog {...modalProps} />
      <Footer />
    </Box>
  );
};

export default Layout;
