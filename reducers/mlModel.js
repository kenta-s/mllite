import {
  RECEIVE_ML_MODEL,
} from "../actionType";

const initialState = {
  id: null,
  name: '',
}

const mlModel = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ML_MODEL: {
      const { id, name } = action.payload
      return {
        ...state,
        id,
        name,
      };
    }
    default:
      return state;
  }
}

export default mlModel;
