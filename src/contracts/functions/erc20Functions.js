import { erc20TokenContract } from '../getContract';
import { logError } from '../../utils/log';
import { CONTRACT_ADDRESSES } from '../../config/constants';

export const getDecimal = async tokenAddress => {
  const contract = erc20TokenContract(tokenAddress);
  try {
    const decimals = await contract.methods.decimals().call();
    return decimals;
  } catch (e) {
    logError('getDecimal', e);
  }
};

export const getName = async tokenAddress => {
  const contract = erc20TokenContract(tokenAddress);
  try {
    const name = await contract.methods.name().call();
    return name;
  } catch (e) {
    // logError('getName', e);
  }
};

export const getSymbol = async tokenAddress => {
  const contract = erc20TokenContract(tokenAddress);
  try {
    const symbol = await contract.methods.symbol().call();
    return symbol;
  } catch (e) {
    // logError('getSymbol', e);
  }
};

export const getBalance = async (tokenAddress, walletAddress) => {
  const contract = erc20TokenContract(tokenAddress);
  try {
    const balance = await contract.methods.balanceOf(walletAddress).call();
    return balance;
  } catch (e) {
    logError('getBalance', e);
  }
};

export const getAllowance = async (tokenAddress, walletAddress) => {
  const contract = erc20TokenContract(tokenAddress);
  try {
    const allowance = await contract.methods
      .allowance(walletAddress, CONTRACT_ADDRESSES.dropFactory)
      .call();
    console.log(allowance);
    return allowance;
  } catch (e) {
    logError('allowance', e);
  }
};
