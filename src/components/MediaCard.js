import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image } from 'react-native';
import moment from "moment";
import { THEME } from '../constants/theme'

const MediaCard = ({ data }) => {
  // console.log('data :>> ', data.data);
  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={({ item }) => (
        <View>
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