import * as authTypes from '../types/authTypes';

const initialState = {
  jwt: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case authTypes.SAVE_JWT:
      localStorage.setItem('jwt', payload);
      return { ...state, jwt: payload };
    default:
      return state;
  }
};

export default authReducer;
