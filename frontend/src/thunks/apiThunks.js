// src/thunks/apiThunk.js
import axios from 'axios';

// Set your Django backend base URL
const BACKEND_BASE_URL = 'http://127.0.0.1:8000';

// Thunk for making API requests
export const apiCallThunk = ({ endpoint, method = 'GET', data = null, headers = {} }) => async (dispatch, getState) => {
  try {
    const url = `${BACKEND_BASE_URL}${endpoint}`;
    const authToken = localStorage.getItem('token');
   

    const response = await axios({
      method,
      url,
      data,
      headers: {
       
        Authorization: authToken ? `Token ${authToken}` : '',
        ...headers,
      },
    });

    // Check if the response has a 'status' property
    if ('status' in response.data) {
      // Dispatch success action with the response data
      dispatch(apiCallSuccess(response.data));

    } else {
      // If 'status' property is not present, treat it as a failure
      throw new Error(response.data.message || 'API call failed.');
    }
    return response.data;
  } catch (error) {
    // Dispatch failure action with the error
    dispatch(apiCallFailure(error.message));
  }
};


// Actions for success and failure
const apiCallSuccess = (data) => ({
  type: 'API_CALL_SUCCESS',
  payload: data,
});

const apiCallFailure = (error) => ({
  type: 'API_CALL_FAILURE',
  payload: error,
});