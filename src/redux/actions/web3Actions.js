import * as web3Types from '../types/web3Types';

export const storeWeb3Context = data => {
  return dispatch => {
    dispatch({ type: web3Types.STORE_WEB3_CONTEXT, payload: data });
  };
};
