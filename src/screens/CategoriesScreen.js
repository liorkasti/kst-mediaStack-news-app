import React, { useEffect, useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SelectList } from 'react-native-dropdown-select-list';
import { useQuery } from 'react-query';
import MediaCard from '../components/MediaCard';
import { CATEGORIES } from '../constants/categories';
import { fetchData, useFetchMediaStack } from '../hooks/useFetch';
import { fetchFavorites, setFavorites, getData } from '../redux/actions'

const CategoriesScreen = ({ navigation }) => {
  const [newsData, setNewsData] = useState([]);
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

  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites(user))
      // console.log({ user, favorites, loading });
    };
  }, [user]);

  // const onSuccess = (data) => { console.log('data :>> ', data); }
  // const onError = (error) => { console.log('error :>> ', error); }
  // const { isLoading, data, isError, error, isFetching, refresh } = (error) => useFetchMediaStack(selected, 'us', onSuccess, onError);
  // console.log('RQ :>> ', data);
  // console.log(isLoading, isFetching, data);
  // if (isLoading || isFetching) return (
  //   <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
  //     <ActivityIndicator />
  //   </View>
  // );

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