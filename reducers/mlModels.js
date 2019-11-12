import {
  RECEIVE_ML_MODELS,
  ADD_ML_MODEL,
} from "../actionType";

const initialState = {
  data: [],
}

const mlModels = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ML_MODELS: {
      const data = action.payload
      return {
        ...state,
        data,
      };
    }
    case ADD_ML_MODEL: {
      const data = [...state.data, action.payload]
      return {
        ...state,
        data,
      };
    }
    default:
      return state;
  }
}

export default mlModels;
