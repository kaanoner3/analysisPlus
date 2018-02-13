import { applyMiddleware, createStore } from "redux"
import logger from "redux-logger"
import createSagaMiddleware from "redux-saga"
import reducers from "./reducers"
import sagas from "./sagas"
import { persistStore, autoRehydrate } from "redux-persist"
import { AsyncStorage } from "react-native"
import { startLoginScreen, startHomeScreen } from "services/appStartHelper"
import { setToken } from "./../../bootstrap/axios"

const sagaMiddleware = createSagaMiddleware()
// Create the glorious store instance.
const store = createStore(reducers, applyMiddleware(logger, sagaMiddleware), autoRehydrate())
sagaMiddleware.run(sagas)

function onRehydrate() {
   const currentState = store.getState()

   if (currentState.user.token) {
      // Eğer access tokenı varsa
      console.log("persssis hidreyt", currentState.user.token)
      setToken(currentState.user.token)
      startHomeScreen()
   } else {
      console.log("persssis else", currentState.user.token)

      // Eğer login değilse
      startLoginScreen()
   }
}
const persist = persistStore(store, { blacklist: ["app"], storage: AsyncStorage }, onRehydrate)

// Hot reloading thing
if (module.hot) {
   module.hot.accept(() => {
      store.replaceReducer(reducers)
   })
}

export default store
export { persist }
