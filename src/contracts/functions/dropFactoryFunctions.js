import { dropFactoryContract } from "../getContract";
import { logError, logMessage } from "../../utils/log";
import {
  transactionPending,
  transactionSuccess,
  transactionFailed,
  transactionRejected,
  // withdrawClaimedToken,
  // startpause,
  // startWithdraw,
  // withdrawMultipleClaimedToken,
  rejectDrop,
  //saveTxnHash,
} from "../../redux";
import BigNumber from "bignumber.js";
import { utils } from "ethers";
import { getDecimal } from "./erc20Functions";

//check drop exists or not
export const isDropCreated = async (tokenAddress) => {
  try {
    const contract = dropFactoryContract();
    const res = await contract.methods.drops(tokenAddress).call();
    logMessage("isDropCreated", res);
    return res !== "0x0000000000000000000000000000000000000000";
  } catch (e) {
    logError("isDropCreated", e);
  }
};

//create drop
export const createDrop = async (tokenAddress, walletAddress, callback) => {
  try {
    const contract = dropFactoryContract();
    transactionPending({}, { text: "Creating Drop" }, "drop");
    await contract.methods
      .createDrop(tokenAddress)
      .send({ from: walletAddress })
      .on("transactionHash", (txnHash) => {
        transactionPending(
          { transactionHash: txnHash },
          { text: "Creating Drop" },
          "drop"
        );
      })

      .then((receipt) => {
        transactionSuccess(
          { transactionHash: receipt.transactionHash },
          { text: "Drop Created" }
        );
        callback();
      })
      .catch((e) => {
        if (e.code === 4001) {
          transactionRejected({}, { text: "Drop Rejected" });
        } else {
          transactionFailed({}, { text: "Drop Failed" });
        }
        logError("createDrop", e);
      });
  } catch (e) {
    logError("createDrop", e);
    transactionFailed({}, { text: "Drop Failed" });
  }
};

//add csv data in drop
export const addDropData = async (
  {
    tokenAmount,
    startDate,
    endDate,
    merkleRoot,
    tokenAddress,
    walletAddress,
    dropperId,
  },
  jwt,
  onload,
  callback
) => {
  try {
    const contract = dropFactoryContract();
    transactionPending({}, { text: "Drop Pending" }, "upload");
    onload();
    await contract.methods
      .addDropData(tokenAmount, startDate, endDate, merkleRoot, tokenAddress)
      .send({ from: walletAddress })
      .on("transactionHash", (txnHash) => {
        transactionPending(
          { transactionHash: txnHash },
          { text: "Drop Pending" },
          "upload"
        );
        //saveTxnHash(merkleRoot, txnHash, jwt);
      })
      .then((receipt) => {
        transactionSuccess(
          { transactionHash: receipt.transactionHash },
          { text: "Drop Created" }
        );
        callback();
      })
      .catch((e) => {
        if (e.code === 4001) {
          transactionRejected({}, { text: "Drop Rejected" });
          rejectDrop(dropperId, merkleRoot, jwt);
        } else {
          transactionFailed({}, { text: "Drop Failed" });
          rejectDrop(dropperId, merkleRoot, jwt);
        }
        logError("createDrop", e);
      });
  } catch (e) {
    logError("addDropData", e);
    transactionFailed({}, { text: "Drop Failed" });
    rejectDrop(dropperId, merkleRoot);
  }
};

// 0: "163083450"
// 1: "4294967295"
// 2: "20000000000000000000"
// 3: "0xcA365ee40cf99788df2841b98b07283C9FC923c5"

export const updateDropData = async (
  tokenAddress,
  prevMerkleRoot,
  newMerkleRoot,
  newtokenAmount,
  walletAddress,
  dropperId,
  jwt,
  onload,
  callback
) => {
  try {
    const contract = dropFactoryContract();
    let prevDropDetails = await contract.methods
      .getDropDetails(tokenAddress, prevMerkleRoot)
      .call();
    logMessage(
      "UPDATE DROP PARAM",
      tokenAddress,
      prevMerkleRoot,
      newMerkleRoot,
      newtokenAmount,
      walletAddress,
      dropperId,
      jwt
      // onload,
      // callback
    );
    logMessage(
      "PREVIOUS DROP DETAILS",
      // prevDropDetails
      prevDropDetails[0],
      prevDropDetails[1],
      prevDropDetails[2],
      prevDropDetails[3],
      prevDropDetails[4]
    );
    transactionPending({}, { text: "Drop Pending" }, "upload");
    const decimals = await getDecimal(tokenAddress);
    const data = {
      tokenAmount: new BigNumber(
        utils.parseUnits(newtokenAmount, decimals).toString()
      )
        .plus(new BigNumber(prevDropDetails[2]))
        .toString(),
      startDate: prevDropDetails[0],
      endDate: prevDropDetails[1],
      merkleRoot: newMerkleRoot,
      tokenAddress,
    };
    logMessage("NEW DROP DETAILS", data);
    onload();
    await contract.methods
      .addDropData(
        data.tokenAmount,
        data.startDate,
        data.endDate,
        data.merkleRoot,
        data.tokenAddress
      )
      .send({ from: walletAddress })
      .on("transactionHash", (txnHash) => {
        transactionPending(
          { transactionHash: txnHash },
          { text: "Drop Pending" },
          "upload"
        );
        //saveTxnHash(merkleRoot, txnHash, jwt);
      })
      .then((receipt) => {
        transactionSuccess(
          { transactionHash: receipt.transactionHash },
          { text: "Drop Updated" }
        );
        // await contract.methods
        //   .pause(tokenAddress, prevMerkleRoot)
        //   .send()
        //   .on("transactionHash", (txnHash) => {
        //     transactionPending(
        //       { transactionHash: txnHash },
        //       { text: "Pause Drop Pending" },
        //       "upload"
        //     );
        //     //saveTxnHash(merkleRoot, txnHash, jwt);
        //   })
        //   .then((receipt) => {
        //     transactionSuccess(
        //       { transactionHash: receipt.transactionHash },
        //       { text: "Previous Drop Paused" }
        //     );
        //     callback();
        //   })
        //   .catch((e) => {
        //     if (e.code === 4001) {
        //       transactionRejected({}, { text: "Drop Pause Rejected" });
        //       rejectDrop(dropperId, newMerkleRoot, jwt);
        //     } else {
        //       transactionFailed({}, { text: "Drop Pause Failed" });
        //       rejectDrop(dropperId, newMerkleRoot, jwt);
        //     }
        //     logError("createDrop", e);
        //   });
        callback();
      })
      .catch((e) => {
        if (e.code === 4001) {
          transactionRejected({}, { text: "Drop Rejected" });
          rejectDrop(dropperId, newMerkleRoot, jwt);
        } else {
          transactionFailed({}, { text: "Drop Failed" });
          rejectDrop(dropperId, newMerkleRoot, jwt);
        }
        logError("createDrop", e);
      });
  } catch (e) {
    logError("addDropData", e);
    transactionFailed({}, { text: "Drop Failed" });
    rejectDrop(dropperId, newMerkleRoot);
  }
};

//pause claims of drop
export const pauseDrop = async (
  dropId,
  tokenAddress,
  walletAddress,
  merkleRoot,
  jwt,
  callback
) => {
  try {
    const contract = dropFactoryContract();
    transactionPending({}, { text: "Pausing Drop" });
    //const res = await startpause(dropId, true, jwt);
    // if (res) {
    await contract.methods
      .pause(tokenAddress, merkleRoot)
      .send({ from: walletAddress })
      .on("transactionHash", (txnHash) => {
        transactionPending(
          { transactionHash: txnHash },
          { text: "Pausing Drop" },
          "pause"
        );
      })
      .then((receipt) => {
        transactionSuccess(
          { transactionHash: receipt.transactionHash },
          { text: "Drop Paused" }
        );
        callback();
      })
      .catch((e) => {
        if (e.code === 4001) {
          transactionRejected({}, { text: "Pausing Rejected" });
        } else {
          transactionFailed({}, { text: "Pausing Failed" });
        }
        logError("pauseDrop", e);
      });
    // } else {
    //   transactionFailed({}, { text: 'Pausing Failed' });
    // }
  } catch (e) {
    logError("pauseDrop", e);
    transactionFailed({}, { text: "Pausing Failed" });
  }
};

//unpause claims of drop
export const unpauseDrop = async (
  dropId,
  tokenAddress,
  walletAddress,
  merkleRoot,
  jwt,
  callback
) => {
  try {
    const contract = dropFactoryContract();
    transactionPending({}, { text: "Unpausing Drop" });
    //const res = await startpause(dropId, false, jwt);
    // if (res) {
    await contract.methods
      .unpause(tokenAddress, merkleRoot)
      .send({ from: walletAddress })
      .on("transactionHash", (txnHash) => {
        transactionPending(
          { transactionHash: txnHash },
          { text: "Unpausing Drop" }
        );
      })
      .then((receipt) => {
        transactionSuccess(
          { transactionHash: receipt.transactionHash },
          { text: "Drop Unpaused" }
        );
        callback();
      })
      .catch((e) => {
        if (e.code === 4001) {
          transactionRejected({}, { text: "Unpausing Rejected" });
        } else {
          transactionFailed({}, { text: "Unpausing Failed" });
        }
        logError("unpauseDrop", e);
      });
    // } else {
    //   transactionFailed({}, { text: 'Pausing Failed' });
    // }
  } catch (e) {
    logError("unpauseDrop", e);
    transactionFailed({}, { text: "Unpausing Failed" });
  }
};

//withdraw and delete drop record
export const withdraw = async (
  dropId,
  dropperAddress,
  tokenAddress,
  walletAddress,
  merkleRoot,
  jwt,
  callback
) => {
  try {
    const contract = dropFactoryContract();
    transactionPending({}, { text: "Withdraw Pending" }, "withdraw");
    // const res = await startWithdraw(dropperAddress, dropId, jwt);
    // if (res) {
    await contract.methods
      .withdraw(tokenAddress, merkleRoot)
      .send({ from: walletAddress })
      .on("transactionHash", (txnHash) => {
        transactionPending(
          { transactionHash: txnHash },
          { text: "Withdraw Pending" },
          "withdraw"
        );
      })
      .then((receipt) => {
        transactionSuccess(
          { transactionHash: receipt.transactionHash },
          { text: "Withdraw Successful" }
        );
        callback();
      })
      .catch((e) => {
        if (e.code === 4001) {
          transactionRejected({}, { text: "Withdraw Rejected" });
        } else {
          transactionFailed({}, { text: "Withdraw Failed" });
        }
        logError("withdraw", e);
      });
    // } else {
    //   transactionFailed({}, { text: 'Withdraw Failed' });
    // }
  } catch (e) {
    logError("withdraw", e);
    transactionFailed({}, { text: "Withdraw Failed" });
  }
};

export const multipleClaims = async (
  { tokenAddress, walletAddress, indexs, amounts, merkleRoots, merkleProofs },
  jwt,
  callback
) => {
  try {
    const contract = dropFactoryContract();
    transactionPending({}, { text: "Claim Pending" }, "claim");
    // const res = await withdrawMultipleClaimedToken(walletAddress, merkleRoots, jwt);
    // if (res) {
    await contract.methods
      .multipleClaimsFromDrop(
        tokenAddress,
        indexs,
        amounts,
        merkleRoots,
        merkleProofs
      )
      .send({ from: walletAddress })
      .on("transactionHash", (txnHash) => {
        transactionPending(
          { transactionHash: txnHash },
          { text: "Claim Pending" },
          "claim"
        );
      })
      .then((receipt) => {
        transactionSuccess(
          { transactionHash: receipt.transactionHash },
          { text: "Claim Successful" }
        );
        callback();
      })
      .catch((e) => {
        if (e.code === 4001) {
          transactionRejected({}, { text: "Claim Rejected" });
        } else {
          transactionFailed({}, { text: "Claim Failed" });
        }
        logError("multiple claim", e);
      });
    // } else {
    //   transactionFailed({}, { text: 'Claim Failed' });
    // }
  } catch (e) {
    logError("multiple claim", e);
    transactionFailed({}, { text: "Claim Failed" });
  }
};

export const singleClaim = async (
  {
    tokenAddress,
    walletAddress,
    id,
    indexs,
    amounts,
    merkleRoots,
    merkleProofs,
  },
  jwt,
  callback
) => {
  try {
    logMessage(
      "CLAIM TOKEN",
      tokenAddress,
      indexs[0],
      amounts[0],
      merkleRoots[0],
      merkleProofs[0]
    );
    const contract = dropFactoryContract();
    transactionPending({}, { text: "Claim Pending" }, "claim");
    // const res = await withdrawClaimedToken(id[0], jwt);
    // if (res) {
    await contract.methods
      .claimFromDrop(
        tokenAddress,
        indexs[0],
        amounts[0],
        merkleRoots[0],
        merkleProofs[0]
      )
      .send({ from: walletAddress })
      .on("transactionHash", (txnHash) => {
        transactionPending(
          { transactionHash: txnHash },
          { text: "Claim Pending" },
          "claim"
        );
      })
      .then((receipt) => {
        transactionSuccess(
          { transactionHash: receipt.transactionHash },
          { text: "Claim Successful" }
        );
        callback();
      })
      .catch((e) => {
        if (e.code === 4001) {
          transactionRejected({}, { text: "Claim Rejected" });
        } else {
          transactionFailed({}, { text: "Claim Failed" });
        }
        logError("single claim", e);
      });
    // } else {
    //   transactionFailed({}, { text: 'Claim Failed' });
    // }
  } catch (e) {
    logError("single claim", e);
    transactionFailed({}, { text: "Claim Failed" });
  }
};
