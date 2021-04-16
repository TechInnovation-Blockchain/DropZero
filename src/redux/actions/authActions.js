import axios from 'axios';

import * as authTypes from '../types/authTypes';
import { logError, logMessage } from '../../utils/log';
import { BASE_URL, config } from '../../config/constants';

//get jwt web token
export const getJWT = (wallet_address, time_stamp) => {
  return async dispatch => {
    try {
      const body = { wallet_address, time_stamp };
      const res = await axios.post(`${BASE_URL}/upload_csv/auth`, body, config);
      logMessage('getJWT', res);
      if (res?.data?.responseCode === 200) {
        dispatch({ type: authTypes.SAVE_JWT, payload: res.data.result });
      }
    } catch (e) {
      logError('getJWT', e);
    }
  };
};
