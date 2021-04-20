import { useSelector } from 'react-redux';

import { getJWT, authorize } from '../redux';
import { useDispatchWrap } from './utilHooks';

export const useJWT = () => {
  const auth = useSelector(state => state.auth);
  const getJWTF = useDispatchWrap(getJWT);
  const authorizeF = useDispatchWrap(authorize);

  return {
    ...auth,
    getJWTF,
    authorizeF,
  };
};
