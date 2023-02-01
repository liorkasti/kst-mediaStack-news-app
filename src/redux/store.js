import { createStore, combineReducers } from 'redux';
import reducers from './reducers';
const rootReducer = combineReducers({
    reducers: reducers
})
const configureStore = () => createStore(rootReducer);
export default configureStore;

// import { createStore, applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import rootReducer from './reducers';
// import watchGoogleSignIn from '../sagas/auth';

// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// sagaMiddleware.run(watchGoogleSignIn);

// export default store;
