import {
  TOGGLE_FAVORITE,
  LOGOUT,
  ADD_FAVORITE,
  SET_FAVORITES,
  SET_LOADING
} from './types';

const toggleFavorite = (news) => {
  return { type: 'TOGGLE_FAVORITE', payload: news };
};
// Actions
export const login = (user) => ({
  type: LOGIN,
  user,
});

export const logout = () => ({
  type: LOGOUT,
});

export const addFavorite = (item) => ({
  type: ADD_FAVORITE,
  item,
});

export const setFavorites = (favorites) => ({
  type: SET_FAVORITES,
  favorites,
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  loading,
});