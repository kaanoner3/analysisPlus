import { applyMiddleware, createStore } from "redux"

// Redux middlewares.
import logger from "redux-logger"
import createSagaMiddleware from "redux-saga"
// Reducers.
import reducers from "./reducers"
import sagas from "./sagas"
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

const sagaMiddleware = createSagaMiddleware()
// Create the glorious store instance.
const store = createStore(reducers, applyMiddleware(logger, sagaMiddleware),autoRehydrate())

const persist = persistStore(store, { storage: AsyncStorage }, onRehydrate);

function onRehydrate() {
    const currentState = store.getState();
    console.log('current state',currentState)
    /*
    if (currentState.auth.accessToken) {
      // Eğer access tokenı varsa
      setToken(currentState.auth.accessToken);
      startHomeScreen();
    } else {
      // Eğer login değilse
      startLoginScreen();
    }
    */
  }
  
sagaMiddleware.run(sagas)
// Hot reloading thing
if (module.hot) {
   module.hot.accept(() => {
      store.replaceReducer(reducers)
   })
}

export default store
export { persist }
