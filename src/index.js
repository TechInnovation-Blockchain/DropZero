import React from 'react';
import ReactDOM from 'react-dom';

import App from './config/App';
import { store } from './redux/store';
import { Provider as ReduxProvider } from 'react-redux';

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById('root')
);
