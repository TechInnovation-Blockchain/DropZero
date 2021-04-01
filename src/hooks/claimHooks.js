import { useSelector } from 'react-redux';

import { getAvailableClaims, setLockAndUnlockClaims, resetLockAndUnlockClaims } from '../redux';
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
