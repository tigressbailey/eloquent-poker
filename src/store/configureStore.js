import configureStoreProd, { historyProd } from './configureStore.prod';
import configureStoreDev, { historyDev } from './configureStore.dev';

const configureStore =
  process.env.NODE_ENV === 'production'
    ? configureStoreProd
    : configureStoreDev;

const history =
  process.env.NODE_ENV === 'production' ? historyProd : historyDev;

export { configureStore, history };
