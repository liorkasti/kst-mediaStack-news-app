import { takeEvery, call, put, select } from 'redux-saga/effects';
import { LOGIN, LOGOUT, ADD_FAVORITE, SET_FAVORITES, TOGGLE_FAVORITE } from '../redux/types';
import { login, logout, addFavorite, setFavorites, setLoading, toggleFavorites } from '../redux/actions';
// import { getFavorites, setFavorites as setFavoritesFirebase } from './firebase';
import { getUser } from './selectors';

function* handleLogin() {
  try {
    // Perform Firebase Google authentication
    // ...

    // Get the user object from Firebase
    const user = yield call(() => {
      // ...
    });

    // Dispatch the login action to update the user in the state
    yield put(login(user));

    // Get the favorites from Firebase
    const favorites = yield call(() => getFavorites(user.uid));

    // Dispatch the setFavorites action to update the favorites in the state
    yield put(setFavorites(favorites));
  } catch (error) {
    // Handle the error
    // ...
  }
}

function* handleLogout() {
  try {
    // Perform Firebase logout
    // ...

    // Dispatch the logout action to remove the user from the state
    yield put(logout());

    // Dispatch the setFavorites action to remove the favorites from the state
    yield put(setFavorites([]));
  } catch (error) {
    // Handle the error
    // ...
  }
}

function* handleAddFavorite(action) {
  try {
    // Get the user from the state
    const user = yield select(getUser);

    // Add the item to Firebase
    yield call(() => setFavoritesFirebase(user.uid, [...favorites, action.item]));

    // Dispatch the addFavorite action to update the favorites in the state
    // yield put(addFavorite(action.item));
    yield put(toggleFavorites(action.item));
  } catch (error) {
    // Handle the error
    // ...
  }
}

function* rootSaga() {
  yield takeEvery(LOGIN, handleLogin);
  yield takeEvery(LOGOUT, handleLogout);
  yield takeEvery(TOGGLE_FAVORITE, handleAddFavorite);
}

export default rootSaga;
