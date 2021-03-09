import { combineReducers } from 'redux';

import uiReducer from './reducers/uiReducer';

const rootReducer = combineReducers({
  ui: uiReducer,
});

export default rootReducer;
