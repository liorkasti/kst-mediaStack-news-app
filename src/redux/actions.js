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

export const login = (payload) => {
  // console.log('payload :>> ', payload);
  ref.doc(payload)
  return ({
    type: LOGIN,
    payload,
  });
}

// export const logout = () => ({
//   type: LOGOUT,
// });

// export const addFavorite = (payload) => {
//   const { user, favorites } = useSelector(state => state.reducers);

//   const favs = [
//     favorites.push(
//       [{ id: Math.floor(Math.random() * 90000) + 10000 },
//       { isFavorite: true },
//       { article: payload }]
//     )
//   ]
//   console.log({ favs });

//   return ({
//     type: ADD_FAVORITE,
//     payload: favs,
//   })
// };

// export const setFavorites = (favorites) => {
//   ref.doc(payload)
//   return ({
//     type: SET_FAVORITES,
//     favorites,
//   });
// }

export const setLoading = (loading) => ({
  type: SET_LOADING,
  loading,
});

// const getUser = () => {
//   let currentUserUid = auth().currentUser.uid
//   return (dispatch) => {
//     database()
//       .ref(`/users/${currentUserUid}`)
//       .once('value')
//       .then(snapshot => {
//         dispatch({ type: GETUSER, user: snapshot.val() })
//       });
//   }
// }

// export const storeData = async (user, favorites, item) => {
//   // const { user, favorites } = useSelector(state => state.reducers);
//   let currentUserUid = auth().currentUser.uid
//   console.log('currentUserUid :>> ', currentUserUid);
//   const favs = [
//     favorites.push(
//       [{ id: Math.floor(Math.random() * 90000) + 10000 },
//       { isFavorite: true },
//       { article: payload }]
//     )
//   ]
//   console.log({ favs });

//   try {
//     console.log({ user, favorites, item })
//     await ref.doc(user).update({
//       favorites: firestore.FieldValue.arrayUnion({ user, favorites, item })
//     }).then(() => { fetchUsers(); });
//   } catch (error) {
//     console.log('Something went wrong while storing in firestore.', error);
//   }
//   return ({
//     type: ADD_FAVORITE,
//     payload: favs,
//   })
// };

// export const fetchUsers = async isFetched => {
//   console.log({ user, favorites, item });
//   try {
//     let user = await ref.doc(user).get();
//     console.log("user:::::::::  ", user.users);
//     return dispatch => {  // TODO: fix warning
//       isFetched ? isFetched() : null;
//       console.log('isFetched :>> ', user);

//       dispatch({
//         type: FETCH_USERS,
//         payload: { user, favorites, item }
//           .data()
//         // .users?.sort((a, b) => a.user < b.user)
//       });
//     };
//   } catch (error) {
//     console.log('Something went wrong while fetching from firestore.', error);
//   }
// };

export const filterData = (user, favorites, item) => {
  return (dispatch) => {
    try {
      ref.get()
        .then((querySnapshot) => {
          let data = [];
          querySnapshot.forEach((user) => {
            // console.log('item', item)
            data.push({ isFavorite: false, item, ...favorites });
          });
          // console.log('data', data)
          dispatch({ type: FILTER_DATA, payload: data });
        });
    } catch (error) {
      console.log('Something went wrong while storing in firestore.', error);
    }
  };
};

export const storeDataaaaa = async (user, favorites, item) => {
  return (dispatch) => {
    try {
      console.log({ favorites })
      console.log({ item })
      const favoriteIndex = favorites.findIndex(
        favorite => favorite.title === item.title
      );
      // console.log('favoriteIndex', favoriteIndex)
      if (favoriteIndex < 0) {

        // ref.get()
        // .then((querySnapshot) => {
        //   let data = [];
        //   querySnapshot.forEach((user) => {
        //     // console.log('item', item)
        //     data.push({ isFavorite: false, item, ...favorites });
        //   });
        //   // console.log('data', data)
        dispatch({ type: FILTER_DATA, payload: data });
        // });
      } else {
        ref.doc(user).update({
          favorites: [{ isFavorite: true, item }, ...favorites],
        })
        dispatch({
          type: FETCH_DATA, payload: favorites,
        });
      }
    } catch (error) {
      console.log('Something went wrong while storing in firestore.', error);
    }
  };
}

export const storeData = async (user, favorites, item) => {
  console.log({ favorites })
  console.log({ item })
  const favoriteIndex = favorites.findIndex(
    favorite => favorite.title === item.title
  );
  console.log('favoriteIndex', favoriteIndex)
  try {
    if (favoriteIndex < 0) {
      ref.doc(user).update({
        favorites: [{ isFavorite: true, item }, ...favorites],
      })
      return ({
        type: FETCH_DATA,
        payload: [item, ...favorites]
      })
    }
    else {
      await ref.update({
        favorites: firestore.FieldValue.delete({ favorites })
      }).then(() => { fetchFavorites(); });
      // await ref.doc(user).update({
      //   favorites: items
      // })

      // .get().then(querySnapshot => {
      //   querySnapshot.forEach(doc => {
      //     console.log('MedData', doc.data())
      //   })
      // })

      // ref.where(firebase.firestore.FieldPath.documentId(), '=', item).get()
      // ref.doc(user).update({
      //   favorites: ref.doc(user).FieldValue.delete(item)
      // ref.doc(user).delete({
      //   favorites: [item]
      // return ({
      //   type: FILTER_DATA,
      //   payload: item.title
      // })
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
    return dispatch => {  // TODO: fix warning
      isFetched ? isFetched() : null;
      console.log('isFetched :>> ', isFetched);

      dispatch({
        type: FETCH_USERS,
        payload: favorites
          .data()
        .favorites?.sort((a, b) => a.published_at < b.published_at)
        .slice(0, 20),
      });
    };
  } catch (error) {
    console.log('Something went wrong while fetching from firestore.', error);
  }
};