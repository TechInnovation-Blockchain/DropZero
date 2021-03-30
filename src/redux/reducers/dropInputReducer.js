import * as dropInputTypes from '../types/dropInputTypes';

const initialState = {
  fields: {
    tokenName: 'Unknown',
    tokenLogo: '',
    token: '',
    type: '',
    date: null,
    startDate: null,
    endDate: null,
  },
  csv: {
    result: null,
    // error: '',
  },
};

const dropInputReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case dropInputTypes.SAVE_FIELDS:
      return { ...state, fields: { ...state.fields, ...payload } };
    case dropInputTypes.CLEAR_FIELDS:
      return { ...state, fields: initialState.fields };
    case dropInputTypes.UPLOAD_CSV:
      return { ...state, csv: payload };
    default:
      return state;
  }
};

export default dropInputReducer;
