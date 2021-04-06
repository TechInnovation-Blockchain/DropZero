import { MaxUint256 } from '@ethersproject/constants';

import { erc20TokenContract } from '../getContract';
import { logError } from '../../utils/log';
import { CONTRACT_ADDRESSES } from '../../config/constants';
import {
  transactionPending,
  transactionSuccess,
  transactionFailed,
  transactionRejected,
} from '../../redux';

export const getDecimal = async tokenAddress => {
  try {
    const contract = erc20TokenContract(tokenAddress);
    const decimals = await contract.methods.decimals().call();
    return decimals;
  } catch (e) {
    logError('getDecimal', e);
  }
};

export const getName = async tokenAddress => {
  try {
    const contract = erc20TokenContract(tokenAddress);
    const name = await contract.methods.name().call();
    return name;
  } catch (e) {
    // logError('getName', e);
  }
};

export const getSymbol = async tokenAddress => {
  try {
    const contract = erc20TokenContract(tokenAddress);
    const symbol = await contract.methods.symbol().call();
    return symbol;
  } catch (e) {
    // logError('getSymbol', e);
  }
};

export const getBalance = async (tokenAddress, walletAddress) => {
  try {
    const contract = erc20TokenContract(tokenAddress);
    const balance = await contract.methods.balanceOf(walletAddress).call();
    return balance;
  } catch (e) {
    logError('getBalance', e);
  }
};

export const getAllowance = async (tokenAddress, walletAddress) => {
  try {
    const contract = erc20TokenContract(tokenAddress);
    const allowance = await contract.methods
      .allowance(walletAddress, CONTRACT_ADDRESSES.dropFactory)
      .call();
    return allowance;
  } catch (e) {
    logError('allowance', e);
  }
};

export const approve = async (tokenAddress, walletAddress, callback) => {
  try {
    transactionPending({}, { text: 'Approval Pending' }, 'drop');
    const contract = erc20TokenContract(tokenAddress);
    console.log(contract);

    await contract.methods
      .approve(CONTRACT_ADDRESSES.dropFactory, MaxUint256._hex)
      .send({ from: walletAddress })
      .on('transactionHash', txnHash => {
        transactionPending({ transactionHash: txnHash }, { text: 'Approval Pending' }, 'drop');
      })
      .then(receipt => {
        transactionSuccess(
          { transactionHash: receipt.transactionHash },
          { text: 'Approval Successful' },
          ''
        );
        callback();
      })
      .catch(e => {
        if (e.code === 4001) {
          transactionRejected({}, { text: 'Approval Rejected' }, '');
        } else {
          transactionFailed({}, { text: 'Approval Failed' }, '');
        }
        logError('approve', e);
      });
  } catch (e) {
    logError('approve', e);
  }
};
