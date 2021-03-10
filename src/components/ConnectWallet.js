import { useStyles } from '../theme/styles/components/connectWalletStyles';

import Button from './Button';

const ConnectWallet = () => {
  const classes = useStyles();

  return (
    <Button className={classes.connectBtn}>
      <span>Connect Wallet</span>
    </Button>
  );
};

export default ConnectWallet;
