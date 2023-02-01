import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CategoriesScreen, FavoritesScreen } from '../screens';
import Icon from 'react-native-vector-icons/Fontisto';
import { StyleSheet, Image, Text, View, TouchableOpacity, Dimensions } from "react-native";
import auth from '@react-native-firebase/auth';
import GoogleAuth from '../components/GoogleAuth';
// import Login from '../components/Login';

const CustomHeader = ({ navigation }) => {
    const [user, setUser] = useState();

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Menu</Text>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Text style={styles.headerText}>Menu</Text>
            </TouchableOpacity>
            {/* <GoogleAuth/> */}
            {/* <Login /> */}
            {/* <GoogleSigninButton
                onPress={() => onGoogleButtonPress()}
                title="Google Sign-In"
                style={styles.btnSocial}
                color={GoogleSigninButton.Color.Dark}
                size={GoogleSigninButton.Size.Standard}
            /> */}
        </View>
    );
}

export default () => {
    const Tab = createMaterialBottomTabNavigator();
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Categories"
                    component={CategoriesScreen}
                    options={{
                        headerTitle: props => <CustomHeader {...props} />,
                        // header: props => <CustomHeader {...props} />,
                        tabBarLabel: "Categories",
                        tabBarColor: '#f8f9f9',
                        tabBarIcon: ({ color }) => (
                            <Icon name="world-o" color={color} size={20} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Favorites"
                    component={FavoritesScreen}
                    options={{
                        header: props => <CustomHeader {...props} />,
                        headerTitle: props => <CustomHeader {...props} />,
                        tabBarLabel: 'Favorites',
                        tabBarColor: '#694fad',
                        tabBarIcon: ({ color }) => (
                            <Icon name="favorite" color={color} size={20} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};