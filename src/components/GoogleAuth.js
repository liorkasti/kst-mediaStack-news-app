import React, { useState, useEffect } from "react";
import { StyleSheet, useColorScheme, View, Text, TouchableOpacity } from "react-native";
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-google-signin/google-signin';
import { THEME } from '../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import { storeData, login, logout, addFavorite, setFavorites, setLoading, toggleFavorites } from '../redux/actions';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import { ref, db } from '../constants/firebase.utils';

const GoogleAuth = () => {
    const [userInfo, setUserInfo] = useState();
    const isDarkMode = useColorScheme() === 'dark';

    const dispatch = useDispatch();

    GoogleSignin.configure({
        webClientId: '770326205412-qpsq599n60j6m4g7dhnmgubef0bsrbkf.apps.googleusercontent.com',
    });

    const logoff = () => {
        try {
            auth()
                .signOut()
                .then(() => //TODO: fetchFavorites(), 
                    setUserInfo(null),
                    dispatch(logout()),
                    console.log('User signed out!'));
        } catch (error) {
            console.error(error);
        }
    };

    // auth().onAuthStateChanged((userInfo) => {
    //     if (userInfo) {
    //         setUserInfo(user);
    //         // dispatch(login(userInfo))
    //         dispatch(storeData(user.email, favorites = null));
    //     } else {
    //         setUserInfo(null);
    //         dispatch(logout());
    //     }
    // });

    const onGoogleButtonPress = async () => {
        try {
            const { idToken, user } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            // const result = await firebase.auth().signInWithPopup(provider);

            await GoogleSignin.hasPlayServices();
            if (user) {
                setUserInfo(user);
                dispatch(login(user.email))
                dispatch(setLoading(true))
                // dispatch(storeData(user.email, favorites = null))
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

    if (!userInfo) {
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
                onPress={() => logoff()}
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