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
  ADD_FAVORITE,
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
    case TOGGLE_FAVORITE:
      const favoriteIndex = state.findIndex(
        favorite => favorite.id === payload.id
      );
      if (favoriteIndex === -1) {
        console.log({ action })
        return [...state, payload];
      } else {
        return state.filter(
          console.log({ action }),
          favorite => favorite.id !== payload.id
        );
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
        users: payload
      };
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, payload.item],
      };
    case SET_FAVORITES:
      return {
        ...state,
        favorites: payload.favorites,
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