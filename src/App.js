import React from 'react';
import { Provider } from 'react-redux';
import GoogleAuth from "./components/GoogleAuth";
import AppContainer from './navigation';
import configureStore from './redux/store';

const App = () => {
  return (
    <Provider store={configureStore}>
      <GoogleAuth />
      <AppContainer />
    </Provider>
  );
};

export default App