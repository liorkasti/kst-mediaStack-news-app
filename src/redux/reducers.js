import { combineReducers } from 'redux';

import {
  TOGGLE_FAVORITE,
  LOGOUT,
  LOGIN,
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
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.user,
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
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoriteIndex = state.findIndex(
        favorite => favorite.id === action.payload.id
      );
      if (favoriteIndex === -1) {
        return [...state, action.payload];
      } else {
        return state.filter(
          favorite => favorite.id !== action.payload.id
        );
      }
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.item],
      };
    case 'SET_FAVORITES':
      return {
        ...state,
        favorites: action.favorites,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading,
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