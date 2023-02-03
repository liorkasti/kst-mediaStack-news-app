import React, { useState, useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import { Provider } from 'react-redux';
import AppContainer from './navigation';
import configureStore from './redux/store';
import GoogleAuth from "./components/GoogleAuth";

const App = () => {
  console.log('store: ', configureStore)
  const queryClient = new QueryClient()

  return (
    <Provider store={configureStore}>
      <QueryClientProvider client={queryClient}>
        <GoogleAuth />
        <AppContainer />
      </QueryClientProvider>
    </Provider>
  );
};

export default App