import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';
import { getSagas } from '../sagas';

export const historyDev = createBrowserHistory();

const appReducer = createRootReducer(historyDev);

const rootReducer = (state, action) => {
  const currentState = action.type === 'LOGOUT_SUCCEEDED' ? undefined : state;

  return appReducer(currentState, action);
};

const configureStore = preloadState => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancers = applyMiddleware(
    sagaMiddleware,
    routerMiddleware(historyDev),
  );
  const store = createStore(
    rootReducer,
    preloadState,
    composeWithDevTools(enhancers),
  );

  let sagaTask = sagaMiddleware.run(function* getSagas() {
    yield getSagas();
  });

  if (module.hot) {
    module.hot.accept('../sagas', () => {
      const getNewSagas = getSagas;
      sagaTask.cancel();
      sagaTask = sagaMiddleware.run(function* reloadSaga() {
        yield getNewSagas();
      });
    });
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer.default);
    });
  }

  return { store };
};

export default configureStore;
