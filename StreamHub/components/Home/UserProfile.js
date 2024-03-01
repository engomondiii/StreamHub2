// UserProfile.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import BASE_URL from '../../handler/apiConfig';
import { useNavigation } from '@react-navigation/native';
import { logoutUser } from '../../handler/auth/authentication';
import {
  getUserProfile,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} from '../../handler/profile/userDetails';
import FollowerList from './FollowerList';

const UserProfile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    username: '',
    name: '',
    bio: '',
    posts: 0,
    profileImage: '',
  });
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(true);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    fetchUserData();
    fetchFollowers();
    fetchFollowing();
  }, []);

  const fetchUserData = async () => {
    try {
      const userData = await getUserProfile();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchFollowers = async () => {
    try {
      const followersData = await getFollowers();
      setFollowers(followersData);
    } catch (error) {
      console.error('Error fetching followers:', error);
    }
  };

  const fetchFollowing = async () => {
    try {
      const followingData = await getFollowing();
      setFollowing(followingData);
      setIsFollowing(
        followingData.some((user) => user.username === user.username)
      );
    } catch (error) {
      console.error('Error fetching following:', error);
    }
  };

  const getImageUrl = () => {
    return user?.profileImage ? `${BASE_URL}${user.profileImage}` : null;
  };

  const goToEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(user.username);
        setIsFollowing(false);
        fetchFollowers();
      } else {
        await followUser(user.username);
        setIsFollowing(true);
        fetchFollowers();
      }
    } catch (error) {
      console.error('Error toggling follow status:', error);
    }
  };

  const handleLogout = async () => {
    logoutUser();
    navigation.navigate('Login');
  };

  const toggleFollowersVisibility = () => {
    setShowFollowers(!showFollowers);
    setShowFollowing(!showFollowing);

  };

  const toggleFollowingVisibility = () => {
    setShowFollowing(!showFollowing);
    setShowFollowers(!showFollowers);

  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          {/* Profile Image */}
          <Image source={{ uri: getImageUrl() }} style={styles.profileImage} />

          {/* Username */}
          <Text style={styles.username}>{user.username}</Text>

          {/* Name */}
          <Text style={styles.name}>{user.name}</Text>

          {/* Bio */}
          <Text style={styles.bio}>{user.bio}</Text>

          {/* Followers and Following */}
          <View style={styles.followContainer}>
            <TouchableOpacity onPress={toggleFollowersVisibility} style={styles.followButton}>
              <Text style={styles.followButtonText}>Followers: {followers.length}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleFollowingVisibility} style={styles.followButton}>
              <Text style={styles.followButtonText}>Following: {following.length}</Text>
            </TouchableOpacity>
          </View>

          {/* Show Followers */}
          {showFollowers && (
          <FlatList
            horizontal={true}
            data={followers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.followerItem}>
                <Image
                  source={{ uri: `${BASE_URL}${item.profileImage}` }}
                  style={styles.followerImage}
                />
                <Text style={styles.followerName}>{item.username}</Text>
              </View>
            )}
          />
        )
        }

          {/* Show Following */}
          {showFollowing && (
            <FlatList
              horizontal={true}
              data={following}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.followerItem}>
                  <Image source={{ uri: `${BASE_URL}${item.profileImage}` }} style={styles.followerImage} />
                  <Text style={styles.followerName}>{item.username}</Text>
                </View>
              )}
            />
          )}
        </View>

        {/* User Activity */}
        <View style={styles.activityContainer}>
          {/* Display user activity, posts, comments, etc. */}
          {/* You can map through the user's activities and display them here */}
        </View>

        {/* Posts and Content */}
        <View style={styles.postsContainer}>
          {/* Display user's posts */}
          {/* You can map through the user's posts and display them here */}
        </View>
      </ScrollView>

      {/* Settings Button */}
      <TouchableOpacity onPress={goToEditProfile} style={styles.settingsButton}>
        <Text style={styles.settingsButtonText}>Settings</Text>
        <Entypo name="chevron-right" size={24} color="black" />
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  name: {
    fontSize: 16,
  },
  bio: {
    fontSize: 14,
    marginTop: 10,
  },
  followContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  followButton: {
    flex: 1,
    backgroundColor: 'blue', // Adjust the color as needed
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  followerItem: {
    paddingTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 5,
  },
  followerImage: {
    width: 60, // Adjust the width as needed
    height: 60, // Adjust the height as needed
    borderRadius: 30,
    marginRight: 10,
  },
  followerName: {
    fontSize: 14, // Adjust the font size as needed
    textAlign: 'center', // Center the text below the image
  },
  activityContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  postsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  settingsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    padding: 15,
    borderRadius: 5,
    margin: 20,
  },
  settingsButtonText: {
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserProfile;
