import axios from 'axios';
import { USER_LOGIN, USER_SIGNUP, USER_LOGOUT } from './action.types';
import { getFromLocalStorage } from '../../utils/storage.helper';
import config from '../../config/app.config';

const { api, userKey } = config;

const loginUser = ({ username, password }) => {
  let actionType = '';
  let user = { username, password };
  let successLogin = false;
  const resource = api.userLogin;

  return async (dispatch, getState) => {
    try {
      const response = await axios.post(resource, user);
      let loggedInUser = await response.data;

      if(loggedInUser.user_id !== undefined) {
        successLogin = true;
        user = Object.assign({}, loggedInUser, { loggedIn: true, errorMessage: '' });
        actionType = USER_LOGIN;
      }
    } catch (e) {
      const errorMessage = e.response.data;
      user = { errorMessage };
      actionType = USER_LOGOUT;      
    } finally {
      dispatch({
        type: actionType,
        payload: user
      });
      return successLogin;
    }
  };
};

const signupUser = ({ username, password }) => {
  let user = { username, password };
  let successLogin = false;
  const resource = api.userSignup;

  return async (dispatch, getState) => {
    try {
      const response = await axios.put(resource, user);
      let loggedInUser = await response.data;

      if(loggedInUser.user_id !== undefined) {
        successLogin = true;
        user = Object.assign({}, loggedInUser, { loggedIn: true, errorMessage: '' })
      }
    } catch (e) {
      const errorMessage = e.response.data;
      user = { errorMessage };
    } finally {
      dispatch({
        type: USER_SIGNUP,
        payload: user
      });
      return successLogin;
    }
  };
};

const logoutUser = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT
  });
};

const checkLocalUser = () => (dispatch) => {
  const userInfo = getFromLocalStorage(userKey);
  if(userInfo !== undefined) {
    dispatch({
      type: USER_LOGIN,
      payload: userInfo
    });
    return true;
  } else {
    return false;
  }
}

export { checkLocalUser, loginUser, logoutUser, signupUser };