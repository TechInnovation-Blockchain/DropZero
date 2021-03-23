import axios from 'axios';

import * as dropInputTypes from '../types/dropInputTypes';
import { logError } from '../../utils/log';

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
  } catch (e) {
    logError('Token Logo', e);
    return unknownLogo;
  }
};

export const clearFields = () => {
  return dispatch => {
    dispatch({ type: dropInputTypes.CLEAR_FIELDS });
  };
};
