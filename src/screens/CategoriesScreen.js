import React, { useEffect, useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SelectList } from 'react-native-dropdown-select-list';
import { useQuery } from 'react-query';
import MediaCard from '../components/MediaCard';
import { CATEGORIES } from '../constants/categories';
import { fetchData, useFetchMediaStack, useNews } from '../hooks/useFetch';
import { fetchFavorites, setFavorites, getData } from '../redux/actions'

const CategoriesScreen = ({ navigation }) => {
  const [newsData, setNewsData] = useState([]);
  const [news, setNews] = useState([]);
  const [selected, setSelected] = useState([]);
  const isDarkMode = useColorScheme() === 'dark';
  const { user, favorites, loading } = useSelector(state => state.reducers);
  const dispatch = useDispatch();

  const handleSelection = category => {
    fetchData(category, 'us')
      .then(data => {
        setNewsData(data.data)
      })
      .catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    handleSelection(selected);
  }, [selected]);

  const memoizedValue = useMemo(() => {
    if (user) {
      dispatch(fetchFavorites(user)).then(setNewsData(favorites));
    }
  })

  useEffect(async () => {
    memoizedValue()
    return () => {
      memoizedValue()
    };
  }, [user]);

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
      <MediaCard data={newsData} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

export default CategoriesScreen;