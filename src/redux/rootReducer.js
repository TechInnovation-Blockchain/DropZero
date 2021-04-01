import { combineReducers } from 'redux';

import uiReducer from './reducers/uiReducer';
import web3Reducer from './reducers/web3Reducer';
import dropInputReducer from './reducers/dropInputReducer';
import claimReducer from './reducers/claimReducers';

const rootReducer = combineReducers({
  ui: uiReducer,
  web3: web3Reducer,
  dropInput: dropInputReducer,
  claim: claimReducer,
});

export default rootReducer;
