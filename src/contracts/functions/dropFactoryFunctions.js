import { dropFactoryContract } from '../getContract';
import { logError, logMessage } from '../../utils/log';
import {
  transactionPending,
  transactionSuccess,
  transactionFailed,
  transactionRejected,
} from '../../redux';

const contract = dropFactoryContract();

export const isDropCreated = async tokenAddress => {
  try {
    const res = await contract.methods.isDropCreated(tokenAddress).call();
    logMessage('isDropCreated', res);
    return res;
  } catch (e) {
    logError('isDropCreated', e);
  }
};

export const createDrop = async (tokenAddress, walletAddress, callback) => {
  try {
    await contract.methods
      .createDrop(tokenAddress)
      .send({ from: walletAddress })
      .on('transactionHash', txnHash => {
        transactionPending({ transactionHash: txnHash }, { text: 'Creating Drop' });
      })
      .then(receipt => {
        transactionSuccess({ transactionHash: receipt.transactionHash }, { text: 'Drop Created' });
        callback();
      })
      .catch(e => {
        if (e.code === 4001) {
          transactionRejected({}, { text: 'Drop Rejected' });
        } else {
          transactionFailed({}, { text: 'Drop Failed' });
        }
        logError('createDrop', e);
      });
  } catch (e) {
    logError('createDrop', e);
  }
};

export const addDropData = async ({
  tokenAmount,
  startDate,
  endDate,
  merkleRoot,
  tokenAddress,
  walletAddress,
}) => {
  console.log(merkleRoot);
  try {
    const res = await contract.methods
      .addDropData(tokenAmount, startDate, endDate, merkleRoot, tokenAddress)
      .send({ from: walletAddress });
  } catch (e) {
    logError('addDropData', e);
  }
};
