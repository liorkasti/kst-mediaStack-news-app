import React, { useEffect, useState } from 'react';
import { StyleSheet, useColorScheme, View, ActivityIndicator } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useDispatch, useSelector } from 'react-redux';
import MediaCard from '../components/MediaCard';
import { CATEGORIES } from '../constants/categories';
import { fetchFavorites } from '../redux/actions';
import { fetchData, UseFetchMediaStack } from '../hooks/useFetch';
import { API_KEY, BASE_URL, country } from "../constants/api";
import axios from 'axios';
import { useQuery } from 'react-query';
import dummy from '../constants/dummy.json'

const CategoriesScreen = ({ navigation }) => {
  const [newsData, setNewsData] = useState([]);
  const [category, setCategory] = useState([]);
  const isDarkMode = useColorScheme() === 'dark';


  const onSuccess = (data) => { console.log('data :>> ', data); }
  const onError = (error) => { console.log('error :>> ', error); }
  // const { isLoading, data, isError, error, isFetching, refresh } = useQuery(
  //   ['news', category],
  //   () => fetchData(category), {
  //   onSuccess,
  //   onError,
  // });
  const { isLoading, data, isError, error, isFetching, refresh } = //(error) =>
    UseFetchMediaStack(category, onSuccess, onError);
  console.log('RQ :>> ', { isLoading, isFetching }, data);


  const handleSelection = category => {
    console.log('selected :>> ', category)
    setNewsData(data.data)
    // fetchData(category, 'us')
    //   .then(data => {
    //     setNewsData(data.data)
    //   })
    // .catch(error => {
    //   console.log(error);
    // })
  }

  const { user } = useSelector(state => state.reducers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites(user))
    };
    return () => {
      setNewsData([])
    };
  }, [user]);

  if (isLoading || isFetching) return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <ActivityIndicator />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : 'white' }]}>
      <SelectList
        setSelected={(val) => setCategory(val)}
        data={CATEGORIES}
        save="value"
        // onSelect={() => console.log('selected :>> ', category)}
        onSelect={() => handleSelection(category)}
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