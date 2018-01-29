import { applyMiddleware, createStore } from "redux"
import logger from "redux-logger"
import createSagaMiddleware from "redux-saga"
import reducers from "./reducers"
import sagas from "./sagas"
import { persistStore, autoRehydrate } from "redux-persist"
import { AsyncStorage } from "react-native"
import { startLoginScreen, startHomeScreen } from "./../../bootstrap/App"

const sagaMiddleware = createSagaMiddleware()
// Create the glorious store instance.
const store = createStore(reducers, applyMiddleware(logger, sagaMiddleware), autoRehydrate())

function onRehydrate() {
   const currentState = store.getState()
   /*
   if (currentState.auth.accessToken) {
      // Eğer access tokenı varsa
      //setToken(currentState.auth.accessToken)
      startHomeScreen()
   } else {
      // Eğer login değilse
      startLoginScreen()
   }
   */
}
const persist = persistStore(store, { blacklist: ["app"], storage: AsyncStorage }, onRehydrate)

sagaMiddleware.run(sagas)

// Hot reloading thing
if (module.hot) {
   module.hot.accept(() => {
      store.replaceReducer(reducers)
   })
}

export default store
export { persist }
