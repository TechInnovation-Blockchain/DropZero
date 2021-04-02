import { erc20TokenContract } from '../getContract';
import { logError } from '../../utils/log';

// let contract;

// const initializeContract = async (tokenAddress) => {
//   contract = await erc20TokenContract();
//   if (!contract) {
//     throw new Error('Erc20 not initialized.');
//   }
// };

export const decimal = async tokenAddress => {
  const contract = erc20TokenContract(tokenAddress);
  try {
    const decimals = await contract.methods.decimals().call();
    return decimals;
  } catch (e) {
    logError('erc20TokenContract', e);
  }
};

export const getName = async tokenAddress => {
  const contract = erc20TokenContract(tokenAddress);
  try {
    const name = await contract.methods.name().call();
    return name;
  } catch (e) {
    // logError('erc20TokenContract', e);
  }
};

export const getSymbol = async tokenAddress => {
  const contract = erc20TokenContract(tokenAddress);
  try {
    const symbol = await contract.methods.symbol().call();
    return symbol;
  } catch (e) {
    // logError('erc20TokenContract', e);
  }
};

export const getBalance = async (tokenAddress, walletAddress) => {
  const contract = erc20TokenContract(tokenAddress);
  try {
    const balance = await contract.methods.balanceOf(walletAddress).call();
    return balance;
  } catch (e) {
    logError('erc20TokenContract', e);
  }
};
