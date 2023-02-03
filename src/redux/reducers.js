import { combineReducers } from 'redux';

import {
  TOGGLE_FAVORITE,
  LOGIN,
  LOGOUT,
  ADD_FAVORITE,
  SET_FAVORITES,
  SET_LOADING
} from './types';

const initialState = {
  user: null,
  favorites: [],
  loading: false,
};

const googleAuthReducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log('payload :>> ', action);
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        user: payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const favoritesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'TOGGLE_FAVORITE':
      const favoriteIndex = state.findIndex(
        favorite => favorite.id === payload.id
      );
      if (favoriteIndex === -1) {
        return [...state, payload];
      } else {
        return state.filter(
          favorite => favorite.id !== payload.id
        );
      }
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, payload.item],
      };
    case 'SET_FAVORITES':
      return {
        ...state,
        favorites: payload.favorites,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: payload.loading,
      };
    default:
      return state;
  }
};

const reducers = combineReducers({
  googleAuth: googleAuthReducer,
  favorites: favoritesReducer,
});

export default reducers;