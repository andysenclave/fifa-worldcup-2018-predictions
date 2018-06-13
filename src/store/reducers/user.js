import { USER_LOGIN, USER_SIGNUP } from '../actions/action.types';

const initialState = {
  username: null,
  masterAccess: false,
  loggedIn: false
};

const newState = (state = initialState, user) =>{
  return Object.assign({}, state, user);
}

const userReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case USER_LOGIN:
      return newState(state, payload);
    case USER_SIG:
      return initialState;
    default:
      return state;
  }
}

export default userReducer;