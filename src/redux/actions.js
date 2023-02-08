import firestore from '@react-native-firebase/firestore';
import { ref } from '../constants/firebase.utils';
import {
  FETCH_DATA, LOGIN,
  LOGOUT, SET_LOADING
} from './types';

export const logout = async (callback) => dispatch => {
  ref.doc(null);
  callback ? callback() : null;
  dispatch({
    type: LOGOUT,
  });
}
export const login = async (payload, callback) => dispatch => {
  try {
    ref.doc(payload).set({ favorites: 'recover' }, { merge: true })
    callback ? callback() : null;
    dispatch({
      type: LOGIN,
      payload,
    });
  } catch (error) {
    console.log('login: Something went wrong while fetching from firestore.', error);
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
    ref.doc(payload).set({ favorites: [item, ...favorites] })
    console.log('Store: Something went wrong while fetching from firestore.', error);
  }
}

export const removeData = async (user, favorites, item, callback) => {
  try {
    ref.doc(user).update({
      favorites: favorites.filter(
        i => i.title !== item.title
      )
    })
    // ref.doc(user).update({ favorites: firestore.FieldValue.delete({item}), })
    // await ref.doc(payload).set({ favorites: favorites.slice(item, 1) })
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
        type: FETCH_DATA,
        payload: favorites
          .data()
          .favorites?.sort((a, b) => a.published_at > b.published_at)
      });
    };
  } catch (error) {
    console.log('Something went wrong while fetching from firestore.', error);
  }
};