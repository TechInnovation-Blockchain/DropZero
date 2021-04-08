import * as dropTypes from '../types/dropTypes';

const initialState = {
  fields: {
    tokenName: '',
    tokenLogo: '',
    token: '',
    tokenType: '',
    startDate: null,
    endDate: null,
    dropExists: false,
    approved: 0,
  },
  csv: null,
  userDrops: null,
  dropsPausing: false,
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
      const pausedDrops = payload.filter(({ pauseDrop }) => pauseDrop === true);
      return { ...state, userDrops: payload, dropsPausing: pausedDrops.length > 0 };
    case dropTypes.CLEAR_CSV:
      return { ...state, csv: null };
    case dropTypes.PAUSE_DROP:
      const tempDrops = state.userDrops;
      let targetData = tempDrops.filter(({ _id }) => _id === payload.id)[0];
      const index = tempDrops.findIndex(({ _id }) => _id === payload.id);
      targetData = { ...targetData, pauseDrop: payload.pause };
      tempDrops[index] = targetData;
      const _pausedDrops = tempDrops.filter(({ pauseDrop }) => pauseDrop === true);
      return {
        ...state,
        dropsPausing: !payload.pause && _pausedDrops.length === 0 ? false : true,
      };
    case dropTypes.CLEAR_DROPS:
      return { ...state, userDrops: null };
    case dropTypes.WITHDRAW_DROP:
      const _tempDrops = state.userDrops.filter(({ _id }) => _id !== payload.id);
      const __pausedDrops = _tempDrops.filter(({ pauseDrop }) => pauseDrop === true);
      return { ...state, userDrops: _tempDrops, dropsPausing: __pausedDrops.length > 0 };
    default:
      return state;
  }
};

export default dropReducer;
