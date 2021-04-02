import * as claimTypes from '../types/claimTypes';

const initialState = {
  availableClaims: null,
  unlockedClaims: [],
  lockedClaims: [],
  claimsHistory: null,
};

const claimReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case claimTypes.GET_AVAILABLE_CLAIMS:
      return { ...state, availableClaims: payload };
    case claimTypes.SET_LOCK_UNLOCK_CLAIMS:
      return {
        ...state,
        unlockedClaims: payload.unlockedClaims,
        lockedClaims: payload.lockedClaims,
      };
    case claimTypes.RESET_LOCK_UNLOCK_CLAIMS:
      return { ...state, unlockedClaims: [], lockedClaims: [] };
    case claimTypes.GET_CLAIMS_HISTORY:
      return { ...state, claimsHistory: payload };
    default:
      return state;
  }
};

export default claimReducer;
