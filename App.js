import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const CategoriesScreen = () =>{
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Categories!</Text>
        </View>
    );
}

const FavoritesScreen = () =>{
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Favorites!</Text>
        </View>
    );
}

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Categories" component={CategoriesScreen} />
                <Tab.Screen name="Favorites" component={FavoritesScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}