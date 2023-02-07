import firestore from '@react-native-firebase/firestore';
// import firebase from 'firebase';
import { doc, updateDoc, deleteField } from '@react-native-firebase/firestore';

import { ref, user } from '../constants/firebase.utils';
import {
  TOGGLE_FAVORITE,
  LOGIN,
  LOGOUT,
  FETCH_DATA,
  FILTER_DATA,
  SET_FAVORITES,
  SET_LOADING,
  GETUSER,
  FETCH_USERS
} from './types';
import { useDispatch, useSelector } from 'react-redux';

export const toggleFavorite = (payload) => {

  const { user, favorites } = useSelector(state => state.reducers);
  console.log('toggleFavorite :>> ', { payload }, { user, favorites });
  // console.log(user, [{ ...favorites },
  // { id: Math.floor(Math.random() * 90000) + 10000 },
  // { isFavorite: isFavorite },
  // { article: payload },]);

  ref.doc(user).update([
    { ...favorites },
    { id: Math.floor(Math.random() * 90000) + 10000 },
    { isFavorite: isFavorite },
    { article: payload },
  ])
  return { type: TOGGLE_FAVORITE, payload };
};

export const logout = () => {
  // console.log('payload :>> ', payload);
  ref.doc(null);
  return ({
    type: LOGOUT,
  });
}
export const login = (payload) => {
  // console.log('payload :>> ', payload);
  ref.doc(payload);
  return ({
    type: LOGIN,
    payload,
  });
}

export const setFavorites = async (payload) => {
  let data = ref.doc(payload)
  console.log('data :>> ', data);
  return ({
    type: SET_FAVORITES,
    payload: data,
  });
}

export const getData = async (user, favorites, item) => {
  try {
    await ref.doc(user).update({
      favorites: [item, ...favorites],
      // favorites: firestore.FieldValue.arrayUnion(favorites)
    }).then(() => { fetchFavorites(user); });
  } catch (error) {
    console.log('Something went wrong while storing in firestore.', error);
  }
};

export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

export const storeData = async (user, favorites, item) => {
  try {
    await firestore().collection('users').doc(user).update({
      favorites: [item, ...favorites],
    }).then(() => {
      fetchFavorites(user);
    });
  } catch (error) {
    console.log('Something went wrong while fetching from firestore.', error);
  }
}

export const removeData = async (user, favorites, item) => {
  try {
    await firestore().collection('users').doc(user).update({
      // [favorites]: firestore().FieldValue.delete()
      [`favorites.${item}`]: firestore().FieldValue.delete()
      // favorites: firestore().FieldValue.delete({item})
    }).then(() => {
      fetchFavorites(user);
    })
  } catch (error) {
    console.log('Something went wrong while fetching from firestore.', error);
  }
}

// export const filterFavorites = async (user) => {
//   try {
//     let favorites = await ref.doc(user).get();
//     return dispatch => {  // TODO: fix warning

//       dispatch({
//         type: FILTER_DATA,
//         payload: favorites
//           .data()
//           .favorites?.sort((a, b) => a.published_at > b.published_at)
//       });
//     };
//   } catch (error) {
//     console.log('Something went wrong while fetching from firestore.', error);
//   }
// };

export const fetchFavorites = async (user) => {
  try {
    let favorites = await ref.doc(user).get();
    return dispatch => {
      dispatch({
        type: FETCH_USERS,
        payload: favorites
          .data()
          .favorites?.sort((a, b) => a.published_at > b.published_at)
      });
    };
  } catch (error) {
    console.log('Something went wrong while fetching from firestore.', error);
  }
};