import { applyMiddleware, createStore } from "redux"
import logger from "redux-logger"
import createSagaMiddleware from "redux-saga"
import reducers from "./reducers"
import sagas from "./sagas"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
   key: "root",
   storage: storage
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(reducers, applyMiddleware(logger, sagaMiddleware))

sagaMiddleware.run(sagas)

// Hot reloading thing
if (module.hot) {
   module.hot.accept(() => {
      store.replaceReducer(reducers)
   })
}

const persistor = persistStore(store)

export default {
   store,
   persistor
}
