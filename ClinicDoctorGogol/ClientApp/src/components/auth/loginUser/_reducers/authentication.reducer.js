import { userConstants } from '../_constants';

//const user = JSON.parse(localStorage.getItem('user'));
const initialState = {
  user: {
    email: ''
  },
  //initialState: true,
  loggingIn: false,
  loggedIn: false
};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {
        ...state,
        loggedIn: false
      };
    default:
      return state
  }
}
