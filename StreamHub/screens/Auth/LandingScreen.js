import React,{useEffect} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { checkAuthentication } from '../../handler/auth/authentication';

const LandingScreen = ({ navigation }) => {
  
  useEffect(() => {
    // Check if the user is already logged in and has a token stored
    checkLoggedIn();
  }, []);

  const checkLoggedIn =  async() => {
    const authenticationResult = await checkAuthentication();
    if (authenticationResult.success) {
      // If a token exists, navigate to the Home screen
      navigation.navigate('Home');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SH</Text>
      <Text style={styles.title}>Welcome to StreamHub</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          onPress={() => navigation.navigate('Login')}
          color="darkred"
          style={styles.button}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('SignUp')}
          color="darkred"
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 16,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'red',
    position: 'absolute',
    top: 16,
    left: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  buttonContainer: {
    marginBottom: 20,
    width: '50%',
  },
  button: {
    backgroundColor: 'darkred',
    color: 'white',
    padding: 10,
    borderRadius: 100,
  },
});

export default LandingScreen;
