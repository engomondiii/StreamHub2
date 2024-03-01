// authentication.js
import axios from 'axios'; // Import axios or any HTTP client library you are using
import { CHECK_AUTH_URL, REGISTER_URL, LOGIN_URL, LOGOUT_URL } from '../apiConfig';
import { storeUserCredentials, createTables, fetchUserCredentials, clearDatabase } from '../storage/database';
import { getUserProfile } from '../../handler/profile/userDetails'; // Adjust the path based on your project structure

/**
 * Check user authentication status.
 * @returns {Object} Object indicating the success or failure of the authentication request.
 */

const checkAuthentication = async () => {
  try {
    // Retrieve user credentials from the database
    const credentials = await fetchUserCredentials();
    if (!credentials) {
      console.warn('No user credentials found');
      return { success: false, message: 'No user credentials found' };
    }

    const { authToken } = credentials;

    // Check if authToken is available
    if (!authToken) {
      console.error('Authentication failed: Auth token is missing or invalid.');
      return { success: false, message: 'Authentication failed: Auth token is missing or invalid.' };
    }

    // Make the authentication request with the authToken
    const response = await fetch(CHECK_AUTH_URL, {
      method: 'GET',
      headers: {
        Authorization: `Token ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    // Handle the response
    if (response.ok) {
      const data = await response.json();
      console.log('Authentication successful:', data);
      return { success: true, message: 'Authentication successful', data };
    } else {
      const errorData = await response.json();
      clearDatabase();
      console.error('Authentication failed:', errorData);
      return { success: false, message: 'Authentication failed', error: errorData };
    }
  } catch (error) {
    console.error('An error occurred during authentication:', error);
    clearDatabase();
    return { success: false, message: 'An error occurred during authentication', error };
  }
};



/**
 * Login user and store user data and credentials in the database.
 * @param {string} email - User email.
 * @param {string} password - User password.
 * @returns {Object} Object indicating the success or failure of the login request.
 */
const loginUser = async (email, password) => {
  try {
    // Send a POST request to the login endpoint with user credentials
    const response = await axios.post(LOGIN_URL, { email, password });

    if (response.data.token && response.data.user) {
      // If the login is successful, store user credentials and data
      console.log('Login successful');
      console.log('Token:', response.data.token);
      console.log('User ID:', response.data.user);

      // Clear existing data from the database (optional)
      await clearDatabase();
      await createTables();

      // Store user data and credentials in the database
      await storeUserCredentials(response.data.token, response.data.user);

      await getUserProfile();

      return {
        success: true,
        message: 'Login successful',
        token: response.data.token,
        userId: response.data.user.id,
      };
    } else {
      // If login fails, handle the error response
      console.error('Login failed:', response.data.error);
      return { success: false, message: 'Login failed', error: response.data.error };
    }
  } catch (error) {
    // Handle any network or other errors that may occur during the request
    console.error('An error occurred during login:', error);
    return { success: false, message: 'An error occurred during login', error };
  }
};

/**
 * Register user and handle the response accordingly.
 * @param {Object} userData - User registration data.
 * @returns {Object} Object indicating the success or failure of the registration request.
 */
const registerUser = async (userData) => {
  try {
    // Send a POST request to the user_create endpoint with user data
    const response = await axios.post(REGISTER_URL, userData);
    await clearDatabase();
    await createTables();
    if (response.data.success) {
      // If the signup is successful, you can handle the response data accordingly
      console.log('User created successfully');
      console.log('Token:', response.data.token);
      console.log('User ID:', response.data.user_id);
      console.log('Username:', response.data.username);

      // Store the token in the database
      await storeUserCredentials(response.data.token, response.data.user_id);
      console.log('usercredentials stored')
      // You may want to perform other actions here
      await getUserProfile();
      console.log('userpprofile fetched')
      return { success: true, message: 'User created successfully' };
    } else {
      // If signup fails, handle the error response
      console.error('User creation failed:', response.data.message);
      return { success: false, message: 'User creation failed', errors: response.data.errors };
    }
  } catch (error) {
    // Handle any network or other errors that may occur during the request
    console.error('An error occurred during signup:', error);
    return { success: false, message: 'An error occurred during signup', error };
  }
};

/**
 * Logout user and handle the response accordingly.
 * @returns {Object} Object indicating the success or failure of the logout request.
 */
const logoutUser = async () => {
  try {
    // Send a POST request to the logout endpoint
    const credentials = await fetchUserCredentials();
    const { authToken } = credentials;
    console.info(authToken ? `Logging out ${authToken}` : "Not logged in");

    const response = await axios.post(
      LOGOUT_URL,
      {}, // Empty object for the request body
      {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      }
    );

    if (response.data.message === 'Logout successful') {
      // If the logout is successful, clear the database
      clearDatabase();
      console.log('Logout successful');
    } else {
      // If logout fails, handle the error response
      console.error('Logout failed:', response.data.message);
    }
  } catch (error) {
    // Handle any network or other errors that may occur during the request
    console.error('An error occurred during logout:', error);
  }
};

export { checkAuthentication, loginUser, registerUser, logoutUser };
