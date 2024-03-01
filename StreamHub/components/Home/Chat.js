import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

const chatData = [
  {
    id: 1,
    //profilePicture: require(),
    name: 'User 1',
    lastMessage: 'Hello there!',
    unreadMessages: 2,
  },
  // Add more chat data as needed
];

const Chat = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState();
  const [chats, setChats] = useState(chatData);

  const renderChatItem = ({ item }) => (
    <TouchableOpacity style={styles.chatItem} onPress={() => enterChat(item)}>
      <Image source={item.profilePicture} style={styles.profilePicture} />
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
      {item.unreadMessages > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unreadMessages}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const enterChat = (chat) => {
    // Implement navigation to the chat screen with 'chat' data.
    // You'll need to create a separate ChatScreen component for this.
    navigation.navigate('ChatScreen', { chat });
  };

  const searchChats = () => {
    // Implement chat search logic based on 'searchQuery'.
    // Update 'chats' state with the filtered results.
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>SH</Text> {/* Red text logo */}
        <Text style={styles.chatTitle}>Chat</Text>
        <FontAwesome name="search" size={24} color="black" onPress={searchChats} />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search chats..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderChatItem}
      />
      {/* Add the "New Chat" button and other functionalities */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Light dark background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#1a1a1a',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red', // Red text logo
  },
  chatTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  searchInput: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10, // Round corners
    backgroundColor: 'blue', // Blue chat item background
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // White chat name
  },
  lastMessage: {
    color: 'white', // White last message
  },
  unreadBadge: {
    backgroundColor: 'red', // Red badge background
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: 'white', // White text
    fontWeight: 'bold',
  },
});

export default Chat;
