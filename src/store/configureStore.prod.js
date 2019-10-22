import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';
import rootSaga from '../sagas';

export const historyProd = createBrowserHistory();

const appReducer = createRootReducer(historyProd);

const rootReducer = (state, action) => {
  const currentState = action.type === 'LOGOUT_SUCCEEDED' ? undefined : state;

  return appReducer(currentState, action);
};

const configureStore = preloadState => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancers = applyMiddleware(
    sagaMiddleware,
    routerMiddleware(historyProd),
  );
  const store = createStore(rootReducer, preloadState, enhancers);

  sagaMiddleware.run(rootSaga);

  return { store };
};

export default configureStore;
