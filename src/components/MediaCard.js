import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Alert, useColorScheme, Image } from 'react-native';
import moment from "moment";
import { THEME } from '../constants/theme'
import LottieView from 'lottie-react-native';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite, storeData, removeData, filterData, fetchFavorites } from '../redux/actions'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ref } from '../constants/firebase.utils';
import Icon from 'react-native-vector-icons/Fontisto';
import { useRoute } from '@react-navigation/native';

const MediaCard = ({ data }) => {
  const [booked, setBooked] = useState(false);
  // const { data: news, isLoading } = useQuery(newsQuery);
  const isDarkMode = useColorScheme() === 'dark';
  const route = useRoute();

  const dispatch = useDispatch();
  const { user, favorites, loading } = useSelector(state => state.reducers);
  // console.log('MediaCard>> ', { user, favorites, loading });

  const toggle = async (item) => {
    if (user) {
      const favoriteIndex = favorites.findIndex(
        favorite => favorite.title === item.title
      )
      console.log('Index :>> ', favoriteIndex);
      if (favoriteIndex < 0) {
        setBooked(true)
        dispatch(storeData(user, favorites, item,
          () => dispatch(fetchFavorites(user))))
      } else {
        setBooked(false)
        //TODO: Fix remove
        dispatch(removeData(user, favorites, item,
          () => dispatch(fetchFavorites(user))))
      }
    } else { Alert.alert('Oops!', 'Please sign in first.') }
  }

  const renderCardItem = (item) => {
    const favoriteIndex = favorites.findIndex(
      favorite => favorite.title === item.title
    )
    let isBooked = false
    if (favoriteIndex < 0) {
      isBooked = false
    } else {
      isBooked = true
    }
    if (route === 'Favorites') {
      isBooked = true
      console.log({ isBooked, routere });
    }
    setBooked(isBooked)

    return (
      <View>
        <Pressable onPress={() => toggle(item)} style={styles.like}
          hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
        >
          {isBooked + booked ?
            <Icon name='bookmark-alt' style={styles.iconActive} />
            :
            <Icon name='bookmark' style={styles.icon} />
          }
        </Pressable>
        <Text style={styles.articleTitle}>{item.title}</Text>
        <Text style={styles.date}>{item.category}</Text>
        <View style={styles.newsContainer}>
          {item.image && (
            <Image
              source={{ uri: item.image }}
              style={styles.imagePoster}
              resizeMode='cover'
            />
          )}
          <Text style={styles.author}>{item.author}</Text>
          <Text style={styles.date}>
            {moment(item.published_at).format("LLL")}
          </Text>
          <Text style={[styles.summaryText, { color: isDarkMode ? THEME.mediaLight : THEME.darkBkg }]}>{item.description}</Text>
        </View>
        <View style={styles.divider} />
      </View >
    );
  };

  return (
    <FlatList
      style={[styles.container, { backgroundColor: isDarkMode ? 'black' : 'white' }]}
      data={data}
      renderItem={({ item }) => (
        renderCardItem(item)
      )}
      keyExtractor={(item) => item.url}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  like: {
    position: 'absolute',
    start: 5,
    top: 5,
  },
  lottie: {
    height: 35,
  },
  icon: {
    backgroundColor: 'transparent',
    // color: '#fff',
    fontSize: 24,
    opacity: 0.8
  },
  iconActive: {
    backgroundColor: 'transparent',
    color: THEME.favorite,
    fontSize: 24,
    opacity: 0.8
  },
  articleTitle: {
    color: THEME.mediaGreen,
    marginVertical: 30,
    paddingHorizontal: 20,
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  summaryText: {
    textAlign: "justify",
    fontWeight: '300',
    fontSize: 18,
    marginVertical: 30,
  },
  imagePoster: {
    resizeMode: 'contain',
    width: '100%',
    height: 250,
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: THEME.mediaLight
  },
  itemContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#01b4e4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    fontWeight: '300',
    color: THEME.mediaLight
  },
  date: {
    fontSize: 14,
    fontWeight: '400',
  },
});

export default MediaCard