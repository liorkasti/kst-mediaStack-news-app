import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import GoogleSignIn from 'react-native-google-signin';
import { GOOGLE_SIGNIN_REQUEST } from '../actions/types';

function Login({ dispatch }) {
  useEffect(() => {
    GoogleSignIn.configure();
  }, []);

  const handleGoogleSignIn = async () => {
    dispatch({ type: GOOGLE_SIGNIN_REQUEST });
  };

  return (
    <View style={styles.container}>
        <Text>cacacadcad</Text>
      <GoogleSignInButton onPress={handleGoogleSignIn} />
    </View>
  );
}

export default connect()(Login);
