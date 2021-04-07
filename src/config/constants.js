export const CONTRACT_ADDRESSES = {
  dropFactory: '0x0dF68B34E567A6E867F296E73C82b9546Da437f1',
};

// export const CONTRACT_ADDRESSES = {
//   dropFactory: '0x20398aD62bb2D930646d45a6D4292baa0b860C1f',
// };

export const BASE_URL = 'https://dropzero.herokuapp.com';

export const config = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

export const formDataConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

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
