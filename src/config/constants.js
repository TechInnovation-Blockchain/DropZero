export const CONTRACT_ADDRESSES = {
  dropFactory: '0x7E2b852Ab899AF20fb99e5DF322CCCE5f6491F8a',
};

//export const BASE_URL = 'https://server.dropzero.io';

//export const BASE_URL = 'https://dropzero-dev.herokuapp.com';

export const BASE_URL = 'http://3.138.137.228:3000';

export const NoLogo =
  'https://gateway.pinata.cloud/ipfs/QmNX2QerTxTm1RThD7Dc9X5uS9VFnQxmMotaMFhK5GYbBk';

export const DATE_FORMAT = 'dd MMM yyyy';

export const ETHERSCAN_TX_BASE_URL =
  process.env.REACT_APP_ENVIRONMENT === 'PRODUCTION'
    ? 'https://etherscan.io/tx/'
    : 'https://rinkeby.etherscan.io/tx/';

export const ETHERSCAN_ADDRESS_BASE_URL =
  process.env.REACT_APP_ENVIRONMENT === 'PRODUCTION'
    ? 'https://etherscan.io/address/'
    : 'https://rinkeby.etherscan.io/address/';

export const VALID_CHAIN = process.env.REACT_APP_ENVIRONMENT === 'PRODUCTION' ? 1 : 4;

export const INDEX_FEE = 0 / 100;
