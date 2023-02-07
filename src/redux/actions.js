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

export const setFavorites = (payload) => {
  ref.doc(payload)
  return ({
    type: SET_FAVORITES,
    payload,
  });
}

export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

export const storeData = async (user, favorites, item) => {
  // console.log({ favorites })
  // console.log({ item })
  const favoriteIndex = favorites.findIndex(
    favorite => favorite.title === item.title
  );
  console.log('favoriteIndex', favoriteIndex)
  try {
    if (favoriteIndex < 0) {
      firestore().collection('users').doc(user).update({
        favorites: [item, ...favorites],
      }).then(() => { 
        // fetchFavorites(); 
        setFavorites(user) });
      // return ({
      //     type: FETCH_DATA,
      //     payload: [item, ...favorites]
      //   })
      // })
    }
    else {
      await ref.update({
        favorites: firestore.FieldValue.delete({ item })
      }).then(() => { fetchFavorites(); });
    }
  } catch (error) {
    console.log('Something went wrong while fetching from firestore.', error);
  }
}

export const getData = async (user, favorites, item) => {
  try {
    await ref.update({
      favorites: firestore.FieldValue.arrayUnion(favorites)
    }).then(() => { fetchFavorites(); });
  } catch (e) {
    console.log('Something went wrong while storing in firestore.', error);
  }
};

export const fetchFavorites = async isFetched => {
  try {
    let favorites = await ref.doc('liorkasti@gmail.com').get();
    // console.log('favorites', ref.doc(user).get())
    // console.log(favorites.data());
    console.log('isFetched :>> ', isFetched);
    return dispatch => {  // TODO: fix warning
      isFetched ? isFetched() : null;

      dispatch({
        type: FETCH_USERS,
        payload: favorites
          .data()
          .favorites?.sort((a, b) => a.published_at < b.published_at)
        // .slice(0, 20),
      });
    };
  } catch (error) {
    console.log('Something went wrong while fetching from firestore.', error);
  }
};