// userPreferencesHandler.js

import axios from 'axios';
import { USER_PREFERENCES_URL } from '../apiConfig'; // Adjust the path based on your project structure
import AsyncStorage from '@react-native-async-storage/async-storage';

const updateUserPreferences = async (preferencesData) => {
  try {
    // Get the user's authentication token from AsyncStorage
    const authToken = (await AsyncStorage.getItem('authToken'))?.replace(/['"]+/g, '');

    if (!authToken) {
      console.error('Authentication token not found. User must be logged in.');
      return;
    }

    // Make a PUT request to update user preferences
    const response = await axios.put(USER_PREFERENCES_URL, preferencesData, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });

    if (response.status === 200) {
      console.log('User preferences updated successfully');
      // Optionally, you can handle the response data or return it if needed
      return response.data;
    } else {
      console.error('Failed to update user preferences:', response.data);
    }
  } catch (error) {
    console.error('An error occurred while updating user preferences:', error);
  }
};

export { updateUserPreferences };
