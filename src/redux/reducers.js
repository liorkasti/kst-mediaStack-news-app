import { ADD_USER } from './types';

const initialState = {
  favorites: [],
};

const reducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_USER:
      const { userName, favorite } = payload;
      console.log('payload :>> ', payload);
      state.favorites.push(payload)
      return { ...state, favorite: state.favorites };

    default:
      return { ...state };
  }
};

export default reducers;
