import { dropFactoryContract } from '../getContract';
import { logError, logMessage } from '../../utils/log';
import {
  transactionPending,
  transactionSuccess,
  transactionFailed,
  transactionRejected,
} from '../../redux';

const contract = dropFactoryContract();

//check drop exists or not
export const isDropCreated = async tokenAddress => {
  try {
    const res = await contract.methods.drops(tokenAddress).call();
    logMessage('isDropCreated', res);
    return res !== '0x0000000000000000000000000000000000000000';
  } catch (e) {
    logError('isDropCreated', e);
  }
};

//create drop
export const createDrop = async (tokenAddress, walletAddress, callback) => {
  try {
    transactionPending({}, { text: 'Creating Drop' }, 'drop');
    await contract.methods
      .createDrop(tokenAddress)
      .send({ from: walletAddress })
      .on('transactionHash', txnHash => {
        transactionPending({ transactionHash: txnHash }, { text: 'Creating Drop' }, 'drop');
      })
      // .on('confirmation', receipt => {
      //   console.log('CANCELLED', receipt);
      //   transactionSuccess(
      //     { transactionHash: receipt.transactionHash },
      //     { text: 'Drop CANCELLED' },
      //     ''
      //   );
      // })
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
    transactionFailed({}, { text: 'Drop Failed' });
  }
};

//add csv data in drop
export const addDropData = async (
  { tokenAmount, startDate, endDate, merkleRoot, tokenAddress, walletAddress },
  onload,
  callback
) => {
  try {
    transactionPending({}, { text: 'Drop Pending' }, 'upload');
    onload();
    await contract.methods
      .addDropData(tokenAmount, startDate, endDate, merkleRoot, tokenAddress)
      .send({ from: walletAddress })
      .on('transactionHash', txnHash => {
        transactionPending({ transactionHash: txnHash }, { text: 'Drop Pending' }, 'upload');
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
    logError('addDropData', e);
    transactionFailed({}, { text: 'Drop Failed' });
  }
};

export const pauseDrop = async (tokenAddress, walletAddress, merkleRoot, callback) => {
  try {
    transactionPending({}, { text: 'Pausing Drop' });
    await contract.methods
      .pause(tokenAddress, merkleRoot)
      .send({ from: walletAddress })
      .on('transactionHash', txnHash => {
        transactionPending({ transactionHash: txnHash }, { text: 'Pausing Drop' }, 'pause');
      })
      .then(receipt => {
        transactionSuccess({ transactionHash: receipt.transactionHash }, { text: 'Drop Paused' });
        callback();
      })
      .catch(e => {
        if (e.code === 4001) {
          transactionRejected({}, { text: 'Pausing Rejected' });
        } else {
          transactionFailed({}, { text: 'Pausing Failed' });
        }
        logError('pauseDrop', e);
      });
  } catch (e) {
    logError('pauseDrop', e);
    transactionFailed({}, { text: 'Pausing Failed' });
  }
};

export const unpauseDrop = async (tokenAddress, walletAddress, merkleRoot, callback) => {
  try {
    transactionPending({}, { text: 'Unpausing Drop' });
    await contract.methods
      .unpause(tokenAddress, merkleRoot)
      .send({ from: walletAddress })
      .on('transactionHash', txnHash => {
        transactionPending({ transactionHash: txnHash }, { text: 'Unpausing Drop' });
      })
      .then(receipt => {
        transactionSuccess({ transactionHash: receipt.transactionHash }, { text: 'Drop Unpaused' });
        callback();
      })
      .catch(e => {
        if (e.code === 4001) {
          transactionRejected({}, { text: 'Unpausing Rejected' });
        } else {
          transactionFailed({}, { text: 'Unpausing Failed' });
        }
        logError('unpauseDrop', e);
      });
  } catch (e) {
    logError('unpauseDrop', e);
    transactionFailed({}, { text: 'Unpausing Failed' });
  }
};

export const withdraw = async (tokenAddress, walletAddress, merkleRoot, callback) => {
  try {
    transactionPending({}, { text: 'Withdraw Pending' }, 'withdraw');
    await contract.methods
      .withdraw(tokenAddress, merkleRoot)
      .send({ from: walletAddress })
      .on('transactionHash', txnHash => {
        transactionPending({ transactionHash: txnHash }, { text: 'Withdraw Pending' }, 'withdraw');
      })
      .then(receipt => {
        transactionSuccess(
          { transactionHash: receipt.transactionHash },
          { text: 'Withdraw Successful' }
        );
        callback();
      })
      .catch(e => {
        if (e.code === 4001) {
          transactionRejected({}, { text: 'Withdraw Rejected' });
        } else {
          transactionFailed({}, { text: 'Withdraw Failed' });
        }
        logError('withdraw', e);
      });
  } catch (e) {
    logError('withdraw', e);
    transactionFailed({}, { text: 'Withdraw Failed' });
  }
};

export const multipleClaims = async (
  { tokenAddress, walletAddress, indexs, amounts, merkleRoots, merkleProofs },
  callback
) => {
  try {
    transactionPending({}, { text: 'Claim Pending' }, 'claim');
    await contract.methods
      .multipleClaimsFromDrop(tokenAddress, indexs, amounts, merkleRoots, merkleProofs)
      .send({ from: walletAddress })
      .on('transactionHash', txnHash => {
        transactionPending({ transactionHash: txnHash }, { text: 'Claim Pending' }, 'claim');
      })
      .then(receipt => {
        transactionSuccess(
          { transactionHash: receipt.transactionHash },
          { text: 'Claim Successful' }
        );
        callback();
      })
      .catch(e => {
        if (e.code === 4001) {
          transactionRejected({}, { text: 'Claim Rejected' });
        } else {
          transactionFailed({}, { text: 'Claim Failed' });
        }
        logError('multiple claim', e);
      });
  } catch (e) {
    logError('multiple claim', e);
    transactionFailed({}, { text: 'Claim Failed' });
  }
};

export const singleClaim = async (
  { tokenAddress, walletAddress, indexs, amounts, merkleRoots, merkleProofs },
  callback
) => {
  try {
    console.log('single claim');
    transactionPending({}, { text: 'Claim Pending' }, 'claim');
    await contract.methods
      .claimFromDrop(tokenAddress, indexs[0], amounts[0], merkleRoots[0], merkleProofs[0])
      .send({ from: walletAddress })
      .on('transactionHash', txnHash => {
        transactionPending({ transactionHash: txnHash }, { text: 'Claim Pending' }, 'claim');
      })
      .then(receipt => {
        transactionSuccess(
          { transactionHash: receipt.transactionHash },
          { text: 'Claim Successful' }
        );
        callback();
      })
      .catch(e => {
        if (e.code === 4001) {
          transactionRejected({}, { text: 'Claim Rejected' });
        } else {
          transactionFailed({}, { text: 'Claim Failed' });
        }
        logError('single claim', e);
      });
  } catch (e) {
    logError('single claim', e);
    transactionFailed({}, { text: 'Claim Failed' });
  }
};
