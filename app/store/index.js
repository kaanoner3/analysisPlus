import { applyMiddleware, createStore } from "redux"

// Redux middlewares.
import logger from "redux-logger"
import createSagaMiddleware from "redux-saga"
// Reducers.
import reducers from "./reducers"
import sagas from "./sagas"
const sagaMiddleware = createSagaMiddleware()
// Create the glorious store instance.
const store = createStore(reducers, applyMiddleware(logger, sagaMiddleware))

sagaMiddleware.run(sagas)
// Hot reloading thing
if (module.hot) {
  module.hot.accept(() => {
    store.replaceReducer(reducers)
  })
}

export default store
export { reducers }
