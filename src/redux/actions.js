import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, ADD_USER } from './types';

export const loginRequest = (username, password) => ({
  type: LOGIN_REQUEST,
  payload: { username, password }
});

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: { user }
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: { error }
});

export const addUser = (userName, favorite) => {
  return {
    type: ADD_USER,
    payload: {
      userName,
      favorite,
    },
  };
};