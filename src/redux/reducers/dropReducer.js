import * as dropTypes from '../types/dropTypes';

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
  userDrops: null,
};

const dropReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case dropTypes.SAVE_FIELDS:
      return { ...state, fields: { ...state.fields, ...payload } };
    case dropTypes.CLEAR_FIELDS:
      return { ...state, fields: initialState.fields };
    case dropTypes.UPLOAD_CSV:
      return { ...state, csv: payload };
    case dropTypes.GET_DROPS:
      return { ...state, userDrops: payload };
    default:
      return state;
  }
};

export default dropReducer;
