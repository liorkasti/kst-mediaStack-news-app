import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { CategoriesScreen, FavoritesScreen } from '../screens';
import Icon from 'react-native-vector-icons/Fontisto';

export default () => {
    const Tab = createMaterialBottomTabNavigator();
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Categories"
                    component={CategoriesScreen}
                    options={{
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