import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SelectList } from 'react-native-dropdown-select-list';
import { useQuery } from 'react-query';
import MediaCard from '../components/MediaCard';
import { CATEGORIES } from '../constants/categories';
import { fetchData, useFetchMediaStack } from '../hooks/useFetch';
import { fetchFavorites, setFavorites, getData } from '../redux/actions'


const FavoritesScreen = ({ navigation }) => {
  const [newsData, setNewsData] = useState([]);
  const [selected, setSelected] = useState([]);
  const isDarkMode = useColorScheme() === 'dark';
  const { user, favorites, loading } = useSelector(state => state.reducers);
  const emptyList = "Loading...";
  const title = "Please Sign in for retrieve your stored data";

  const dispatch = useDispatch();

  const handleSelection = category => {
    if (user) {
      dispatch(fetchFavorites(user)).then(setNewsData(favorites))
    }
    console.log({ user, favorites, loading })
  }

  useEffect(() => {
    handleSelection(selected);
  }, [selected]);

  useEffect(() => {
    if (user) dispatch(fetchFavorites(user));
    // console.log({ user, favorites, loading });
  }, []);

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
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={CATEGORIES}
        save="value"
        onSelect={() => handleSelection(selected)}
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