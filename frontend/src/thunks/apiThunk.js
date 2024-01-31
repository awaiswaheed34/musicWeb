// src/thunks/apiThunk.js
import { apiCallThunk } from './apiThunks';


export const loginUser = (formData) => async (dispatch, getState) => {
    try {
       
      const response = await dispatch(apiCallThunk({
        endpoint: `/api/user/login/`,
        method: 'POST',
        data: formData,
      }));
      console.log(response, "login call  response");
      // Check if the response has a status indicating success
      if (response.status === 'success') {
        //store token in local storage 
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user_profile));
        console.log(response.user, "user", response);

        // Dispatch actions based on the successful response if needed
        dispatch({ type: 'LOGIN_SUCCESS', payload: response });
        
        
        // Optionally, you can return the response data if needed
        return response;
      } else {
        // If the response status is not 'success', treat it as a login failure
        throw new Error(response.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      // Dispatch actions for login failure if needed
      console.error('Login failed:', error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  };

const apiCallSuccess = (data) => ({
    type: 'API_CALL_SUCCESS',
    payload: data,
  });
  
export const signupUser = (formData) => async (dispatch) => {
  try {
    const response = await dispatch(apiCallThunk({
      endpoint: `/api/user/signup/`,
      method: 'POST',
      data: formData,
      
    }));
    dispatch(apiCallSuccess(response.data));
    return response.data;

    // Dispatch actions based on the response if needed

  } catch (error) {
    console.error('Signup failed:', error.message);
    // Dispatch actions for signup failure if needed
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await dispatch(apiCallThunk({
      endpoint: `/api/user/logout/`,
      method: 'POST',
    }));

    // Dispatch actions for successful logout if needed

  } catch (error) {
    console.error('Logout failed:', error.message);
    // Dispatch actions for logout failure if needed
  }
};

export const uploadSong = (formData) => async (dispatch) => {
  try {
    const response = await dispatch(apiCallThunk({
      endpoint: `/api/music/upload/`,
      method: 'POST',
      data: formData,
    }));

    // Dispatch actions based on the response if needed

  } catch (error) {
    console.error('Song upload failed:', error.message);
    // Dispatch actions for song upload failure if needed
  }
};


export const getAllSongs = () => async (dispatch) => {
    try {
      const response = await dispatch(apiCallThunk({
        endpoint: '/api/music/all/',
        method: 'GET',
      }));
  
      // Dispatch success action with the response data
      return response
    } catch (error) {
      // Dispatch failure action with the error
      return { error: error.message }
    }
  };


  
export const getUserProfile = (username) => async (dispatch) => {
  try {
    const endpoint = username ? `/api/user/profile/${username}/` : '/api/user/profile/';
    const response = await dispatch(apiCallThunk({
      endpoint,
      method: 'GET',
    }));

    // Dispatch actions based on the response if needed
    return response;
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    // Dispatch actions for failure if needed
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const response = await dispatch(apiCallThunk({
      endpoint: '/api/users/all/',
      method: 'GET',
    }));

    if (response.status === 'success') {
      return response;
    } else {
      throw new Error(response.message || 'Failed to fetch users.');
    }
  } catch (error) {
    console.error('Error in getAllUsers thunk:', error.message);
    throw error;
  }
};