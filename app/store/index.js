import { applyMiddleware, createStore } from "redux"

// Redux middlewares.
import logger from "redux-logger"
import createSagaMiddleware from "redux-saga"
// Reducers.
import reducers from "./reducers"
import sagas from "./sagas"
<<<<<<< HEAD
const sagaMiddleware = createSagaMiddleware()
=======

//const sagaMiddleware = createSagaMiddleware()
>>>>>>> 4793eb0842ac953cb2149b947f407f53e2dd2cde
// Create the glorious store instance.
const store = createStore(reducers, applyMiddleware(logger))

//sagaMiddleware.run(sagas)
// Hot reloading thing
if (module.hot) {
    module.hot.accept(() => {
        store.replaceReducer(reducers)
    })
}

export default store
export { reducers }
