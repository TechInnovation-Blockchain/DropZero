import { useSelector } from 'react-redux';

import { saveFields, clearFields, uploadCSV } from '../redux';
import { useDispatchWrap } from './utilHooks';

export const useDropInputs = () => {
  const { fields, csv } = useSelector(state => state.dropInput);
  const clearFieldsF = useDispatchWrap(clearFields);
  const saveFieldsF = useDispatchWrap(saveFields);
  const uploadCSVF = useDispatchWrap(uploadCSV);

  return { ...fields, csv, saveFieldsF, clearFieldsF, uploadCSVF };
};
