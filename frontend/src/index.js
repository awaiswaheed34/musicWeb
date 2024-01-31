import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import { Provider } from 'react-redux';
import store from './store';
import AppRouter from './Router';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
      <AppRouter />
  </Provider>,
  document.getElementById('root')
);
