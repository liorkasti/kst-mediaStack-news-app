import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native';
import moment from "moment";
import { THEME } from '../constants/theme'
import LottieView from 'lottie-react-native';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../redux/actions'

const MediaCard = ({ data }) => {
  // const { data: news, isLoading } = useQuery(newsQuery);
  const dispatch = useDispatch();
  const favorites = useSelector(state => state);
  console.log('favorites :>> ', favorites);

    // firebase.initializeApp(FIREBASE_CONFIG);  // Set an initializing state whilst Firebase connects


  // console.log('data :>> ', data.data);

  const toggleHeart = (item) => {
    console.log('item :>> ', item);
    dispatch(dispatch(toggleFavorite(item)));
  }

  return (
      <FlatList
        style={styles.container}
        data={data}
        renderItem={({ item }) => (
          <View>
            <Pressable onPress={() => toggleHeart(item)} style={styles.like}>
              <LottieView
                // progress={progress}
                source={require('../assets/feed_heart.json')}
                style={styles.lottie}
              />
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
              <Text style={styles.summaryText}>{item.description}</Text>
            </View>
            <View style={styles.divider} />
  
          </View>
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
    color: THEME.mediaDark,
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