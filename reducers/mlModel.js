import {
  RECEIVE_ML_MODEL,
  UPDATE_ML_MODEL_STATUS,
} from "../actionType";

const initialState = {
  id: null,
  name: '',
  status: '',
  parameterNames: [],
}

const mlModel = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ML_MODEL: {
      const { id, name, status, parameterNames } = action.payload
      return {
        ...state,
        id,
        name,
        status,
        parameterNames,
      };
    }
    case UPDATE_ML_MODEL_STATUS: {
      const status = action.status
      return {
        ...state,
        status,
      };
    }
    default:
      return state;
  }
}

export default mlModel;
