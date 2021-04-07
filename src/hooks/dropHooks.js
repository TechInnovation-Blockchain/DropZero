import { useSelector } from 'react-redux';

import {
  saveFields,
  clearFields,
  uploadCSV,
  getUserDrops,
  withdrawDrops,
  clearCSV,
  pauseDrop,
} from '../redux';
import { useDispatchWrap } from './utilHooks';

export const useDropInputs = () => {
  const { fields, csv } = useSelector(state => state.drop);
  const clearFieldsF = useDispatchWrap(clearFields);
  const saveFieldsF = useDispatchWrap(saveFields);
  const uploadCSVF = useDispatchWrap(uploadCSV);
  const clearCSVF = useDispatchWrap(clearCSV);

  return { ...fields, csv, saveFieldsF, clearFieldsF, uploadCSVF, clearCSVF };
};

export const useDropDashboard = () => {
  const { userDrops, dropsPausing } = useSelector(state => state.drop);
  const getUserDropsF = useDispatchWrap(getUserDrops);
  const withdrawDropsF = useDispatchWrap(withdrawDrops);
  const pauseDropF = useDispatchWrap(pauseDrop);

  return { userDrops, dropsPausing, getUserDropsF, withdrawDropsF, pauseDropF };
};
