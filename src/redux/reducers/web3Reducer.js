import * as web3Types from '../types/web3Types';

const initialState = {
  context: null,
};

const web3Reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case web3Types.STORE_WEB3_CONTEXT:
      return { ...state, context: { ...payload } };
    default:
      return state;
  }
};

export default web3Reducer;
