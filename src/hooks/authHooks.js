import { useSelector } from 'react-redux';

import { getJWT } from '../redux';
import { useDispatchWrap } from './utilHooks';

export const useJWT = () => {
  const auth = useSelector(state => state.auth);
  const getJWTF = useDispatchWrap(getJWT);

  return {
    ...auth,
    getJWTF,
  };
};
