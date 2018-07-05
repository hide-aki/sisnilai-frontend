import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import rootReducer from './reducers/index'

const logger = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, promise, logger)
)

export default store