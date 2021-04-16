// export const CONTRACT_ADDRESSES = {
//   dropFactory: '0xf913b2A5FeC65C237eEE959A34A0e5Ee81955fCC',
// };

export const CONTRACT_ADDRESSES = {
  dropFactory: '0x082046319ad7ddB5993F796FaFE6c0439c8fd5Fe',
};

//export const BASE_URL = 'https://dropzero.herokuapp.com';

export const BASE_URL = 'http://192.168.1.79:8000';

//const jwt = localStorage.getItem('jwt');

export const config = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    //Authorization: `Bearer ${jwt}`,
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

export const VALID_CHAIN = process.env.REACT_APP_ENVIRONMENT === 'PRODUCTION' ? 1 : 4;
