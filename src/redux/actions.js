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

export const logout = async (callback) => dispatch => {
  // console.log('payload :>> ', payload);
  ref.doc(null);
  callback ? callback() : null;
  dispatch({
    type: LOGOUT,
  });
}
export const login = async (payload, callback) => dispatch => {
  try {
    // console.log('payload :>> ', payload);
    ref.doc(payload);
    callback ? callback() : null;
    dispatch({
      type: LOGIN,
      payload,
    });
  } catch (error) {
    console.log('Remove: Something went wrong while fetching from firestore.', error);
  }
}

export const setLoading = (payload, callback) => dispatch => {
  callback ? callback() : null;
  dispatch({
    type: SET_LOADING,
    payload,
  });
}

export const storeData = async (user, favorites, item, callback) => {
  try {
    await ref.doc(user).update({
      favorites: [item, ...favorites],
    })
    callback ? callback() : null;
  } catch (error) {
    console.log('Store: Something went wrong while fetching from firestore.', error);
  }
}

export const removeData = async (user, favorites, item, callback) => {
  try {
    await ref.doc(user).update({
      // [favorites]: firestore().FieldValue.delete()
      // [`favorites.${item}`]: firestore().FieldValue.delete()
      favorites: firestore().FieldValue.delete({ item })
    })
    callback ? callback() : null;
  } catch (error) {
    console.log('Remove: Something went wrong while fetching from firestore.', error);
  }
}

export const fetchFavorites = async (user, didLoad) => {
  try {
    let favorites = await ref.doc(user).get();
    return dispatch => {
      didLoad ? didLoad() : null;
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

export async function fetch(user, dispatch) {
  let favorites = await ref.doc(user).get();
  dispatch({
    type: FETCH_USERS,
    payload: favorites
      .data()
      .favorites?.sort((a, b) => a.published_at > b.published_at)
  });
}
