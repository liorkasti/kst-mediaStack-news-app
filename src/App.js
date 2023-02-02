import React, { useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import { Provider } from 'react-redux';
import AppContainer from './navigation';
import configureStore from './redux/store';

const App = () => {
  console.log('store: ', configureStore)
  const queryClient = new QueryClient()

  useEffect(() => {
    setTimeout(() => { Orientation.lockToPortrait(); });
  });

  return (
    <Provider store={configureStore}>
      <QueryClientProvider client={queryClient}>
        <AppContainer />
      </QueryClientProvider>
    </Provider>
  );
};

export default App