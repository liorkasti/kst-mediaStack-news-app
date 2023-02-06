import { StyleSheet, Text, FlatList, View, useColorScheme } from 'react-native'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites, getData } from '../redux/actions'
import MediaCard from '../components/MediaCard';

const FavoritesScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const emptyList = "Loading...";
  const title = "Please Login for retrieve your stored data";

  const { user, favorites, loading } = useSelector(state => state.reducers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) dispatch(fetchFavorites());
    console.log({ user, favorites, loading });
  }, []);

  const renderItem = item => {
    return (
      <MediaCard data={item} />
    )
  };

  const listEmptyComponent = () => {
    return <Text>{emptyList}</Text>;
  };

  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : 'white' }]}>
        <Text style={styles.title}>{title}</Text>
      </View>
    )
  }
  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : 'white' }]}>
      <FlatList
        keyExtractor={(index, item) => item}
        data={favorites}
        renderItem={renderItem}
        scrollEnabled
        ListEmptyComponent={listEmptyComponent}
      />
    </View>
  )
}

export default FavoritesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    alignContent: 'center',
  },
  title: {
    marginBottom: 30,
    paddingHorizontal: 20,
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
  },
})