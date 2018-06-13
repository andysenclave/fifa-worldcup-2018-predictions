import axios from 'axios';
import { USER_LOGIN, USER_SIGNUP } from './action.types';
import config from '../../config/app.config';

const { api } = config;

export const loginUser = ({ username, password }) => {
  const user = { username, password };
  const resource = api.userlogin;
  return async (dispatch, getState) => {

    try {
      const response = await axios.post(resource, user);
      console.log(response);
      let loginUser = await response.data.results;

      if(loginUser.constructor === Array) {
        const { name, birth_year,   } = loginUser[0];
        if(name === username && birth_year === password) {
          user = {
            name,
            masterAccess: name === masterUser,
            loggedIn: true
          };
          successLogin = true;
        }
      }
    } catch (e) {
      console.error("something went wrong : ", e);
    } finally {
      dispatch({
        type: USER_LOGIN,
        payload: user
      });
      return successLogin;
    }
  };
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT
  });
}; 