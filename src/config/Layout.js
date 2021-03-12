import { Box, Container } from '@material-ui/core';

import Routes from './Routes';
import { useStyles } from '../theme/styles/layout';
import { ConnectWallet } from '../components';

const Layout = () => {
  const classes = useStyles();

  return (
    <Box className={classes.mainContainer}>
      <Container className={classes.container} maxWidth='xs'>
        <Routes />
      </Container>
      <ConnectWallet />
    </Box>
  );
};

export default Layout;
