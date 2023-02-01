import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useQuery } from 'react-query';
// import GoogleAuth from '../components/GoogleAuth';
import MediaCard from '../components/MediaCard';
import { CATEGORIES } from '../constants/categories';
import { fetchData, useFetchMediaStack } from '../hooks/useFetch';

const CategoriesScreen = ({ navigation }) => {
  const [newsData, setNewsData] = useState([]);
  const [selected, setSelected] = useState([]);


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
    <View style={styles.container}>
      {/* <GoogleAuth /> */}
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
    // backgroundColor: 'gray'
  },
});

export default CategoriesScreen;