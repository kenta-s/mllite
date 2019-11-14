import {
  RECEIVE_ML_MODEL,
} from "../actionType";

const initialState = {
  id: null,
  name: '',
  parameterNames: [],
}

const mlModel = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ML_MODEL: {
      const { id, name, parameterNames } = action.payload
      return {
        ...state,
        id,
        name,
        parameterNames,
      };
    }
    default:
      return state;
  }
}

export default mlModel;
