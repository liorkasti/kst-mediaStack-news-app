import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useDispatch, useSelector } from 'react-redux';
import MediaCard from '../components/MediaCard';
import { CATEGORIES } from '../constants/categories';
import { fetchFavorites } from '../redux/actions';


const FavoritesScreen = ({ navigation }) => {
  const [newsData, setNewsData] = useState([]);
  const [selected, setSelected] = useState([]);
  const isDarkMode = useColorScheme() === 'dark';

  const { user, favorites, loading } = useSelector(state => state.reducers);
  const dispatch = useDispatch();

  const emptyList = "Loading...";
  const title = "Please Sign in for retrieve your stored data";

  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites(user))
      setNewsData(favorites)
    };
  }, [user, loading]);

  const handleSelection = category => {
    if (category === 'all' || category == 0) {
      setNewsData(favorites)
    } else {
      setNewsData(favorites?.filter(
        i => i.category === category));
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
      {newsData ?
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