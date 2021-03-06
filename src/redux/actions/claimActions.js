import axios from "axios";

import * as claimTypes from "../types/claimTypes";
import { logError, logMessage } from "../../utils/log";
import { BASE_URL } from "../../config/constants";
import { showSnackbar } from "./uiActions";
import { authError } from "./authActions";

//all claims of user
export const getAvailableClaims = (jwt, walletAddress) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      const res = await axios.get(
        `${BASE_URL}/user/claimed_tokens?history=false`,
        config
      );
      logMessage("Get Available Claims", res);
      if (res?.data?.responseCode === 201) {
        dispatch({
          type: claimTypes.GET_AVAILABLE_CLAIMS,
          payload: res.data.result,
        });
      } else {
        dispatch({ type: claimTypes.GET_AVAILABLE_CLAIMS, payload: [] });
      }
    } catch (e) {
      logError("Get Available Claims", e);
      e.message === "Network Error" &&
        dispatch(showSnackbar({ message: e.message, severity: "error" }));
      dispatch({ type: claimTypes.GET_AVAILABLE_CLAIMS, payload: [] });
      authError(e);
    }
  };
};

//split user claims into lock and unlocked claims
export const setLockAndUnlockClaims = (data) => {
  return (dispatch) => {
    dispatch({ type: claimTypes.SET_LOCK_UNLOCK_CLAIMS, payload: data });
  };
};

//clear locked and unlocked claims
export const resetLockAndUnlockClaims = () => {
  return (dispatch) => {
    dispatch({ type: claimTypes.RESET_LOCK_UNLOCK_CLAIMS });
  };
};

//get user claimes history
export const getClaimsHistory = (jwt) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      const res = await axios.get(
        `${BASE_URL}/user/claimed_tokens?history=true`,
        config
      );
      logMessage("Get Claims History", res);
      if (res?.data?.responseCode === 201) {
        dispatch({
          type: claimTypes.GET_CLAIMS_HISTORY,
          payload: res.data.result,
        });
      } else {
        dispatch({ type: claimTypes.GET_CLAIMS_HISTORY, payload: [] });
      }
    } catch (e) {
      logError("Get Claims History", e);
      dispatch({ type: claimTypes.GET_CLAIMS_HISTORY, payload: [] });
      authError(e);
    }
  };
};

//remove claim from redux after claiming
export const removeClaim = (claims, address) => {
  return async (dispatch) => {
    dispatch({ type: claimTypes.REMOVE_CLAIMS, payload: { claims, address } });
  };
};

//clear user claims from redux
export const resetClaims = () => {
  return async (dispatch) => {
    dispatch({ type: claimTypes.RESET_CLAIMS });
  };
};

//clear users claims history from redux
export const resetClaimsHistory = () => {
  return async (dispatch) => {
    dispatch({ type: claimTypes.RESET_CLAIMS_HISTORY });
  };
};

//start single claim
export const withdrawClaimedToken = async (claimId, jwt) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };
    const res = await axios.post(
      `${BASE_URL}/user/withdraw_claimed_token/${claimId}?claim=single`,
      {},
      config
    );
    logMessage("withdrawClaimedToken", res);
    if (res?.data?.responseCode === 201) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    logError("withdrawClaimedToken", e);
    authError(e);
    return false;
  }
};

//start multiple claim
export const withdrawMultipleClaimedToken = async (
  walletAddress,
  merkleRoot,
  jwt
) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };
    const body = { merkleRoot };
    const res = await axios.post(
      `${BASE_URL}/user/withdraw_claimed_token/${walletAddress}?claim=multiple`,
      body,
      config
    );
    logMessage("withdrawMultipleClaimedToken", res);
    if (res?.data?.responseCode === 201) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    logError("withdrawMultipleClaimedToken", e);
    authError(e);
    return false;
  }
};

export const getAquaClaims = (walletAddress) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `https://server.aquafi.io/aqua/${walletAddress}`
      );
      logMessage("getAquaClaims", res);
      if (res?.data?.status === "success") {
        dispatch({
          type: claimTypes.GET_AQUA_CLAIMS,
          payload: {
            aqua: true,
            amount: res.data.data.amount,
            multiplier: res.data.data.currentMultiplier,
          },
        });
      } else {
        dispatch({ type: claimTypes.GET_AQUA_CLAIMS, payload: {} });
      }
    } catch (e) {
      logError("getAquaClaims", e);
      dispatch({ type: claimTypes.GET_AQUA_CLAIMS, payload: {} });
    }
  };
};

export const getFlashV3Claims = (walletAddress) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `https://bz.to/api/GetFlashV3ByAddress.aspx?address=${walletAddress}`
      );
      logMessage("getFlashV3Claims", res);
      if (res?.data?.Success === true) {
        dispatch({
          type: claimTypes.GET_FLASHV3_CLAIMS,
          payload: {
            flashv3: true,
            data: res.data.Data,
          },
        });
      } else {
        dispatch({ type: claimTypes.GET_FLASHV3_CLAIMS, payload: {} });
      }
    } catch (e) {
      logError("getFlashV3Claims", e);
      dispatch({ type: claimTypes.GET_FLASHV3_CLAIMS, payload: {} });
    }
  };
};
