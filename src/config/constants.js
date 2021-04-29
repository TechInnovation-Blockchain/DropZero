export const CONTRACT_ADDRESSES = {
  dropFactory: '0x082046319ad7ddB5993F796FaFE6c0439c8fd5Fe',
};

//export const BASE_URL = 'https://drop-zero-test-server.herokuapp.com';

export const BASE_URL = 'http://3.131.104.65:3000';

//export const BASE_URL = 'http://192.168.1.79:8000';

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

export const INDEX_FEE = 0.5 / 100;
