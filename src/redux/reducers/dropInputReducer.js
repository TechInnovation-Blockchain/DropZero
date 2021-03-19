import * as dropInputTypes from '../types/dropInputTypes';

const initialState = {
  fields: {
    token: '',
    date: null,
  },
};

const dropInputReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case dropInputTypes.SAVE_FIELDS:
      return { ...state, fields: { ...state.fields, ...payload } };
    default:
      return state;
  }
};

export default dropInputReducer;
