import { USER_LOGIN, USER_LOGOUT, USER_SIGNUP } from '../actions/action.types';
import { removeLocalStorage, saveInLocalStorage } from '../../utils/storage.helper';
import config from '../../config/app.config';

const initialState = {
  username: null,
  user_id: null,
  masterAccess: false,
  loggedIn: false,
  errorMessage: ''
};
const { userKey } = config;
const newState = (state = initialState, user) =>{
  return Object.assign({}, state, user);
}

const userReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case USER_LOGIN: {
      const currentState = newState(state, payload);
      saveInLocalStorage(userKey, currentState);
      return currentState;
    }
    case USER_LOGOUT: {
      removeLocalStorage(userKey);
      return initialState; 
    }
    case USER_SIGNUP: {
      const currentState = newState(state, payload);
      saveInLocalStorage(userKey, currentState);
      return currentState;
    }
    default:
      return state;
  }
}

export default userReducer;