import { combineReducers } from 'redux';

import uiReducer from './reducers/uiReducer';
import web3Reducer from './reducers/web3Reducer';

const rootReducer = combineReducers({
  ui: uiReducer,
  web3: web3Reducer,
});

export default rootReducer;
