// const initialState = {
//   user: null,
//   data: []
// };
// const reducer = (state = initialState, action) => {
//   console.log('action :>> ', action);
//   switch (action.type) {
//     case 'LOGIN':
//       return { ...state, user: action.payload };
//     case 'LOGOUT':
//       return { ...state, user: null };
//     case 'SET_DATA':
//       return { ...state, data: action.payload };
//     default:
//       return state;
//   }
// };

import { combineReducers } from 'redux';

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

const initialState = {
  user: null,
  users: [],
  favorites: [],
  loading: false,
};

const reducers = (state = initialState, action) => {
  const { type, payload } = action;
  console.log('payload :>> ', action);
  // console.log({ user, favorites });

  switch (type) {
    case FETCH_DATA:
      return {
        ...state,
        favorites: payload
      };
    case FILTER_DATA:
      return {
        ...state,
        favorites: favorites.filter(
          (item) => item.title === payload)
      };
    case TOGGLE_FAVORITE:
      console.log('TOGGLE_FAVORITE :>> ', payload);
      const favoriteIndex = state.favorites.findIndex(
        favorite => favorite.id === payload.favorites.id
      );
      if (favoriteIndex === -1) {
        console.log('favoriteIndex', favoriteIndex, { action })
        favorites.push([{ ...payload.favorites.article },
        { isFavorite: isFavorite }, { id: Math.floor(Math.random() * 90000) + 10000 }])
        db.collection('users').doc(state.user).update(favorites)
        // return [...state, payload.favorites];
        return {
          ...state,
          favorites: favorites,
        };
      } else {
        console.log('favoriteIndex', favoriteIndex, { action })
        state.filter(
          favorites => payload.favorites.id !== payload.favorites.id
        );
        return {
          ...state,
          favorites: favorites,
        };
      }
    case LOGIN:
      return {
        ...state,
        user: payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    case GETUSER:
      return ({
        ...state, user:
          action.user
      })
    case FETCH_USERS:
      return {
        ...state,
        favorites: payload
      };
    // case FETCH_DATA:
    //   // console.log('payload :>> ', payload);
    //   return {
    //     ...state,
    //     favorites: payload,
    //   };
    case SET_FAVORITES:
      return {
        ...state,
        favorites: payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: payload.loading,
      };
    default:
      return state;
  }
};

export default reducers;