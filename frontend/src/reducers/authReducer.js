const initialState = {
    isAuthenticated: false,
    token: null,
    user: {},
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isAuthenticated: true,
          token: action.payload.token,
          user: action.payload.user,
        };
    case 'LOGIN_SUCCESS':
            // Update the state based on the payload response
            return {
              ...state,
              isAuthenticated: true,
              token: action.payload.token,
              user: action.payload.user_profile,
            };
      case 'LOGOUT':
        return initialState;
        
      default:
        return state;
    }
  };
  
  export default authReducer;
  