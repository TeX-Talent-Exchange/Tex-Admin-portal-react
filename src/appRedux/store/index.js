import {applyMiddleware, compose, createStore} from 'redux'
import {routerMiddleware} from 'connected-react-router'
import rootSaga from "../sagas"
import createSagaMiddleware from "redux-saga";
import createRootReducer from '../reducers';
import { persistStore } from 'redux-persist';
const createBrowserHistory = require('history').createBrowserHistory;
export const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, routeMiddleware];

// root reducer with router state
const rootReducer = createRootReducer(history); 

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        ...middlewares  
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    ),
  );
  let persistor = persistStore(store)
  sagaMiddleware.run(rootSaga)
  return {store, persistor};
}
