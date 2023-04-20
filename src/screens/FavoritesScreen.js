import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import MediaCard from '../components/MediaCard';
import { CATEGORIES } from '../constants/categories';

const FavoritesScreen = ({ navigation }) => {
  const [newsData, setNewsData] = useState([]);
  const [category, setCategory] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  const { user, favorites, loading } = useSelector(state => state.reducers);

  const emptyList = "Loading...";
  const title = "Please Sign in for retrieve your stored data";

  //TODO: query filter
  /*   
  const onSuccess = (data) => { setNewsData(data), console.log('onSuccess :>> ', data.map((n) => console.log('n.title :>> ', n.category))); }
    const onError = (error) => { console.log('onError :>> ', error); }
  
    const { isLoading, data, isError, error, isFetching, refresh } = useQuery(
      ['favoritesKeys', category],
      () => fetchFavorites(category), {
      onSuccess,
      onError,
    });
  
    const fetchFavorites = category => {
      return favorites?.filter(
        i =>
          i.category !== category
          || category !== 'all'
      )
    } */


  const fetchFavorites = category => {
    if (category === 'all') {
      setNewsData(favorites)
    } else {
      let filterNews = []
      newsData?.map(
        i =>
          console.log('i.category :>> ', i.category, category) &&
          i.category == category && filterNews.push(i)
        // || category !== 'all'
      )
      setNewsData(filterNews)
    }
  }

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

  if (!loading) return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : 'white' }]}>
      <ActivityIndicator />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : 'white' }]}>
      <SelectList
        setSelected={(val) => setCategory(val)}
        data={CATEGORIES}
        save="value"
        onSelect={() => (fetchFavorites(category))}
        label="Category"
        defaultOption={{ key: '0', value: 'Choose Category' }}
      />
      {favorites ?
        <MediaCard data={newsData} />
        :
        listEmptyComponent()
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
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

export default FavoritesScreen