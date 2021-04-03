import { dropFactoryContract } from '../getContract';
import { logError, logMessage } from '../../utils/log';

export const createDrop = async (tokenAddress, walletAddress) => {
  try {
    const contract = dropFactoryContract();
    await contract.methods.createDrop(tokenAddress).send({ from: walletAddress });
  } catch (e) {
    logError('createDrop', e);
  }
};
