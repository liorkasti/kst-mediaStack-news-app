import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-google-signin/google-signin';
import { THEME } from '../constants/theme'
import auth from '@react-native-firebase/auth';
// import { firebase } from '../constants/firebase.utils'
// import firebase from 'firebase';

const GoogleAuth = () => {
    GoogleSignin.configure({
        webClientId: '770326205412-uqhusi42qtjko4q8n9h2kfo4je9kfk88.apps.googleusercontent.com',
    });
    const [user, setUser] = useState('');

    const [loaded, setLoaded] = useState(false);

    const currentUser = auth().currentUser;
    const config = {
        apiKey: "AIzaSyCxmVgy6lTTHnDZfr_UAlZEhFxUW_h79oM",
        authDomain: "mediastack-news-kasti01.appspot.com",
        databaseURL: "https://mediastack-news-kasti01.appspot.com",
        projectId: "mediastack-news-kasti01",
        storageBucket: "mediastack-news-kasti01.appspot.com",
        messagingSenderId: "770326205412",
        appId: "1:770326205412:android:4c6f656cceb94074162df1"
    };

    firebase.initializeApp(config);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    const logoff = () => {
        auth()
            .signOut()
            .then(() => props.fetchFavorites(), console.log('User signed out!'));
    }

    onAuthStateChanged = (user) => {
        wait(200).then(() => (
            setUser(user), fetchFavorites())
        );
    }


    onGoogleButtonPress = async () => {
        try {
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            if (userInfo) {
                console.log("GOOGLE USER", userInfo.user);
            }
            return auth().signInWithCredential(googleCredential);
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

    if (!loaded) {
        return (
            <View>
                <GoogleSigninButton
                    onPress={() => onGoogleButtonPress()}
                    title="Google Sign-In"
                    style={styles.btnSocial}
                    color={GoogleSigninButton.Color.Dark}
                    size={GoogleSigninButton.Size.Standard}
                />
            </View>
        );
    } return (
        <>
            {props.componentIndex === 0 &&
                <View style={styles.profileContainer}>
                    < Image
                        source={{ uri: user.photoURL }}
                        style={styles.profileImg}
                        resizeMode='cover'
                    />
                    <Text style={styles.prompt}>Welcome {user.displayName}</Text>
                    <TouchableOpacity
                        title="Logout"
                        onPress={() => logoff()}
                        style={styles.btnLogout}
                    >
                        <Text style={styles.btnTitle}>Logout</Text>
                    </TouchableOpacity>
                </View>
            }
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    profileContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        width: '80%',
    },
    btnLogout: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 30,
        // margin: 40,
        color: 'white',
        backgroundColor: THEME.lightCard,
    },
    prompt: { flexDirection: 'row', flexWrap: 'wrap', color: 'white', padding: 5 },
    btnTitle: { width: 60, color: THEME.favorite, padding: 5 },
    btnSocial: { width: 110, height: 40, padding: 5 },
    profileImg: {
        height: 50,
        width: 50,
        padding: 10,
        borderRadius: 40,
    },
});
export default GoogleAuth