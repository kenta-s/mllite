import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as flashReducer } from 'redux-flash'
import { combineReducers } from "redux";
import mlModels from './reducers/mlModels'
import mlModel from './reducers/mlModel'
import loading from './reducers/loading'
import language from './reducers/language'
import { createLogger } from "redux-logger";
import { middleware as flashMiddleware } from 'redux-flash'

const loggerMiddleware = createLogger()
const flashOptions = { timeout: 3000 }

export const initializeStore = () => {
  return createStore(
    combineReducers({
      mlModels,
      mlModel,
      loading,
      language,
      flash: flashReducer,
    }),
    composeWithDevTools(applyMiddleware(
      loggerMiddleware,
      flashMiddleware(flashOptions),
    ))
  )
}
