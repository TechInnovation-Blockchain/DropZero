import * as dropInputTypes from '../types/dropInputTypes';

const initialState = {
  fields: {
    tokenName: 'Unknown',
    tokenLogo: '',
    token: '',
    date: null,
  },
};

const dropInputReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case dropInputTypes.SAVE_FIELDS:
      return { ...state, fields: { ...state.fields, ...payload } };
    case dropInputTypes.CLEAR_FIELDS:
      return { ...state, fields: initialState.fields };
    default:
      return state;
  }
};

export default dropInputReducer;
