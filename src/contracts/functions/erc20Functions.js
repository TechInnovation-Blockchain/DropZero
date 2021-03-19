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
export const name = async tokenAddress => {
  const contract = erc20TokenContract(tokenAddress);
  try {
    const decimals = await contract.methods.name().call();
    return decimals;
  } catch (e) {
    logError('erc20TokenContract', e);
  }
};
