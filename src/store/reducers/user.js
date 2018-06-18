import { USER_LOGIN, USER_LOGOUT, USER_SIGNUP } from '../actions/action.types';

const initialState = {
  username: null,
  user_id: null,
  masterAccess: false,
  loggedIn: false,
  errorMessage: ''
};

const newState = (state = initialState, user) =>{
  return Object.assign({}, state, user);
}

const userReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case USER_LOGIN:
      return newState(state, payload);
    case USER_LOGOUT:
      return initialState; 
    case USER_SIGNUP:
    return newState(state, payload);
    default:
      return state;
  }
}

export default userReducer;