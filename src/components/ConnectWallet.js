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
import { Typography, Box } from '@material-ui/core';
import { Facebook, Twitter, Telegram, YouTube } from '@material-ui/icons';

import { useStyles } from '../theme/styles/components/connectWalletStyles';
import Button from './Button';
import WalletDialog from './WalletDialog';
import { walletList } from '../utils/web3Connectors';
import { conciseAddress } from '../utils/formattingFunctions';
import { useSnackbar, useLoading, useDropInputs, useWeb3, useTheme, useJWT } from '../hooks';
import { setWeb3Provider } from '../contracts/getContract';
import { VALID_CHAIN } from '../config/constants';
import WhiteLogo from '../assets/logoWhite.png';
import DarkLogo from '../assets/logoDark.png';

const ConnectWallet = () => {
  const classes = useStyles();
  const web3context = useWeb3React();
  const { showSnackbarF } = useSnackbar();
  const { setLoadingF, loading } = useLoading();
  const { storeWeb3ContextF } = useWeb3();
  const { currentAccount, clearFieldsF } = useDropInputs();
  const { theme } = useTheme();
  const { getJWTF } = useJWT();

  const [open, setOpen] = useState(false);

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
          //getJWTF(web3context.account, Date.now());
        })
        .catch(e => {
          const err = getErrorMessage(e);
          showSnackbarF({ message: err, severity: 'error' });
          console.error('ERROR activateWallet -> ', e);
          setLoadingF({ walletConnection: false });
        });
    },
    [web3context, loading]
  );

  useEffect(() => {
    if (!isMobile) {
      activateWallet();
    }
  }, []);

  useEffect(() => {
    storeWeb3ContextF(web3context);
    if (web3context?.library?._provider) {
      //console.log(web3context.library._provider);
      setWeb3Provider(web3context.library._provider);
    }
    if (web3context?.error) {
      web3context.deactivate();
    }
    if (web3context.active || web3context.account) {
      setOpen(false);
      if (currentAccount === '') {
        clearFieldsF(web3context.account);
        //getJWTF(web3context.account, Date.now());
      }
    }
  }, [web3context]);

  window.ethereum?.on('networkChanged', function (networkId) {
    clearFieldsF();
    if (networkId) {
      let msg = 'Network changed to ';
      if (networkId === '1') {
        msg += 'mainnet';
      } else if (networkId === '3') {
        msg += 'ropsten';
      } else if (networkId === '4') {
        msg += 'rinkeby';
      } else if (networkId === '5') {
        msg += 'goerli';
      } else if (networkId === '42') {
        msg += 'kovan';
      }
      showSnackbarF({ message: msg, severity: 'info' });
    }
  });

  return (
    <Fragment>
      <Box className={classes.connectWrapper}>
        {web3context.active && (
          <Typography variant='body2' className={classes.bottomError}>
            {web3context.chainId !== VALID_CHAIN && 'Change network to rinkeby'}
          </Typography>
        )}
        <Box className={classes.btnWrapper}>
          <Button onClick={() => setOpen(true)} className={classes.connectBtn}>
            <span>
              {web3context.active && web3context.account
                ? conciseAddress(web3context.account)
                : 'CONNECT WALLET'}
            </span>
          </Button>
          <a href='https://blockzerolabs.io/' target='_blank' rel='noreferrer'>
            <Box className={classes.bottomPara}>
              <Typography variant='body2'>Created By </Typography>
              <img src={theme === 'dark' ? WhiteLogo : DarkLogo} alt='logo' width='35px' />
              <Typography variant='body2'>blockzero</Typography>
            </Box>
          </a>
        </Box>
        <Box className={classes.social}>
          <a href='https://www.facebook.com/groups/xionetwork' target='_blank' rel='noreferrer'>
            <Facebook />
          </a>
          <a href='https://twitter.com/blockzerolabs' target='_blank' rel='noreferrer'>
            <Twitter />
          </a>
          <a href='https://t.me/blockzerolabs' target='_blank' rel='noreferrer'>
            <Telegram />
          </a>
          <a
            href='https://www.youtube.com/channel/UCiOjFfIi1-jjQbRjJkJas2Q'
            target='_blank'
            rel='noreferrer'
          >
            <YouTube />
          </a>
        </Box>
      </Box>

      <WalletDialog
        className={classes.connectWalletButton}
        open={open}
        setOpen={setOpen}
        items={walletList}
        activate={activateWallet}
        address={conciseAddress(web3context.account)}
      />
    </Fragment>
  );
};

export default ConnectWallet;
