import axios from 'axios';

import * as claimTypes from '../types/claimTypes';
import { logError, logMessage } from '../../utils/log';
import { BASE_URL } from '../../config/constants';
import { showSnackbar } from './uiActions';

export const getAvailableClaims = walletAddress => {
  return async dispatch => {
    try {
      const res = await axios.get(`${BASE_URL}/user/claimed_tokens/${walletAddress}?history=false`);
      logMessage('Get Available Claims', res);
      if (res?.data?.responseCode === 201) {
        dispatch({ type: claimTypes.GET_AVAILABLE_CLAIMS, payload: res.data.result });
      } else {
        dispatch({ type: claimTypes.GET_AVAILABLE_CLAIMS, payload: [] });
      }
    } catch (e) {
      logError('Get Available Claims', e);
      e.message === 'Network Error' &&
        dispatch(showSnackbar({ message: e.message, severity: 'error' }));
      dispatch({ type: claimTypes.GET_AVAILABLE_CLAIMS, payload: [] });
    }
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
      const res = await axios.get(`${BASE_URL}/user/claimed_tokens/${walletAddress}?history=true`);
      logMessage('Get Claims History', res);
      if (res?.data?.responseCode === 201) {
        dispatch({ type: claimTypes.GET_CLAIMS_HISTORY, payload: res.data.result });
      } else {
        dispatch({ type: claimTypes.GET_CLAIMS_HISTORY, payload: [] });
      }
    } catch (e) {
      logError('Get Claims History', e);
      dispatch({ type: claimTypes.GET_CLAIMS_HISTORY, payload: [] });
    }
  };
};

export const removeClaim = (claims, address) => {
  return async dispatch => {
    dispatch({ type: claimTypes.REMOVE_CLAIMS, payload: { claims, address } });
  };
};
