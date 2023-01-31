import {
  ADD_USER
} from './types';

export const addUser = (userName, favorite) => {
  return {
    type: ADD_USER,
    payload: {
      userName,
      favorite,
    },
  };
};