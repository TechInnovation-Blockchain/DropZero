import { useSelector } from 'react-redux';

import {
  getAvailableClaims,
  setLockAndUnlockClaims,
  resetLockAndUnlockClaims,
  getClaimsHistory,
} from '../redux';
import { useDispatchWrap } from './utilHooks';

export const useClaims = () => {
  const { availableClaims, unlockedClaims, lockedClaims } = useSelector(state => state.claim);
  const getAvailableClaimsF = useDispatchWrap(getAvailableClaims);
  const setLockAndUnlockClaimsF = useDispatchWrap(setLockAndUnlockClaims);
  const resetLockAndUnlockClaimsF = useDispatchWrap(resetLockAndUnlockClaims);

  return {
    availableClaims,
    unlockedClaims,
    lockedClaims,
    getAvailableClaimsF,
    setLockAndUnlockClaimsF,
    resetLockAndUnlockClaimsF,
  };
};

export const useClaimsDashboard = () => {
  const { claimsHistory } = useSelector(state => state.claim);
  const getClaimsHistoryF = useDispatchWrap(getClaimsHistory);

  return { claimsHistory, getClaimsHistoryF };
};
