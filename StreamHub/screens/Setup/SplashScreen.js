import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
 import {checkAuthentication} from '../../handler/auth/authentication';

const SplashScreen = ({ navigation }) => {
  const streamHubRef = useRef(null);
 

  useEffect(() => {
    // Simulate a delay before navigating to the setup screen
    setTimeout(() => {
        navigation.replace('Setup');
    }, 6000); // Delay for 6 seconds

    // Start the animation when the component mounts
    streamHubRef.current.fadeIn(2000); // Fade in over 2 seconds
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SH</Text>
      <Animatable.Text
        ref={streamHubRef}
        style={styles.title}
        animation="fadeIn"
        duration={2000}
        useNativeDriver
      >
        StreamHub
      </Animatable.Text>
      <Text style={styles.subtitle}>Your Digital Album & Livestream Hub</Text>
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
    marginTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'darkred', // Dark red text color
    marginTop: 16,
  },
  subtitle: {
    fontSize: 18,
    color: 'darkred', // Dark red text color
    marginTop: 8,
  },
});

export default SplashScreen;
