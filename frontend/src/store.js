import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk }from 'redux-thunk';

// Import your reducers here
import authReducer from './reducers/authReducer'; // You'll need to create this reducer

// Combine reducers if you have multiple
const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here
});

// Create the Redux store
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
