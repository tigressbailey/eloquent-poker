import { takeLatest, all } from 'redux-saga/effects';
// import { GET_USER_NAME } from '../consts/user';

function* rootSaga() {
  // yield takeLatest(GET_USER_NAME, userRequest);
}

// export const getSagas = () => all([takeLatest(GET_USER_NAME, userRequest)]);
export const getSagas = () => all([]);

export default rootSaga;
