import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import userReducer from './user';
import predictionReducer from './predictions';

export default combineReducers({
  router: routerReducer,
  user: userReducer,
  prediction: predictionReducer
});