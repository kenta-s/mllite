import { 
  RECEIVE_ML_MODELS,
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
    default:
      return state;
  }
}

export default mlModels;
