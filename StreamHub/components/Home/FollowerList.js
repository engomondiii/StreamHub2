// FollowerList.js

import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

const FollowerList = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.followerItem}>
          <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
          <Text>{item.username}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  followerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default FollowerList;
