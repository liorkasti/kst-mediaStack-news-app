import React, { useState } from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity, Dimensions } from "react-native";
import auth from '@react-native-firebase/auth';
import Login from '../components/Login';
import { createStackNavigator } from '@react-navigation/stack';
import TabContainer from './TabContainer';

const Stack = createStackNavigator();

const CustomHeader = ({ navigation }) => {
    const [user, setUser] = useState();

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Text style={styles.headerText}>Menu</Text>
                <Text style={styles.headerText}>Menu</Text>
                <Text style={styles.headerText}>Menu</Text>
                <Text style={styles.headerText}>Menu</Text>
            </TouchableOpacity>
            <LoginScreen />
            <GoogleSigninButton
                onPress={() => onGoogleButtonPress()}
                title="Google Sign-In"
                style={styles.btnSocial}
                color={GoogleSigninButton.Color.Dark}
                size={GoogleSigninButton.Size.Standard}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    headerText: {
        fontSize: 18,
        color: 'black'
    }
});

export default () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Categories"
                component={TabContainer}
                options={{ header: props => <CustomHeader {...props} /> }}
            />
        </Stack.Navigator>
    );
}