import React, { useEffect, useState } from 'react';
import { StyleSheet, useColorScheme, View, ActivityIndicator } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useDispatch, useSelector } from 'react-redux';
import MediaCard from '../components/MediaCard';
import { CATEGORIES } from '../constants/categories';
import { fetchFavorites } from '../redux/actions';
import { fetchData, useFetchMediaStack } from '../hooks/useFetch';
import { API_KEY, BASE_URL, country } from "../constants/api";
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import dummy from '../constants/dummy.json'
import newsKeys from '../constants/queryKeys'

const CategoriesScreen = ({ navigation }) => {
  const [newsData, setNewsData] = useState([]);
  const [category, setCategory] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  const queryClient = useQueryClient();
  const onSuccess = (data) => { setNewsData(data.data), console.log('onSuccess :>> '); }
  const onError = (error) => { console.log('onError :>> ', error); }
  const { isLoading, data, isError, error, isFetching, refresh } = useQuery(
    ['news', category],
    () => fetchData(category), {
    onSuccess,
    onError,
  });
  // const { isLoading, data, isError, error, isFetching, refresh } = 
  //   useFetchMediaStack(category, onSuccess, onError);
  console.log('RQ :>> ', { isLoading, isFetching }
    // data?.data.map((n) => console.log('n.title :>> ', n.category))
  );


  const handleSelection = category => {
    // console.log('selected :>> ', category)

    // fetchData(category, 'us')
    //   .then(data => {
    //     setNewsData(data.data)
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
  }

  useEffect(() => {
    queryClient.prefetchQuery(
      ['news', category],
      () => useFetchMediaStack(category, onSuccess, onError))
  }, [category, queryClient])


  const { user } = useSelector(state => state.reducers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites(user))
    };
    // return () => {
    //   setNewsData([])
    // };
  }, [user]);

  if (isLoading || isFetching) return (
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
        // onSelect={() => handleSelection(category)}
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