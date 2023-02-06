import { View, useColorScheme } from 'react-native';
import React from 'react'

export const useDarkMode = ({ children }) => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View style={{ backgroundColor: isDarkMode ? 'black' : 'white' }}>
            {children}
        </View>
    )
}
