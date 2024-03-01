import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { fetchUserData } from '../../handler/storage/database';
import BASE_URL from '../../handler/apiConfig';
import { getUserMedia } from '../../handler/profile/mediaHandler';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [contentItems, setContentItems] = useState([
    { id: 1, comments: 5, likes: 10, user: { username: 'user1' }, loved: false },
    { id: 2, comments: 3, likes: 8, user: { username: 'user2' }, loved: false },
    //changes
    // Add more content items as needed.
  ]);;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUserData = await fetchUserData();

        if (fetchedUserData) {
          setUserData(fetchedUserData);
          console.log('User details retrieved from the database:', fetchedUserData);
        } else {
          console.log('User details not found in the database');
          // Handle the case when user data is not found
        }
      } catch (error) {
        console.error('Error fetching user data from the database:', error);
      }
    };
    const fetchContent = async () => {
      try {
        const fetchedUserMedia = await getUserMedia();

        if (fetchedUserMedia) {
          setContentItems(fetchedUserMedia);
        } else {
          console.log('User Media not found ... ');
        }
      } catch (error) {
        console.error('Error fetching user Media from the Server:', error);
      }
    };

    fetchData();
    fetchContent()
  }, []);

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const getMediaUrl = (item) => {
    // Assuming base URL is stored somewhere in your app configuration
    console.log(BASE_URL , item.file);
    return item?.file ? `${BASE_URL}${item.file}` : null;
  };
  const getImageUrl = () => {
    // Assuming base URL is stored somewhere in your app configuration
    return userData?.profileImage ? `${BASE_URL}${userData.profileImage}` : null;
  };

  
  const handleLoveClick = (itemId) => {
    // Implement logic to handle love click
  };

  const handleUserProfileClick = (username) => {
    console.log(`Navigating to the profile of ${userData.username}`);
    // Implement navigation logic to navigate to the user's profile
  };




  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    // Update favourites when content items change
    const updatedFavourites = contentItems.filter((item) => item.loved);
    setFavourites(updatedFavourites);

    // Sync favourites with AsyncStorage
    AsyncStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  }, [contentItems]);
  

  useEffect(() => {
    // Retrieve favourites from AsyncStorage on component mount
    const fetchData = async () => {
      const storedFavourites = await AsyncStorage.getItem('favourites');
      if (storedFavourites) {
        setFavourites(JSON.parse(storedFavourites));
      }
    };

    fetchData();
  }, []);




  useEffect(() => {
    // Fetch personalized recommendations based on user's favourites
    const fetchPersonalizedRecommendations = async () => {
      // Implement your logic to fetch personalized content
      // You might want to make an API call to your backend
      // Pass the user's favourites or other relevant data to get personalized recommendations
      // Update the state with the fetched recommendations
    };

    fetchPersonalizedRecommendations();
  }, [favourites]);













  const handleCommentClick = (itemId) => {
    // Implement the logic here to show comments for the selected item.
    // For demonstration purposes, we'll open a modal with sample comments.
    const selectedItem = contentItems.find((item) => item.id === itemId);

    if (selectedItem) {
      // Replace this with your logic to fetch comments for the selected item.
      console.log('Fetching comments for item', itemId);
    }
  };

  const handlePostClick = () => {
    // Navigate to the CreatePost screen
    navigateToScreen('CreatePost');
  };

  // const handleLoveClick = (itemId) => {
  //   const updatedItems = contentItems.map((item) => {
  //     if (item.id === itemId) {
  //       return {
  //         ...item,
  //         loved: !item.loved,
  //         likes: item.loved ? item.likes - 1 : item.likes + 1,
  //       };
  //     }
  //     return item;
  //   });
  //   setContentItems(updatedItems);
  // };

  const handleLikeClick = (itemId) => {
    // Implement the logic to handle the "Like" button click
    const updatedItems = contentItems.map((item) => {
      if (item.id === itemId) {
        const updatedItem = {
          ...item,
          loved: !item.loved,
          likes: item.loved ? item.likes - 1 : item.likes + 1,
        };


        if (updatedItem.loved) {
          notifyUserInteraction('Liked', `Your post was liked by ${item.user.username}`);
        }


        // Update community insights
        updateCommunityInsights(item.user.username, updatedItem.loved);

      

        // Add the item to the user's Favourites if liked
        if (updatedItem.loved) {
          // Check if the item is not already in Favourites
          if (!favourites.some((favItem) => favItem.id === updatedItem.id)) {
            setFavourites([...favourites, updatedItem]);
          }
        } else {
          // Remove the item from Favourites if unliked
          setFavourites((prevFavourites) =>
            prevFavourites.filter((favItem) => favItem.id !== updatedItem.id)
          );
        }

        // Update the category or tag when the item is liked
        if (updatedItem.loved && updatedItem.category !== categoryInput) {
          console.log(`Updating category or tag of item ${itemId} to ${categoryInput}`);
          updatedItem.category = categoryInput;
        }

        return updatedItem;
      }
      return item;

      
    });

    setContentItems(updatedItems);
  };

  const handleFavouritesClick = () => {
    navigation.navigate('Favourites', { favouritesData: favourites });
  };

  // const handleUserProfileClick = (username) => {
  //   console.log(`Navigating to the profile of ${username}`);
  //   // Implement the navigation logic here to navigate to the user's profile.
  //   // navigation.navigate('UserProfile', { username });
  // };

  const renderContentItem = ({ item }) => (
    <View key={item.id} style={styles.contentItem}>
      <View style={styles.contentItemTopRow}>
        <TouchableOpacity
          style={styles.commentButton}
          onPress={() => handleCommentClick(item.id)}
        >
          <FontAwesome name="comment" size={24} color="white" />
          <Text style={styles.buttonTextWhite}>{item.comments} comments</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loveButton}
          onPress={() => handleLikeClick(item.id)}
        >
          <FontAwesome
            name="heart"
            size={24}
            color={item.loved ? 'red' : 'white'}
          />
          <Text style={styles.buttonTextWhite}>{item.likes} like</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.moreOptionsButton}>
          <FontAwesome name="ellipsis-h" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.contentItemProfile}
        onPress={() => handleUserProfileClick(item.user.username)}
      >
        <FontAwesome name="user" size={24} color="white" />
        <Text style={styles.userProfileText}>{item.user.username}</Text>
      </TouchableOpacity>



      <TouchableOpacity
        style={styles.watchedButton}
        onPress={() => handleWatchedClick(item.id)}
      >
        <FontAwesome name="eye" size={24} color={item.watched ? 'green' : 'white'} />
        <Text style={styles.buttonTextWhite}>{item.watched ? 'Watched' : 'Watch'}</Text>
      </TouchableOpacity>

     
      <View style={styles.contentItemProfile}>
      <FontAwesome name="user" size={24} color="white" />
      <Text style={styles.userProfileText}>{item.user.username}</Text>
      <Text style={styles.userProfileText}>
        Liked by {communityInsights[item.user.username] || 0} users
      </Text>
    </View>
    




    <TouchableOpacity
        style={styles.shareButton}
        onPress={() => handleShareClick(item.id)}
      >
        <FontAwesome name="share" size={24} color="white" />
        <Text style={styles.buttonTextWhite}>Share</Text>
      </TouchableOpacity>

      {/* Content Item Content */}
      {/* Add your content item structure here */}
    </View>
  );


  const [viewingHistory, setViewingHistory] = useState([]);
  useEffect(() => {
    // Update viewing history when content items change
    const updatedHistory = contentItems.filter((item) => item.watched);
    setViewingHistory(updatedHistory);
  }, [contentItems]);



  const handleWatchedClick = (itemId) => {
    const updatedItems = contentItems.map((item) => {
      if (item.id === itemId) {
        const updatedItem = {
          ...item,
          watched: true,
        };

        // Notify user when content is watched
        notifyUserInteraction('Watched', `You watched a post by ${item.user.username}`);

        return updatedItem;
      }
      return item;
    });
    setContentItems(updatedItems);
  };




// Function to send a notification
const notifyUserInteraction = (type, message) => {
  NotificationsAPI.scheduleNotificationAsync({
    content: {
      title: type === 'Liked' ? 'New Like' : 'Content Watched',
      body: message,
    },
    trigger: null, // Send immediately
  });
};



const [communityInsights, setCommunityInsights] = useState({});



const updateCommunityInsights = (username, liked) => {
  setCommunityInsights((prevInsights) => {
    const newInsights = { ...prevInsights };

    // Update the number of likes for the user
    if (liked) {
      newInsights[username] = (newInsights[username] || 0) + 1;
    } else {
      // Decrease the number of likes if unliked
      newInsights[username] = Math.max(0, (newInsights[username] || 0) - 1);
    }

    return newInsights;
  });
};



const handleShareClick = (itemId) => {
  const selectedItem = contentItems.find((item) => item.id === itemId);

  if (selectedItem) {
    Share.share({
      message: `Check out this post by ${selectedItem.user.username}: ${yourAppLink}`,
    });
  }
};







  return (
    <View style={styles.container}>
      {/* Custom header section with a dark background */}
      <View style={styles.customHeader}></View>
      <View style={styles.header}>
        <Text style={styles.logo}>SH</Text>
        <TouchableOpacity onPress={() => navigateToScreen('Search')}>
          <AntDesign name="search1" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('RaspberryPi')}>
          <FontAwesome name="desktop" size={24} color="green" />
          <Text style={styles.iconText}>Connection</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('DigitalAlbum')}>
          <FontAwesome name="photo" size={24} color="red" />
          <Text style={styles.iconText}>Album</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Notifications')}>
          <AntDesign name="bells" size={24} color="white" />
        </TouchableOpacity>
      </View>

       {/* Light line box between header and user profile */}
       <View style={styles.lineBox}></View>

      {/* User Profile */}
      <View style={styles.userProfileContainer}>
        <TouchableOpacity onPress={() => navigateToScreen('UserProfile')}>
          {userData && userData.profileImage ? (
            <Image source={{ uri: getImageUrl() }} style={styles.userProfileImage} />
          ) : (
            <FontAwesome name="user" size={40} color="white" />
          )}
        </TouchableOpacity>
        {userData ? (
          <Text style={styles.userProfileText}>{userData.username}</Text>
        ) : (
          <Text style={styles.userProfileText}>No Username</Text>
        )}
      

      {/* Add Settings component */}
      <View style={styles.settingsContainer}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigateToScreen('Settings')}
          >
            <Ionicons name="settings" size={24} color="white" />
            <Text style={styles.iconText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Light line box between user profile and buttons */}
      <View style={styles.lineBox}></View>

      {/* Row of Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => navigateToScreen('GetLive')} style={styles.button}>
          <Text style={styles.buttonTextRed}>Go Live</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFavouritesClick} style={styles.button}>
          <Text style={styles.buttonTextWhite}>Favourites</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePostClick} style={styles.button}>
          <Text style={styles.buttonTextWhite}>Post</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.space} />


   {/* Light line box at the bottom */}
   <View style={styles.lineBox}></View>

   <View style={styles.space} />



      {/* Content Section */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Display Content Items */}
        {contentItems.map((item) => (
          <View key={item.id} style={styles.contentItem}>
            {/* File */}
            {item.file && (
              <Image source={{ uri:getMediaUrl(item) }} style={styles.mediaImage} />
            )}

            {/* Comments
            <View style={styles.commentsContainer}>
              <Text style={styles.sectionTitle}>Comments:</Text>
              {item.comments.map((comment, index) => (
                <Text key={index} style={styles.commentText}>{comment}</Text>
              ))}
            </View> */}

            {/* Likes */}
            {/* {item.likes !== undefined && (
              <View style={styles.likesContainer}>
                <Text style={styles.sectionTitle}>Likes:</Text>
                <Text style={styles.likesText}>{item.likes}</Text>
              </View>
            )} */}

            {/* Tags */}
            {/* <View style={styles.tagsContainer}>
              <Text style={styles.sectionTitle}>Tags:</Text>
              {item.tags.value.map((tag, index) => (
                <Text key={index} style={styles.tagText}>{tag}</Text>
              ))}
            </View> */}

            {/* User */}
            {/* {item.user && (
              <View style={styles.userContainer}>
                <Text style={styles.sectionTitle}>User:</Text>
                <Text style={styles.userText}>{item.user}</Text>
              </View>
            )} */}
          </View>
        ))}
      </ScrollView>

      {/* Bottom Icons */}
      <View style={styles.bottomIcons}>
        <TouchableOpacity onPress={() => navigateToScreen('Home')} style={styles.icon}>
          <AntDesign name="home" size={24} color="white" />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('HotLivestream')} style={styles.icon}>
          <FontAwesome name="fire" size={24} color="red" />
          <Text style={styles.iconText}>Hot</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Chat')} style={styles.icon}>
          <AntDesign name="message1" size={24} color="white" />
          <Text style={styles.iconText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Friends')} style={styles.icon}>
          <FontAwesome name="users" size={24} color="white" />
          <Text style={styles.iconText}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Downloads')} style={styles.icon}>
          <FontAwesome name="download" size={24} color="white" />
          <Text style={styles.iconText}>Downloads</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'red',
  },
  userProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  
  contentItemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  loveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  moreOptionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  contentItemProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonTextWhite: {
    color: 'white',
    marginLeft: 5,
    textAlign: 'center',
  },
  userProfileImage: {
    width: 40, // Adjust the width and height based on your design
    height: 40,
    borderRadius: 20, // Assuming you want a circular image
    marginRight: 10,
  },
  userProfileText: {
    color: 'white',
    marginLeft: 5,
  },
  content: {
    flex: 1,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bottomIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    alignItems: 'center',
  },
  iconText: {
    color: 'white',
  },

  button: {
    flex: 1,
    backgroundColor: '#777',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  buttonTextRed: {
    color: 'red',
    textAlign: 'center',
  },
       
  space: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  customHeader: {
    backgroundColor: '#222', // Dark background color
    padding: 10,
    marginBottom: 10,
  },

  lineBox: {
    borderBottomWidth: 0.2,
    borderBottomColor: '#ddd', // Light line color
    marginBottom: 3,
  },
  
    // Modify the styles for the content section to create a lightboxed effect
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30, // Add bottom padding for separation from the bottom
    flexGrow: 1, // Allow content container to grow and take available space
    marginTop: 10, // Add top margin for separation from the buttons
    paddingVertical: 50,
  },
  contentItem: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)', // Border color for better visibility
  },
  mediaImage: {
    width: '100%',
    height: 500 ,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  
  commentsContainer: {
    marginBottom: 10,
  },

  likesContainer: {
    marginBottom: 10,
  },

  tagsContainer: {
    marginBottom: 10,
  },

  userContainer: {
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },

  commentText: {
    color: 'white',
  },

  likesText: {
    color: 'white',
  },

  tagText: {
    color: 'white',
  },

  userText: {
    color: 'white',
  },

  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  settingsContainer: {
    marginLeft: 'auto', // This will push the Settings component to the far right
  },

});

export default HomeScreen;
