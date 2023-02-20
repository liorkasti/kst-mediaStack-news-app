import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { CategoriesScreen, FavoritesScreen } from '../screens';
import Icon from 'react-native-vector-icons/Fontisto';
import { THEME } from '../constants/theme'

export default () => {
    const Tab = createMaterialBottomTabNavigator();
    return (
        <NavigationContainer>
            <Tab.Navigator
                barStyle={{
                    borderTopWidth: 2,
                    borderTopColor: THEME.mediaGreen,
                }}
                activeColor={THEME.mediaLight}
                inactiveColor={THEME.mediaDark}
            >
                <Tab.Screen
                    name="Categories"
                    component={CategoriesScreen}
                    options={{
                        tabBarLabel: "Categories",
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
                        tabBarIcon: ({ color }) => (
                            <Icon name="favorite" color={color} size={20} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}