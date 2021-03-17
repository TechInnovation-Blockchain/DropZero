import { Fragment, useState, useEffect, useCallback } from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError,
} from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { FortmaticConnector } from '@web3-react/fortmatic-connector';
import { isMobile } from 'react-device-detect';

import { useStyles } from '../theme/styles/components/connectWalletStyles';
import Button from './Button';
import WalletDialog from './WalletDialog';
import { walletList } from '../utils/web3Connectors';
import { useSnackbar, useLoading, useWeb3 } from '../hooks';

const ConnectWallet = () => {
  const classes = useStyles();
  const web3context = useWeb3React();
  const [open, setOpen] = useState(false);
  const { showSnackbarF } = useSnackbar();
  const { setLoadingF } = useLoading();
  const { storeWeb3ContextF } = useWeb3();

  const getErrorMessage = e => {
    if (e instanceof UnsupportedChainIdError) {
      return 'Unsupported Network';
    } else if (e instanceof NoEthereumProviderError) {
      return 'No Wallet Found';
    } else if (e instanceof UserRejectedRequestError) {
      return 'Wallet Connection Rejected';
    } else if (e.code === -32002) {
      return 'Wallet Connection Request Pending';
    } else {
      return 'An Error Occurred';
    }
  };

  const activateWallet = useCallback(
    (connector, onClose = () => {}) => {
      setLoadingF({
        walletConnection: true,
        connector: connector ? connector : InjectedConnector,
      });

      if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
        connector.walletConnectProvider = undefined;
      } else if (connector instanceof FortmaticConnector) {
        // setLoadingF({ walletConnection: false });
        onClose();
      }

      web3context
        .activate(
          connector
            ? connector
            : new InjectedConnector({
                supportedChainIds: [1, 3, 4, 5, 42],
              }),
          undefined,
          true
        )
        .then(() => {
          setLoadingF({ walletConnection: false });
        })
        .catch(e => {
          const err = getErrorMessage(e);
          showSnackbarF({ message: err, severity: 'error' });
          console.error('ERROR activateWallet -> ', e);
          setLoadingF({ walletConnection: false });
        });
    },
    [web3context]
  );

  const addressShorten = address => {
    if (address) {
      return `${address.slice(0, 6)}...${address.slice(address.length - 4, address.length)}`;
    }
  };

  useEffect(() => {
    if (!isMobile) {
      activateWallet();
    }
  }, []);

  useEffect(() => {
    storeWeb3ContextF(web3context);
    // if (web3context?.library?.provider) {
    //   dispatch(setWeb3Provider(web3context.library.provider));
    // }
    // if (web3context?.error) {
    //   web3context.deactivate();
    // }
    if (web3context.active || web3context.account) {
      setOpen(false);
    }
  }, [web3context]);

  return (
    <Fragment>
      <Button onClick={() => setOpen(true)} className={classes.connectBtn}>
        <span>{web3context.active ? addressShorten(web3context.account) : 'CONNECT WALLET'}</span>
      </Button>

      <WalletDialog
        className={classes.connectWalletButton}
        open={open}
        setOpen={setOpen}
        items={walletList}
        activate={activateWallet}
        address={addressShorten(web3context.account)}
      />
    </Fragment>
  );
};

export default ConnectWallet;
