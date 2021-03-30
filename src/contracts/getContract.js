import web3 from 'web3';

import { abi as erc20Abi } from './abi/erc20Abi.json';
import { logError } from '../utils/log';

let Web3;
let Web3Infura;

try {
  Web3Infura = new web3.providers.HttpProvider(
    `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`
  );
  Web3 = new web3(window.web3?.currentProvider);
  console.log(Web3Infura);
} catch (e) {
  logError('Connect Web3', e);
}

export const erc20TokenContract = tokenAddress => {
  let contract;
  try {
    if (Web3) {
      contract = new Web3.eth.Contract(erc20Abi, tokenAddress);
    } else {
      contract = new Web3Infura.eth.Contract(erc20Abi, tokenAddress);
    }
    return contract;
  } catch (e) {
    logError('erc20TokenContract', e);
  }
};
