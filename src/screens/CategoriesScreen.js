import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import MediaCard from '../components/MediaCard';
import { CATEGORIES } from '../constants/categories';
import { fetchData } from '../hooks/useFetch';
import { fetchFavorites } from '../redux/actions';

const CategoriesScreen = ({ navigation }) => {
  const [newsData, setNewsData] = useState([]);
  const [category, setCategory] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  const onSuccess = (data) => { setNewsData(data.data), console.log('onSuccess :>> '); }
  const onError = (error) => { console.log('onError :>> ', error); }

  const { isLoading, data, isError, error, isFetching, refresh } = useQuery(
    ['news', category],
    () => fetchData(category), {
    onSuccess,
    onError,
  });
  // TODO: fix hook:
  // const { isLoading, data, isError, error, isFetching, refresh } = 
  //   useFetchMediaStack(category, onSuccess, onError);
  // console.log('RQ :>> ', { isLoading, isFetching });

  const { user } = useSelector(state => state.reducers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites(user))
    };
  }, [user, newsData]);

  if (isLoading) return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : 'white' }]}>
      <ActivityIndicator />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : 'white' }]}>
      <SelectList
        setSelected={(val) => val === 0 ? setCategory('') : setCategory(val)}
        data={CATEGORIES}
        placeholder='Select Category'
        save="value"
        label="Category"
        defaultOption={{ key: category, value: category }}
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