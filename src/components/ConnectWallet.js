import { Button } from '@material-ui/core';
import { useStyles } from '../theme/styles/components/connectWalletStyles';

const ConnectWallet = () => {
  const classes = useStyles();

  return (
    <Button className={classes.connectBtn} variant='contained' color='primary'>
      Connect Wallet
    </Button>
  );
};

export default ConnectWallet;
