import { call, put, takeEvery } from 'redux-saga/effects';
import GoogleSignIn from 'react-native-google-signin';
import { GOOGLE_SIGNIN_REQUEST, GOOGLE_SIGNIN_SUCCESS, GOOGLE_SIGNIN_FAILURE } from '../actions/types';

function* googleSignIn() {
  try {
    const user = yield call(GoogleSignIn.signIn);
    yield put({ type: GOOGLE_SIGNIN_SUCCESS, user });
  } catch (error) {
    yield put({ type: GOOGLE_SIGNIN_FAILURE, error });
  }
}

function* watchGoogleSignIn() {
  yield takeEvery(GOOGLE_SIGNIN_REQUEST, googleSignIn);
}

export default watchGoogleSignIn;
