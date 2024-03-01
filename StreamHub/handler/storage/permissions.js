import { PermissionsAndroid, AsyncStorage } from 'react-native';

const STORAGE_KEY = '@MyApp:permissionsGranted';

const requestStoragePermission = async () => {
  try {
    const permissionsGranted = await AsyncStorage.getItem(STORAGE_KEY);
    if (permissionsGranted) {
      console.log('Storage permission already granted');
      return true;
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to your storage for data storage.',
        buttonPositive: 'OK',
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Storage permission granted');
      await AsyncStorage.setItem(STORAGE_KEY, 'true');
      return true;
    } else {
      console.log('Storage permission denied');
      return false;
    }
  } catch (error) {
    console.error('Error requesting storage permission:', error);
    return false;
  }
};

const requestCameraPermission = async () => {
  try {
    console.log('Requesting camera permission...');
    const permissionsGranted = await AsyncStorage.getItem(STORAGE_KEY);
    if (permissionsGranted) {
      console.log('Camera permission already granted');
      return true;
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Permission Request',
        message: 'This app needs permission to access your media library.',
        buttonPositive: 'OK',
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission granted.');
      await AsyncStorage.setItem(STORAGE_KEY, 'true');
      return true;
    } else {
      console.error('Permission denied.');
      return false;
    }
  } catch (error) {
    console.error('Error requesting permission:', error);
    return false;
  }
};

export { requestStoragePermission, requestCameraPermission };
