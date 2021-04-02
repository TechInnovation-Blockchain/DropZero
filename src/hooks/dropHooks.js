import { useSelector } from 'react-redux';

import { saveFields, clearFields, uploadCSV, getUserDrops } from '../redux';
import { useDispatchWrap } from './utilHooks';

export const useDropInputs = () => {
  const { fields, csv } = useSelector(state => state.drop);
  const clearFieldsF = useDispatchWrap(clearFields);
  const saveFieldsF = useDispatchWrap(saveFields);
  const uploadCSVF = useDispatchWrap(uploadCSV);

  return { ...fields, csv, saveFieldsF, clearFieldsF, uploadCSVF };
};

export const useDropDashboard = () => {
  const { userDrops } = useSelector(state => state.drop);
  const getUserDropsF = useDispatchWrap(getUserDrops);

  return { userDrops, getUserDropsF };
};
