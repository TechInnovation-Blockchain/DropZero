import { Box, Container } from '@material-ui/core';

import Routes from './Routes';
import { useStyles } from '../theme/styles/layout';
import { ConnectWallet, Snackbar, Footer } from '../components';
import { useTheme } from '../hooks';

const Layout = () => {
  const classes = useStyles();
  const { theme } = useTheme();

  return (
    <Box className={`${classes.mainContainer} ${theme === 'light' ? classes.lightMainBox : ''}`}>
      <Container className={classes.container} maxWidth='xs'>
        <Routes />
      </Container>
      <ConnectWallet />
      <Snackbar />
      <Footer />
    </Box>
  );
};

export default Layout;
