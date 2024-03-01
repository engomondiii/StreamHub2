import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RaspberryPi = ({ navigation }) => {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');

  const handleConnect = (method) => {
    // Implement the logic to connect to Raspberry Pi using the selected method here.
    // Update the connection status accordingly.
    console.log(`Connecting via ${method}`);
    setConnectionStatus('Connected');
  };

  const handleBack = () => {
    // Navigate back to the previous screen or the home screen.
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      

      {/* Connection Status */}
      <Text style={styles.connectionStatus}>Connection Status: {connectionStatus}</Text>

      {/* Connection Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleConnect('Wi-Fi Network')}
        >
          <Text style={styles.buttonText}>Wi-Fi Network</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleConnect('Bluetooth')}
        >
          <Text style={styles.buttonText}>Bluetooth</Text>
        </TouchableOpacity>
        
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222', // Light dark background color
    padding: 20,
  },
  
  connectionStatus: {
    color: 'white',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '45%',
    backgroundColor: '#777',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  
});

export default RaspberryPi;
