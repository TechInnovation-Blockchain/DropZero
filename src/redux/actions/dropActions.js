import axios from 'axios';

import * as dropTypes from '../types/dropTypes';
import { logError, logMessage } from '../../utils/log';
import { BASE_URL, formDataConfig } from '../../config/constants';

// import data from './claimHistoryData.json';

//save drop inputs
export const saveFields = data => {
  return dispatch => {
    dispatch({ type: dropTypes.SAVE_FIELDS, payload: data });
  };
};

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

//uploading csv on server
export const uploadCSV = ({ file, account, token, startDate, endDate, type }) => {
  return async dispatch => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('walletAddress', account);
      formData.append('tokenAddress', token);
      type && formData.append('type', type);
      startDate && formData.append('startDate', new Date(startDate).getTime());
      endDate && formData.append('endDate', new Date(endDate).getTime());

      const res = await axios.post(`${BASE_URL}/upload_csv/merkle_root`, formData, formDataConfig);
      logMessage('Upload CSV', res);
      if (res?.data?.responseCode === 200) {
        dispatch({
          type: dropTypes.UPLOAD_CSV,
          payload: { result: res.data.result, error: '' },
        });
      } else {
        dispatch({
          type: dropTypes.UPLOAD_CSV,
          payload: { result: null, error: 'Invalid CSV' },
        });
      }
    } catch (error) {
      logError('Upload CSV', error);
      dispatch({
        type: dropTypes.UPLOAD_CSV,
        payload: { result: null, error: 'Invalid CSV' },
      });
    }
  };
};

//get dropper drops
export const getUserDrops = walletAddress => {
  return async dispatch => {
    try {
      const tempWalletAddress = '0x022eb305961429bad9e95f7760b9bdd84578aace';
      const res = await axios.get(`${BASE_URL}/dropper/get_drops/${walletAddress}`);
      logMessage('Get Drops', res);
      if (res?.data?.responseCode === 201) {
        dispatch({
          type: dropTypes.GET_DROPS,
          payload: res.data.result ? res.data.result.csv : [],
        });
      }
    } catch (e) {
      logError('Get Drops', e);
    }
    // dispatch({ type: dropTypes.GET_DROPS, payload: data });
  };
};

export const withdrawDrops = (walletAddress, csvID) => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `${BASE_URL}/dropper/withdraw_drop/${walletAddress}csv_id=${csvID}`
      );
      logMessage('Withdraw Drops', res);
      if (res?.data?.responseCode === 201) {
      }
    } catch (e) {
      logError('Get Drops', e);
    }
  };
};
