import {
  SET_LANGUAGE,
} from "../actionType";

const initialState = {
  use: 'ja'
}

const language = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE: {
      return {
        ...state,
        use: action.use,
      };
    }
    default:
      return state;
  }
}

export default language;
