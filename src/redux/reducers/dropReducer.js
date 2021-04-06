import * as dropTypes from '../types/dropTypes';

const initialState = {
  fields: {
    tokenName: 'Unknown',
    tokenLogo: '',
    token: '',
    type: '',
    startDate: null,
    endDate: null,
    dropExists: false,
    approved: 0,
  },
  csv: null,
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
    case dropTypes.CLEAR_CSV:
      return { ...state, csv: null };
    default:
      return state;
  }
};

export default dropReducer;
