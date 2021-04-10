import axios from 'axios';

import * as dropTypes from '../types/dropTypes';
import { logError, logMessage } from '../../utils/log';
import { BASE_URL, formDataConfig } from '../../config/constants';
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
export const clearFields = () => {
  return dispatch => {
    dispatch({ type: dropTypes.CLEAR_FIELDS });
  };
};

//clear csv data
export const clearCSV = () => {
  return dispatch => {
    dispatch({ type: dropTypes.CLEAR_CSV });
  };
};

//uploading csv on server
export const uploadCSV = ({ file, account, token, startDate, endDate, tokenType }, onError) => {
  return async dispatch => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('walletAddress', account);
      formData.append('tokenAddress', token);
      tokenType && formData.append('tokenType', tokenType);
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

//remove drop from redux
export const withdrawDrops = dropId => {
  return async dispatch => {
    dispatch({ type: dropTypes.WITHDRAW_DROP, payload: dropId });
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

export const withdrawClaimedToken = async walletAddress => {
  try {
    const res = await axios.get(`${BASE_URL}/withdraw_claimed_token/${walletAddress}`);
    logMessage('withdrawClaimedToken', res);
  } catch (e) {
    logError('withdrawClaimedToken', e);
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
export const startWithdraw = async (walletAddress, dropId) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/dropper/withdraw_drop/${walletAddress}csv_id=${dropId}`
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
