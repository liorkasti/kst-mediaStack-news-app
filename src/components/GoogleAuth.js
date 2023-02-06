import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import { THEME } from '../constants/theme'
import database from '@react-native-firebase/firestore';

const GoogleAuth = () => {

    const [user, setUser] = useState('');

    const [loaded, setLoaded] = useState(false);

    const currentUser = auth().currentUser;

    const logoff = () => {

        auth()
            .signOut()
            .then(() => {
                fetchFavorites();
                setLoaded(false);
                console.log('User signed out!');
            });
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