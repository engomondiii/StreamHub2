// UserDetails.js

import axios from 'axios';
import {USER_DETAILS_URL,GET_FOLLOWERS,GET_FOLLOWING} from '../../handler/apiConfig';
import { storeUserData,fetchUserCredentials } from '../storage/database'; // Adjust the path based on your project structure

const getUserProfile = async () => {
  try {
    // Fetch user details using the user details API
    const credentials = await fetchUserCredentials();
    const { authToken } = credentials;
    const response = await axios.get(USER_DETAILS_URL, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });

    if (response.status === 200) {
      // If the request is successful, store user details in the SQLite database
      storeUserData(response.data);
      return response.data;
    } else {
      // Handle the case where fetching user details fails
      console.error('Failed to fetch user details:', response.data);
    }
  } catch (error) {
    // Handle any network or other errors that may occur during the request
    console.error('An error occurred while fetching user details:', error);
  }
};

const updateUserProfile = async (userData) => {
  try {
    const credentials = await fetchUserCredentials();
    const { authToken } = credentials;

    // Create form data to send as a multipart request
    const formData = new FormData();

    // Map specific fields to form data
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('full_name', userData.full_name);

    // Check if the user has selected a new profile image
    if (userData.profileImage && userData.profileImage.startsWith('file://')) {
      const imageUri = userData.profileImage.replace('file://', '');
      const imageFile = {
        uri: imageUri,
        type: 'image/jpeg', // Adjust the type based on the image format
        name: 'profile.jpg', // Adjust the name as needed
      };
      formData.append('profileImage', imageFile);
    }

    // Make the PUT request with form data
    const response = await axios.put(USER_DETAILS_URL, formData, {
      headers: {
        Authorization: `Token ${authToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      console.log('User profile updated successfully');
      getUserProfile(); // Assuming you have a function to fetch and update the user profile
      return response.data;
    } else {
      console.error('Failed to update user profile:', response.data);
    }
  } catch (error) {
    console.error('An error occurred while updating user profile:', error);
  }
};

const followUser = async (username) => {
  try {
    const credentials = await fetchUserCredentials();
    const { authToken } = credentials;

    const response = await axios.post(
      FOLLOW,
      { username: username },
      {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      }
    );

    if (response.status === 200) {
      console.log(`You are now following ${username}`);
      return response.data;
    } else {
      console.error('Failed to follow user:', response.data);
    }
  } catch (error) {
    console.error('An error occurred while following user:', error);
  }
};

const unfollowUser = async (username) => {
  try {
    const credentials = await fetchUserCredentials();
    const { authToken } = credentials;

    const response = await axios.post(
      UNFOLLOW ,{ username: username },
      {},
      {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      }
    );

    if (response.status === 200) {
      console.log(`You have unfollowed ${username}`);
      return response.data;
    } else {
      console.error('Failed to unfollow user:', response.data);
    }
  } catch (error) {
    console.error('An error occurred while unfollowing user:', error);
  }
};

const getFollowers = async () => {
  try {
    const credentials = await fetchUserCredentials();
    const { authToken } = credentials;

    const response = await axios.get(GET_FOLLOWERS, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });

    if (response.status === 200) {
      console.log(response.data)
      return response.data;
    } else {
      console.error('Failed to fetch followers:', response.data);
    }
  } catch (error) {
    console.error('An error occurred while fetching followers:', error);
  }
};

const getFollowing = async () => {
  try {
    const credentials = await fetchUserCredentials();
    const { authToken } = credentials;

    const response = await axios.get(GET_FOLLOWING, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch following:', response.data);
    }
  } catch (error) {
    console.error('An error occurred while fetching following:', error);
  }
};

export { getUserProfile, updateUserProfile, followUser, unfollowUser, getFollowers, getFollowing };

