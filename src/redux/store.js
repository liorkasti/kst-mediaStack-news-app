import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

import reducers from './reducers';

const rootReducer = combineReducers({ reducers: reducers })
const middlewares = [thunk, promise];
const composedEnhancer = compose(applyMiddleware(...middlewares));
const configureStore = createStore(rootReducer, composedEnhancer);

export default configureStore;


// import { createStore, applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import rootReducer from './reducers';
// import rootSaga from '../sagas/sagas';

// const sagaMiddleware = createSagaMiddleware();

// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// sagaMiddleware.run(rootSaga);

// export default store;

// import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import promise from 'redux-promise';

// import reducers from './reducers';

// const rootReducer = combineReducers({ reducers: reducers })
// const middlewares = [thunk, promise];
// const composedEnhancer = compose(applyMiddleware(...middlewares));
// const configureStore = () => createStore(rootReducer, composedEnhancer);

// export default configureStore;



// import { createStore, applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import rootReducer from './reducers';
// import watchGoogleSignIn from './sagas/auth';

// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// sagaMiddleware.run(watchGoogleSignIn);

// export default store;