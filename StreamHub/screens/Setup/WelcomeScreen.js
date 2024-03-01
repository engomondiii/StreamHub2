import React ,{useEffect} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    
  }, []);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>SH</Text>

      <Text style={styles.title}>Welcome To StreamHub</Text>
      <View style={styles.listContainer}>
        <Text style={styles.listItemText}>1.Organize Your Memories</Text>
        <Text style={styles.listItemText}>2.Livestream Your Life</Text>
        <Text style={styles.listItemText}>3.Connect To Digital Computer</Text>
        <Text style={styles.listItemText}>4.AI Video Editor</Text>
        <Text style={styles.listItemText}>5.Virtual Hangouts</Text>
        <Text style={styles.listItemText}>6.Private Messaging</Text>
      </View>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('Landing')}
        color="darkred" // Red button color
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222', // Light Dark background color
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
    marginTop: 100,
    marginBottom: 20, // Add space between title and listings
  },
  listContainer: {
    alignItems: 'flex-start', // Align text to the left
  },
  listItemText: {
    fontSize: 18,
    color: 'white', // White text color
    marginVertical: 8,
  },
  button: {
    borderRadius: 100, // Make the button round
    marginTop: 60,
  },
});

export default WelcomeScreen;
