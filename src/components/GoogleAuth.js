import React, { useState, useEffect } from "react";
import { StyleSheet, useColorScheme, View, Text, TouchableOpacity } from "react-native";
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-google-signin/google-signin';
import { THEME } from '../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import { storeData, login, logout, fetchFavorites, setFavorites, setLoading, toggleFavorites } from '../redux/actions';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import { ref, db } from '../constants/firebase.utils';

const GoogleAuth = () => {
    const [userInfo, setUserInfo] = useState();
    const isDarkMode = useColorScheme() === 'dark';
    const { user, favorites, loading } = useSelector(state => state.reducers);
    console.log({ user, favorites, loading });

    const dispatch = useDispatch();

    GoogleSignin.configure({
        webClientId: '770326205412-qpsq599n60j6m4g7dhnmgubef0bsrbkf.apps.googleusercontent.com',
    });

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            dispatch(await logout(dispatch(setLoading(false),
                () => dispatch(fetchFavorites())
            )));
            console.log('User signed out!');
        } catch (error) {
            console.error(error);
        }
    };

    const onGoogleButtonPress = async () => {
        try {
            const { idToken, user } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            await GoogleSignin.hasPlayServices();
            if (user) {
                setUserInfo(user);
                dispatch(await login(user.email,
                    () => dispatch(setLoading(true),
                        () => dispatch(fetchFavorites(user.email))
                )))
            }
            return user;
        } catch (error) {
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

    const signin = async () => {
        try {
            const { idToken, user } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await GoogleSignin.hasPlayServices();
            if (user) {
                console.log("GOOGLE USER", user);
                setUserInfo(user);
                dispatch(login(user))
                // //TODO: fetchFavorites(),
            }
            // const users = await auth().signInWithCredential(googleCredential);
            // users.then((user) => { console.log('user :>> ', user); })

            return user;
        } catch (error) {
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


    if (!userInfo || !loading) {
        return (
            <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : 'white' }]}>
                <GoogleSigninButton
                    onPress={() => onGoogleButtonPress()}
                    title="Google Sign-In"
                    style={styles.btnSocial}
                    color={GoogleSigninButton.Color.Dark}
                    size={GoogleSigninButton.Size.Standard}
                />
            </View>
        )
    } return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : 'white' }]}>
            <TouchableOpacity
                onPress={() => signOut()}
                title="Google Sign-Out"
                color={GoogleSigninButton.Color.Dark}
                size={GoogleSigninButton.Size.Standard}
            >
                <Text style={styles.btnLogout}>
                    Sign-Out
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    btnLogout: {
        textAlign: "right",
        color: THEME.lightCard,
        padding: 10
    },
    btnSocial: {
        width: 110,
        height: 40,
        padding: 10
    },
});

export default GoogleAuth