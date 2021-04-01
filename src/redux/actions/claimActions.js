import axios from 'axios';

import * as claimTypes from '../types/claimTypes';
import { logError, logMessage } from '../../utils/log';
import { BASE_URL } from '../../config/constants';

// import data from './tempData.json';

export const getAvailableClaims = walletAddress => {
  return async dispatch => {
    try {
      const tempWalletAddress = '0x3060bf5212956b969b8609Ee65D50E2d3084Fada';
      const res = await axios.get(
        `${BASE_URL}/user/claimed_tokens/${tempWalletAddress}?history=false`
      );
      logMessage('Get Available Claims', res);
      if (res?.data?.responseCode === 201) {
        dispatch({ type: claimTypes.GET_AVAILABLE_CLAIMS, payload: res.data.result });
      }
    } catch (e) {
      logError('Get Available Claims', e);
    }
    // dispatch({ type: claimTypes.GET_AVAILABLE_CLAIMS, payload: res.data.result });
  };
};

export const setLockAndUnlockClaims = data => {
  return dispatch => {
    dispatch({ type: claimTypes.SET_LOCK_UNLOCK_CLAIMS, payload: data });
  };
};

export const resetLockAndUnlockClaims = () => {
  return dispatch => {
    dispatch({ type: claimTypes.RESET_LOCK_UNLOCK_CLAIMS });
  };
};
