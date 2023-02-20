import React, { useState, useEffect } from 'react';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import { Provider } from 'react-redux';
import AppContainer from './navigation';
import configureStore from './redux/store';
import GoogleAuth from "./components/GoogleAuth";

const App = () => {
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