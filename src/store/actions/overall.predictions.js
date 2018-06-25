import axios from 'axios';
import { 
  GET_GROUPS, 
  // SAVE_GROUPS_PREDICTION, 
  // SAVE_FINAL_PREDICTION, 
  // SUBMIT_DAILY_PREDICTION 
} from './action.types';
import { composeGroups } from '../../utils/predictions.helper';
import config from '../../config/app.config';

const { api } = config;

const getGroups = () => {
  const resource = api.getGroups;

  return async (dispatch) => {
    try {
      const response = await axios.get(resource);
      const teams = await response.data;
      const groups = await composeGroups(teams);  
      const groupFetchSuccess = groups !== undefined;
      dispatch({
        type: GET_GROUPS,
        payload: {
          groups, groupFetchSuccess
        }
      });
    } catch (e) {
      const errorMessage = e.response.data;
      console.error(errorMessage);
    }
  }
}

export { getGroups };