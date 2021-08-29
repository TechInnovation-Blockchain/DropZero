import { useSelector } from 'react-redux';

import {
  getAvailableClaims,
  setLockAndUnlockClaims,
  resetLockAndUnlockClaims,
  getClaimsHistory,
  removeClaim,
  resetClaims,
  resetClaimsHistory,
  getAquaClaims,
  getFlashV3Claims,
} from '../redux';
import { useDispatchWrap } from './utilHooks';

export const useClaims = () => {
  const { availableClaims, unlockedClaims, lockedClaims } = useSelector(state => state.claim);
  const getAvailableClaimsF = useDispatchWrap(getAvailableClaims);
  const setLockAndUnlockClaimsF = useDispatchWrap(setLockAndUnlockClaims);
  const resetLockAndUnlockClaimsF = useDispatchWrap(resetLockAndUnlockClaims);
  const removeClaimF = useDispatchWrap(removeClaim);
  const resetClaimsF = useDispatchWrap(resetClaims);

  return {
    availableClaims,
    unlockedClaims,
    lockedClaims,
    getAvailableClaimsF,
    setLockAndUnlockClaimsF,
    resetLockAndUnlockClaimsF,
    removeClaimF,
    resetClaimsF,
  };
};

export const useClaimsDashboard = () => {
  const { claimsHistory } = useSelector(state => state.claim);
  const getClaimsHistoryF = useDispatchWrap(getClaimsHistory);
  const resetClaimsHistoryF = useDispatchWrap(resetClaimsHistory);

  return { claimsHistory, getClaimsHistoryF, resetClaimsHistoryF };
};

export const useAquaClaims = () => {
  const { aquaClaims } = useSelector(state => state.claim);
  const getAquaClaimsF = useDispatchWrap(getAquaClaims);

  return { aquaClaims, getAquaClaimsF };
};

export const useFlashV3Claims = () => {
  const { flashV3Claims } = useSelector(state => state.claim);
  const getFlashV3ClaimsF = useDispatchWrap(getFlashV3Claims);

  return { flashV3Claims, getFlashV3ClaimsF };
};
