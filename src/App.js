import React, { useState, useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import { Provider } from 'react-redux';
import AppContainer from './navigation';
import configureStore from './redux/store';
import auth from '@react-native-firebase/auth';
import firebase from './firebase.utils';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// import { FIREBASE_CONFIG } from "./constants/firebase.config";

// export const FIREBASE_CONFIG  = {
//   apiKey: "AIzaSyCxmVgy6lTTHnDZfr_UAlZEhFxUW_h79oM",
//   authDomain: "mediastack-news-kasti01.appspot.com",
//   databaseURL: "https://mediastack-news-kasti01.appspot.com",
//   projectId: "mediastack-news-kasti01",
//   storageBucket: "mediastack-news-kasti01.appspot.com",
//   messagingSenderId: "770326205412",
//   appId: "1:770326205412:android:4c6f656cceb94074162df1"
// };

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  // firebase.initializeApp(FIREBASE_CONFIG);  // Set an initializing state whilst Firebase connects
  
  GoogleSignin.configure({
    webClientId: '770326205412-qpsq599n60j6m4g7dhnmgubef0bsrbkf.apps.googleusercontent.com',
  });

  const onGoogleButtonPress = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        console.log("GOOGLE USER", userInfo.user);
      }

      const users = auth().signInWithCredential(googleCredential);
      users.then((user) => { console.log('user :>> ', user); })

      return users;
    } catch {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      }
    }
  }

// useEffect(() => {
//   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//   console.log('subscriber :>> ', subscriber);
//   return subscriber; // unsubscribe on unmount
// }, []);

// if (initializing) return null;


console.log('store: ', configureStore)
const queryClient = new QueryClient()

// useEffect(() => {
//   setTimeout(() => { Orientation.lockToPortrait(); });
// });


return (
  <Provider store={configureStore}>
    <QueryClientProvider client={queryClient}>
    <GoogleSigninButton
                    onPress={() => onGoogleButtonPress()}
                    title="Google Sign-In"
                    // style={styles.btnSocial}
                    color={GoogleSigninButton.Color.Dark}
                    size={GoogleSigninButton.Size.Standard}
                />
                
      <AppContainer />
    </QueryClientProvider>
  </Provider>
);
};

export default App