import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as flashReducer } from 'redux-flash'
import { combineReducers } from "redux";
import mlModels from './reducers/mlModels'
import mlModel from './reducers/mlModel'
import loading from './reducers/loading'
import { createLogger } from "redux-logger";

const loggerMiddleware = createLogger()

const initialState = {
  lastUpdate: 0,
  light: false,
  count: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TICK':
      return {
        ...state,
        lastUpdate: action.lastUpdate,
        light: !!action.light
      }
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      }
    case 'RESET':
      return {
        ...state,
        count: initialState.count
      }
    default:
      return state
  }
}

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    combineReducers({
      reducer,
      mlModels,
      mlModel,
      loading,
    }),
    preloadedState,
    composeWithDevTools(applyMiddleware(
      loggerMiddleware,
    ))
  )
}
