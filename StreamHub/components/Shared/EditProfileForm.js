// EditProfileForm.js
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput,View ,TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getUserProfile, updateUserProfile } from '../../handler/profile/userDetails';
import BASE_URL from '../../handler/apiConfig';
import { requestCameraPermission } from '../../handler/storage/permissions';

const EditProfileForm = () => {
  const [editedProfile, setEditedProfile] = useState({
    username: '',
    email: '',
    full_name: '',
    bio: '',
    profileImage: '',
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userData = await getUserProfile();
      setEditedProfile(userData);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await updateUserProfile(editedProfile);
      // Handle success or navigate to another screen
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleImagePick = async () => {
    if (Platform.OS === 'android') {
      await requestCameraPermission();
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setEditedProfile({ ...editedProfile, profileImage: result.uri });
      }
    } catch (error) {
      console.error('Error selecting profile image:', error);
    }
  };

  

  const getImageUrl = () => {
    return editedProfile?.profileImage ? `${BASE_URL}${editedProfile.profileImage}` : null;
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.profileImageContainer} onPress={handleImagePick}>
        <Image source={{ uri: getImageUrl() }} style={styles.profileImage} />
        <FontAwesome name="camera" size={24} color="white" style={styles.cameraIcon} />
      </TouchableOpacity>

      <View style={styles.editFieldsContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={editedProfile.email}
          onChangeText={(text) => setEditedProfile({ ...editedProfile, email: text })}
        />

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={editedProfile.full_name}
          onChangeText={(text) => setEditedProfile({ ...editedProfile, full_name: text })}
        />

        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, styles.bioInput]}
          value={editedProfile.bio}
          onChangeText={(text) => setEditedProfile({ ...editedProfile, bio: text })}
          multiline
        />
      </View>

      <TouchableOpacity onPress={handleSaveChanges} style={styles.saveChangesButton}>
        <Text style={styles.saveChangesButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 50,
    marginBottom: 10,
  },
  cameraIcon: {
    marginTop: -30,
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 20,
  }, 
  editFieldsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 20,
  },
  bioInput: {
    height: 100,
  },
  saveChangesButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  saveChangesButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditProfileForm;
