import React ,{useEffect} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {checkAuthentication} from '../../handler/auth/authentication';
import { createTables } from "../../handler/storage/database";
import requestStoragePermission from '../../handler/storage/permissions';

const SetupScreen = ({ navigation }) => {
  const initializeApp = async () => {
    const storagePermissionGranted = await requestStoragePermission();

    if (storagePermissionGranted) {
      // Storage permission granted, proceed with database initialization
      await createTables();
      console.log("Database initialized");
    } else {
      // Storage permission denied, handle accordingly
      console.warn('Storage permission denied');
    }
  };
  useEffect(() => {
    const startApp = async () => {
      // Simulate a delay before navigating to the setup screen
      await initializeApp();

      const authenticated = checkAuthentication();
     
      if (authenticated.success) {
        navigation.navigate('Home');
      };
     };
    startApp();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SH</Text>
      <Text style={styles.title}>
        Get your StreamHub digital computer
      </Text>
      <Text style={styles.subtitle}>
        To seamlessly connect to your StreamHub app and access content anywhere
        on a big monitor screen of your choice.
      </Text>
      <Button
        title="Click Here To Continue"
        onPress={() => navigation.navigate('Welcome')}
        color="darkred" // Red button color
        style={styles.button} // Add this style
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222', // Light dark background color
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'darkred', // Dark red text color
    position: 'absolute',
    top: 16,
    left: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // White text color
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: 'white', // White text color
    marginBottom: 24,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: 'darkred', // Red button background color
    borderRadius: 100, // Rounded corners
  },
});

export default SetupScreen;
