import React from 'react';
import { View, StyleSheet } from 'react-native';
import Login from '../../components/Auth/Login'; // Make sure the import path is correct

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Login navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
