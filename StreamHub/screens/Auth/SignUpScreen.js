import React from 'react';
import { View, StyleSheet } from 'react-native';
import SignUp from '../../components/Auth/SignUp';

const SignUpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SignUp navigation={navigation} />
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

export default SignUpScreen;
