// auth_token is stored in two places ... login.js and signup.js
// async_store.js

import AsyncStorage from '@react-native-async-storage/async-storage';

const asyncStore = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log(`Item stored successfully: ${key}`);
  } catch (error) {
    console.error(`Error storing item ${key}:`, error);
  }
};

export { asyncStore };
