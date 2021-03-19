import web3 from 'web3';

import { abi as erc20Abi } from './abi/erc20Abi.json';
import { logError } from '../utils/log';

let Web3;

try {
  Web3 = new web3(window.web3.currentProvider);
} catch (e) {
  logError('Connect Web3', e);
}

export const erc20TokenContract = tokenAddress => {
  try {
    const contract = new Web3.eth.Contract(erc20Abi, tokenAddress);
    return contract;
  } catch (e) {
    logError('erc20TokenContract', e);
  }
};
