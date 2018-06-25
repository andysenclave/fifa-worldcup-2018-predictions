import { GET_GROUPS } from '../actions/action.types';

const initialState = {
  daily: {},
  overall: {},
  data: {
    groups: [],
    groupsFetchSuccess: false,
  }
};

const newState = (state = initialState, predictions) => {
  return Object.assign({}, state, predictions);
}

const predictionReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case GET_GROUPS: {
      const data = payload;
      const prediction = Object.assign({}, initialState, { data });
      const currentState = newState(state, prediction);
      return currentState;
    }
    default:
      return state;
  }
}

export default predictionReducer;