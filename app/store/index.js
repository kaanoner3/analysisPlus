import { applyMiddleware, createStore } from "redux"

// Redux middlewares.
import thunk from "redux-thunk";
import logger from "redux-logger"

// Reducers.
import reducers from "./reducers"

// Create the glorious store instance.
const store = createStore(reducers, applyMiddleware(logger, thunk))

// Hot reloading thing
if (module.hot) {
  module.hot.accept(() => {
    store.replaceReducer(reducers)
  })
}

export default store
export { reducers }
