import {
  START_LOADING,
  FINISH_LOADING,
} from "../actionType";

const initialState = {
  isLoading: false
}

const loading = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FINISH_LOADING: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export default loading;

