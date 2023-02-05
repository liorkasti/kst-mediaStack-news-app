import firestore from '@react-native-firebase/firestore';
import { ref, db } from '../constants/firebase.utils';
import {
  TOGGLE_FAVORITE,
  LOGIN,
  LOGOUT,
  ADD_FAVORITE,
  SET_FAVORITES,
  SET_LOADING,
  GETUSER,
  FETCH_USERS
} from './types';

export const toggleFavorite = (user, favorites, item) => {
  db.collection('users').doc(user).update({ favorites: favorites })

  return { type: TOGGLE_FAVORITE, payload };
};

export const login = (payload) => {
  db.collection('users').doc(payload)
  return ({
    type: LOGIN,
    payload,
  });
}

// export const logout = () => ({
//   type: LOGOUT,
// });

export const addFavorite = (item) => ({
  type: ADD_FAVORITE,
  item,
});

export const setFavorites = (favorites) => ({
  type: SET_FAVORITES,
  favorites,
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  loading,
});

const getUser = () => {
  let currentUserUid = auth().currentUser.uid
  return (dispatch) => {
    database()
      .ref(`/users/${currentUserUid}`)
      .once('value')
      .then(snapshot => {
        dispatch({ type: GETUSER, user: snapshot.val() })
      });
  }
}

export const storeData = async (user, favorites, item) => {
  console.log({ user, favorites, item });
  try {
    await db.collection('users').doc(user).update({
      users: firestore.FieldValue.arrayUnion({ user, favorites, item })
    }).then(() => { fetchUsers(); });
  } catch (error) {
    console.log('Something went wrong while storing in firestore.', error);
  }
};

export const fetchUsers = async isFetched => {
  console.log({ user, favorites, item });
  try {
    let user = await db.collection('users').doc(user).get();
    console.log("user:::::::::  ", user);
    return dispatch => {  // TODO: fix warning
      isFetched ? isFetched() : null;
      console.log('isFetched :>> ', user);

      dispatch({
        type: FETCH_USERS,
        payload: favorites
          .data()
        // .users?.sort((a, b) => a.user < b.user)
      });
    };
  } catch (error) {
    console.log('Something went wrong while fetching from firestore.', error);
  }
};
