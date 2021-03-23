import { useSelector } from 'react-redux';

import { saveFields, clearFields } from '../redux';
import { useDispatchWrap } from './utilHooks';

export const useDropInputs = () => {
  const dropInputs = useSelector(state => state.dropInput.fields);
  const clearFieldsF = useDispatchWrap(clearFields);
  const saveFieldsF = useDispatchWrap(saveFields);

  return { ...dropInputs, saveFieldsF, clearFieldsF };
};
