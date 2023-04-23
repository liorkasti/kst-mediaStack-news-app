import { FETCH_DATA, LOGIN, LOGOUT, SET_LOADING } from './types';

const initialState = {
  user: null,
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