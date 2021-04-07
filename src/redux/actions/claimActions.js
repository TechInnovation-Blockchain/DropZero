import axios from 'axios';

import * as claimTypes from '../types/claimTypes';
import { logError, logMessage } from '../../utils/log';
import { BASE_URL } from '../../config/constants';
import { showSnackbar } from './uiActions';

// import data from './tempData.json';
// import _data from './claimHistoryData.json';

export const getAvailableClaims = walletAddress => {
  return async dispatch => {
    try {
      const tempWalletAddress = '0xa88335c763488292f471d2298cbbcB0eCd5b9164';
      const res = await axios.get(`${BASE_URL}/user/claimed_tokens/${walletAddress}?history=false`);
      logMessage('Get Available Claims', res);
      if (res?.data?.responseCode === 201) {
        dispatch({ type: claimTypes.GET_AVAILABLE_CLAIMS, payload: res.data.result });
      } else {
        dispatch({ type: claimTypes.GET_AVAILABLE_CLAIMS, payload: [] });
      }
    } catch (e) {
      logError('Get Available Claims', e);
      e.message === 'Newtwork Error' &&
        dispatch(showSnackbar({ message: e.message, severity: 'error' }));
      dispatch({ type: claimTypes.GET_AVAILABLE_CLAIMS, payload: [] });
    }
    // dispatch({ type: claimTypes.GET_AVAILABLE_CLAIMS, payload: data });
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

export const getClaimsHistory = walletAddress => {
  return async dispatch => {
    try {
      const tempWalletAddress = '0x3060bf5212956b969b8609Ee65D50E2d3084Fada';
      const res = await axios.get(`${BASE_URL}/user/claimed_tokens/${walletAddress}?history=true`);
      logMessage('Get Claims History', res);
      if (res?.data?.responseCode === 201) {
        dispatch({ type: claimTypes.GET_CLAIMS_HISTORY, payload: res.data.result });
      } else {
        dispatch({ type: claimTypes.GET_CLAIMS_HISTORY, payload: [] });
      }
    } catch (e) {
      logError('Get Claims History', e);
      // dispatch(showSnackbar({ message: e.message, severity: 'error' }));
      dispatch({ type: claimTypes.GET_CLAIMS_HISTORY, payload: [] });
    }
    // dispatch({ type: claimTypes.GET_CLAIMS_HISTORY, payload: _data });
  };
};
