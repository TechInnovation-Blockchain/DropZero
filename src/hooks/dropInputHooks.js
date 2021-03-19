import { useSelector } from 'react-redux';

import { saveFields } from '../redux';
import { useDispatchWrap } from './utilHooks';

export const useDropInputs = () => {
  const dropInputs = useSelector(state => state.dropInput.fields);
  const saveFieldsF = useDispatchWrap(saveFields);

  return { ...dropInputs, saveFieldsF };
};
