// asyncDelete.js

import AsyncStorage from '@react-native-async-storage/async-storage';

const asyncDelete = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Item deleted successfully: ${key}`);
  } catch (error) {
    console.error(`Error deleting item ${key}:`, error);
  }
};

export { asyncDelete };
