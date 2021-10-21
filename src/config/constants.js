export const VALID_CHAIN =
  process.env.REACT_APP_ENVIRONMENT === "PRODUCTION" ? 1 : 4;

export const CONTRACT_ADDRESSES = {
  dropFactory:
    VALID_CHAIN === 1
      ? "0x17cCEDDdC945B35f8067736D5a52CC68cb5a8E0f"
      : "0x897902e29F111Ff3ae1f1aaAD81785F681c2c578",
};

// export const BASE_URL =
//   VALID_CHAIN === 1
//     ? "https://server.dropzero.io"
//     : "https://server-testnet.dropzero.io";

// export const BASE_URL = "http://127.0.0.1:3001";

export const RPC_URL =
  VALID_CHAIN === 1
    ? process.env.REACT_APP_RPC_URL_MAINNET
    : process.env.REACT_APP_RPC_URL_TESTNET;

export const BASE_URL =
  VALID_CHAIN === 1
    ? process.env.REACT_APP_SERVER_MAINNET
    : process.env.REACT_APP_SERVER_TESTNET;

export const NoLogo =
  "https://gateway.pinata.cloud/ipfs/QmNX2QerTxTm1RThD7Dc9X5uS9VFnQxmMotaMFhK5GYbBk";

export const DATE_FORMAT = "dd MMM yyyy";

export const ETHERSCAN_TX_BASE_URL =
  VALID_CHAIN === 1
    ? "https://etherscan.io/tx/"
    : "https://rinkeby.etherscan.io/tx/";

export const ETHERSCAN_ADDRESS_BASE_URL =
  VALID_CHAIN === 1
    ? "https://etherscan.io/address/"
    : "https://rinkeby.etherscan.io/address/";

export const INDEX_FEE = 0 / 100;
