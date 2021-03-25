import { combineReducers } from 'redux';

import uiReducer from './reducers/uiReducer';
import web3Reducer from './reducers/web3Reducer';
import dropInputReducer from './reducers/dropInputReducer';

const rootReducer = combineReducers({
  ui: uiReducer,
  web3: web3Reducer,
  dropInput: dropInputReducer,
});

export default rootReducer;
