import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { FortmaticConnector } from '@web3-react/fortmatic-connector';
import { PortisConnector } from '@web3-react/portis-connector';

import coinbaseLogo from '../assets/wallets/coinbase.png';
import fortmaticLogo from '../assets/wallets/fortmatic.png';
import injectedLogo from '../assets/wallets/injected.png';
import metamaskLogo from '../assets/wallets/metamask.png';
import portisLogo from '../assets/wallets/portis.png';
import walletconnectLogo from '../assets/wallets/walletconnect.png';

const REACT_APP_NETWORK_URL1 = `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`;
// const REACT_APP_NETWORK_URL3 = `https://ropsten.infura.io/v3/${process.env.REACT_APP_INFURA_KEY1}`;
const REACT_APP_NETWORK_URL4 = `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`;
// const REACT_APP_NETWORK_URL5 = `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_KEY1}`;
// const REACT_APP_NETWORK_URL42 = `https://kovan.infura.io/v3/${process.env.REACT_APP_INFURA_KEY1}`;

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  1: REACT_APP_NETWORK_URL1,
  4: REACT_APP_NETWORK_URL4,
};

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[1],
  appName: 'XIOClaim',
});

export const fortmatic = new FortmaticConnector({
  apiKey: process.env.REACT_APP_FORTMATIC_KEY,
  chainId: 1,
});

export const portis = new PortisConnector({
  dAppId: process.env.REACT_APP_PORTIS_ID,
  networks: [1],
});

export const walletList = [
  {
    name: 'METAMASK',
    connector: injected,
    connectorType: InjectedConnector,
    logo: metamaskLogo,
  },
  {
    name: 'WALLETCONNECT',
    connector: walletconnect,
    connectorType: WalletConnectConnector,
    logo: walletconnectLogo,
  },
  {
    name: 'COINBASE',
    connector: walletlink,
    connectorType: WalletLinkConnector,
    logo: coinbaseLogo,
  },
  {
    name: 'FORTMATIC',
    connector: fortmatic,
    connectorType: FortmaticConnector,
    logo: fortmaticLogo,
  },
  {
    name: 'PORTIS',
    connector: portis,
    connectorType: PortisConnector,
    logo: portisLogo,
  },
];

export const mobileWalletList = [
  {
    name: 'WALLETCONNECT',
    connector: walletconnect,
    connectorType: WalletConnectConnector,
    logo: walletconnectLogo,
  },

  {
    name: 'FORTMATIC',
    connector: fortmatic,
    connectorType: FortmaticConnector,
    logo: fortmaticLogo,
  },
  {
    name: 'PORTIS',
    connector: portis,
    connectorType: PortisConnector,
    logo: portisLogo,
  },
];
