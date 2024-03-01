import { createTables , storeUserData,storeUserCredentials,clearDatabase } from "./database";
const initiateDatabase = async () => {
    try {
      await createTables();
  
      // Sample user data
      const sampleUser = {
        id: 1,
        username: 'dummyUser',
        email: 'dummy@example.com',
        bio: 'This is a dummy user.',
        profileImage: 'dummy-image-url',
      };
  
      // Sample user credentials
      const sampleCredentials = {
        authToken: 'dummyAuthToken',
        userId: 'dummyUser',
      };
  
      // Use await to wait for both operations to complete
      await storeUserData(sampleUser);
      await storeUserCredentials(sampleCredentials.authToken, sampleCredentials.userId);
      // All operations completed successfully
    } catch (error) {
      // At least one operation failed
      throw error; // Rethrow the error to reject the main promise
    }
  };
  
  export {initiateDatabase} ;