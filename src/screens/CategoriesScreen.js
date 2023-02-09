import React, { useEffect, useState } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useDispatch, useSelector } from 'react-redux';
import MediaCard from '../components/MediaCard';
import { CATEGORIES } from '../constants/categories';
import { fetchData } from '../hooks/useFetch';
import { fetchFavorites } from '../redux/actions';

const CategoriesScreen = ({ navigation }) => {
  const [newsData, setNewsData] = useState([]);
  const [selected, setSelected] = useState([]);
  const isDarkMode = useColorScheme() === 'dark';

  const { user } = useSelector(state => state.reducers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites(user))
    };
  }, [user]);

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
  }, [selected])

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