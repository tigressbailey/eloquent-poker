import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import features from './features';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    features,
  });
export default createRootReducer;
