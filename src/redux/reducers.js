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

  switch (type) {
    case FETCH_DATA:
      return {
        ...state,
        favorites: payload
      };
    case FILTER_DATA:
      return {
        ...state,
        // favorites: payload
        favorites: state.favorites.filter(
          (item) => item.title === payload.title)
      };
    case LOGIN:
      return {
        ...state,
        user: payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        favorites: []
      };
    case SET_FAVORITES:
      return {
        ...state,
        favorites: null,
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
    case SET_FAVORITES:
      return {
        ...state,
        favorites: payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};

export default reducers;