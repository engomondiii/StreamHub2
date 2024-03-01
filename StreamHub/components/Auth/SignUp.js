import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { registerUser,checkAuthentication } from '../../handler/auth/authentication'; // Adjust the path based on your project structure
const SignUp = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState("");

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

  const handleSignUp = async () => {
    setIsLoading(true);

    try {
        // Call the handleSignup function from the signup handler
        const response = await registerUser({
            full_name: fullName,
            username,
            email,
            password,
        });

        if (response.success) {
            navigation.navigate('Home'); // Replace 'Login' with your actual login screen name
        } else {
            setError(response.message || 'Registration failed.');
        }
    } catch (error) {
        setError('An error occurred. Please try again.');
    }

    

    // Simulate a registration process (replace with your actual logic)
    setTimeout(() => {
        if (fullName && username && password && confirmPassword && acceptTerms) {
            navigation.navigate('Home'); 
            setError('Please fill all required fields and accept terms.');
        }

        setIsLoading(false);
    }, 2000); // Simulate a 2-second registration process
};

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>SH</Text>

      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name -</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="gray"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username -</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          placeholderTextColor="gray"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email -</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          placeholderTextColor="gray"
          onChangeText={(text) => setEmail(text)}
          value={email} // Note: You might want to change this to 'email' state
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password -</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="gray"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password -</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          placeholderTextColor="gray"
          secureTextEntry
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.termsContainer}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setAcceptTerms(!acceptTerms)}
          >
            {acceptTerms ? (
              <Text style={styles.checkmark}>✔</Text>
            ) : (
              <Text style={styles.checkmark}></Text>
            )}
          </TouchableOpacity>
          <Text style={styles.acceptTermsText}>
            I accept the terms and conditions
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.termsLink}>Read Terms and Conditions</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, { opacity: acceptTerms ? 1 : 0.5 }]}
        onPress={handleSignUp}
        disabled={isLoading || !acceptTerms} // Disable button if terms are not accepted
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Signing up...' : 'Register'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222', // Light dark background color
    padding: 16,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    color: 'white',
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    color: 'white',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  termsLink: {
    color: 'blue',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkmark: {
    color: 'white',
  },
  acceptTermsText: {
    color: 'white',
  },
  button: {
    backgroundColor: 'darkred',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  termsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
  },
  acceptTermsText: {
    color: 'white',
    fontSize: 16,
  },
  termsLink: {
    color: 'blue',
    fontSize: 16,
  },
});

export default SignUp;
