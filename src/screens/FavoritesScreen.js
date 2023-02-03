import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const FavoritesScreen = () => {
  const user = useSelector(state => state.user);
  const { loading, favorites } = useSelector(state => state.favorites);
  console.log('user :>> ', user);
  return (
    <View>
      <Text>favoritesScreen</Text>
    </View>
  )
}

export default FavoritesScreen

const styles = StyleSheet.create({})