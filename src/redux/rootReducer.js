import { combineReducers } from 'redux';

import uiReducer from './reducers/uiReducer';
import web3Reducer from './reducers/web3Reducer';
import dropReducer from './reducers/dropReducer';
import claimReducer from './reducers/claimReducers';

const rootReducer = combineReducers({
  ui: uiReducer,
  web3: web3Reducer,
  drop: dropReducer,
  claim: claimReducer,
});

export default rootReducer;
