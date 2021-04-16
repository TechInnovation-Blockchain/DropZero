import axios from 'axios';

import * as dropTypes from '../types/dropTypes';
import { logError, logMessage } from '../../utils/log';
import { BASE_URL, formDataConfig, config } from '../../config/constants';
import { showSnackbar } from './uiActions';

//save drop inputs
export const saveFields = data => {
  return dispatch => {
    dispatch({ type: dropTypes.SAVE_FIELDS, payload: data });
  };
};

//get token logo
export const getTokenLogo = async tokenAddress => {
  const unknownLogo =
    'https://gateway.pinata.cloud/ipfs/QmNX2QerTxTm1RThD7Dc9X5uS9VFnQxmMotaMFhK5GYbBk';
  try {
    const logoUrl = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${tokenAddress}/logo.png`;
    const res = await axios.get(logoUrl);
    if (res) {
      return logoUrl;
    } else {
      return unknownLogo;
    }
  } catch (error) {
    logError('Token Logo', error);
    return unknownLogo;
  }
};

//clear all drop inputs
export const clearFields = account => {
  return dispatch => {
    dispatch({ type: dropTypes.CLEAR_FIELDS, payload: account });
  };
};

//clear csv data
export const clearCSV = () => {
  return dispatch => {
    dispatch({ type: dropTypes.CLEAR_CSV });
  };
};

//uploading csv on server
export const uploadCSV = (
  { file, account, token, startDate, endDate, dropName, decimal },
  onError
) => {
  return async dispatch => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('walletAddress', account);
      formData.append('tokenAddress', token);
      formData.append('decimal', decimal);
      dropName && formData.append('dropName', dropName);
      startDate && formData.append('startDate', new Date(startDate).getTime());
      endDate && formData.append('endDate', new Date(endDate).getTime());

      const res = await axios.post(`${BASE_URL}/upload_csv/merkle_root`, formData, formDataConfig);
      logMessage('Upload CSV', res);
      if (res?.data?.responseCode === 200) {
        dispatch({
          type: dropTypes.UPLOAD_CSV,
          payload: res.data.result,
        });
        dispatch(showSnackbar({ message: 'CSV Uploaded Successfully', severity: 'success' }));
      } else {
        dispatch(showSnackbar({ message: 'CSV Upload Error', severity: 'error' }));
        onError();
      }
    } catch (error) {
      logError('Upload CSV', error);
      dispatch(showSnackbar({ message: 'CSV Upload Error', severity: 'error' }));
      onError();
    }
  };
};

//get dropper drops
export const getUserDrops = walletAddress => {
  return async dispatch => {
    try {
      const res = await axios.get(`${BASE_URL}/dropper/get_drops/${walletAddress}`);
      logMessage('Get Drops', res);
      if (res?.data?.responseCode === 201) {
        dispatch({
          type: dropTypes.GET_DROPS,
          payload: res.data.result ? res.data.result : [],
        });
      } else {
        dispatch({
          type: dropTypes.GET_DROPS,
          payload: [],
        });
      }
    } catch (e) {
      dispatch({
        type: dropTypes.GET_DROPS,
        payload: [],
      });
      logError('Get Drops', e);
    }
  };
};

//update withdrawed drop
export const withdrawDrops = drop => {
  return async dispatch => {
    dispatch({ type: dropTypes.WITHDRAW_DROP, payload: drop });
  };
};

//change drop status in redux
export const pauseDrop = (dropId, pause) => {
  return async dispatch => {
    dispatch({ type: dropTypes.PAUSE_DROP, payload: { id: dropId, pause } });
  };
};

//get csv file from server
export const getCSVFile = async (dropId, tokenName) => {
  try {
    const res = await axios.get(`${BASE_URL}/dropper/get_csv/${dropId}?token_name=${tokenName}`);
    logMessage('getCSVFile', res);
    if (res?.data?.responseCode === 201) {
      return res.data.result;
    }
  } catch (e) {
    logError('getCSVFile', e);
  }
};

//start single claim
export const withdrawClaimedToken = async claimId => {
  try {
    const res = await axios.post(`${BASE_URL}/user/withdraw_claimed_token/${claimId}?claim=single`);
    logMessage('withdrawClaimedToken', res);
    if (res?.data?.responseCode === 201) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    logError('withdrawClaimedToken', e);
    return false;
  }
};

//start multiple claim
export const withdrawMultipleClaimedToken = async (walletAddress, merkleRoot) => {
  try {
    const body = { merkleRoot };
    const res = await axios.post(
      `${BASE_URL}/user/withdraw_claimed_token/${walletAddress}?claim=multiple`,
      body,
      config
    );
    logMessage('withdrawMultipleClaimedToken', res);
    if (res?.data?.responseCode === 201) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    logError('withdrawMultipleClaimedToken', e);
    return false;
  }
};

//start cron job for pause/unpause on server
export const startpause = async (dropId, action) => {
  try {
    const res = await axios.get(`${BASE_URL}/dropper/pause_drop/${dropId}?pause=${action}`);
    logMessage('pause', res);
    if (res?.data?.responseCode === 201) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    logError('pause', e);
    return false;
  }
};

//start withdraw cron job on server
export const startWithdraw = async (dropperAddress, dropId) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/dropper/withdraw_drop/${dropperAddress}?csv_id=${dropId}`
    );
    logMessage('startWithdraw', res);
    if (res?.data?.responseCode === 201) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    logError('startWithdraw', e);
    return false;
  }
};

//remove users data from server on rejection
export const rejectDrop = async (dropperAddress, merkleRoot) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/dropper/reject_drop/${dropperAddress}?merkleRoot=${merkleRoot}`
    );
    logMessage('rejectDrop', res);
  } catch (e) {
    logError('rejectDrop', e);
    return false;
  }
};

//clear user drops from redux
export const resetDrops = () => {
  return async dispatch => {
    dispatch({ type: dropTypes.RESET_DROPS });
  };
};

//validate dropName
export const checkDropName = async (dropName, tokenAddress) => {
  try {
    const body = { dropName, tokenAddress };
    const res = await axios.post(`${BASE_URL}/dropper/check_drop`, body, config);
    logMessage('checkDropName', res);
    if (res?.data?.responseCode) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    logError('checkDropName', e);
    return false;
  }
};

//change drop tabs from token=>dates=>uploadCSV
export const changeTab = tab => {
  return async dispatch => {
    dispatch({ type: dropTypes.CHANGE_TAB, payload: tab });
  };
};

export const saveTxnHash = async (merkle_root, txn_hash) => {
  try {
    const body = { txn_hash, merkle_root };
    const res = await axios.post(`${BASE_URL}/dropper/etherscan_link`, body, config);
    logMessage('saveTxnHash', res);
  } catch (e) {
    logError('saveTxnHash', e);
  }
};
