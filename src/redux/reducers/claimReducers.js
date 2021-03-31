import * as claimTypes from '../types/claimTypes';

const initialState = {
  availableClaims: null,
};

const claimReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case claimTypes.GET_AVAILABLE_CLAIMS:
      return { ...state, availableClaims: payload };

    default:
      return state;
  }
};

export default claimReducer;
