import { useSelector } from "react-redux";

import {
  saveFields,
  clearFields,
  uploadCSV,
  updateCSV,
  getUserDrops,
  withdrawDrops,
  clearCSV,
  pauseDrop,
  resetDrops,
  changeTab,
} from "../redux";
import { useDispatchWrap } from "./utilHooks";

export const useDropInputs = () => {
  const { fields, csv, currentTab, currentAccount } = useSelector(
    (state) => state.drop
  );
  const clearFieldsF = useDispatchWrap(clearFields);
  const saveFieldsF = useDispatchWrap(saveFields);
  const uploadCSVF = useDispatchWrap(uploadCSV);
  const updateCSVF = useDispatchWrap(updateCSV);
  const clearCSVF = useDispatchWrap(clearCSV);
  const changeTabF = useDispatchWrap(changeTab);

  return {
    ...fields,
    currentAccount,
    csv,
    currentTab,
    saveFieldsF,
    clearFieldsF,
    uploadCSVF,
    updateCSVF,
    clearCSVF,
    changeTabF,
  };
};

export const useDropDashboard = () => {
  const { userDrops, dropsPausing } = useSelector((state) => state.drop);
  const getUserDropsF = useDispatchWrap(getUserDrops);
  const withdrawDropsF = useDispatchWrap(withdrawDrops);
  const pauseDropF = useDispatchWrap(pauseDrop);
  const resetDropsF = useDispatchWrap(resetDrops);

  return {
    userDrops,
    dropsPausing,
    getUserDropsF,
    withdrawDropsF,
    pauseDropF,
    resetDropsF,
  };
};
