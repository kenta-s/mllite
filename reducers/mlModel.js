import {
  RECEIVE_ML_MODEL,
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
    default:
      return state;
  }
}

export default mlModel;
