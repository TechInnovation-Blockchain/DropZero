import { Fragment, useState } from 'react';
import { useStyles } from '../theme/styles/components/connectWalletStyles';

import Button from './Button';
import WalletDialog from './WalletDialog';

const ConnectWallet = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Button onClick={() => setOpen(true)} className={classes.connectBtn}>
        <span>Connect Wallet</span>
      </Button>
      <WalletDialog
        className={classes.connectWalletButton}
        heading={'CONNECT TO A WALLET'}
        // activate={activateWallet}
        open={open}
        setOpen={setOpen}
      />
    </Fragment>
  );
};

export default ConnectWallet;
