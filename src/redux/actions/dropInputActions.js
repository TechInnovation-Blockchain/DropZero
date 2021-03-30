import axios from 'axios';

import * as dropInputTypes from '../types/dropInputTypes';
import { logError, logMessage } from '../../utils/log';
import { BASE_URL, formDataConfig } from '../../config/constants';

export const saveFields = data => {
  return dispatch => {
    dispatch({ type: dropInputTypes.SAVE_FIELDS, payload: data });
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

export const clearFields = () => {
  return dispatch => {
    dispatch({ type: dropInputTypes.CLEAR_FIELDS });
  };
};

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
          type: dropInputTypes.UPLOAD_CSV,
          payload: { result: res.data.result, error: '' },
        });
      } else {
        dispatch({
          type: dropInputTypes.UPLOAD_CSV,
          payload: { result: null, error: 'Invalid CSV' },
        });
      }
    } catch (error) {
      logError('Upload CSV', error);
      dispatch({
        type: dropInputTypes.UPLOAD_CSV,
        payload: { result: null, error: 'Invalid CSV' },
      });
    }
  };
};
