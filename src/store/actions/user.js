import axios from 'axios';
import { USER_LOGIN, USER_SIGNUP } from './action.types';
import config from '../../config/app.config';

const { api } = config;

export const loginUser = ({ username, password }) => {
  let user = { username, password };
  let successLogin = false;
  const resource = api.userLogin;

  return async (dispatch, getState) => {
    try {
      const response = await axios.post(resource, user);
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
        type: USER_LOGIN,
        payload: user
      });
      return successLogin;
    }
  };
};

export const signupUser = ({ username, password }) => {
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

// export const logoutUser = () => (dispatch) => {
//   dispatch({
//     type: USER_LOGOUT
//   });
// }; 