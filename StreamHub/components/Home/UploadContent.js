import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ProgressBarAndroid, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

const UploadContent = () => {
  const [mediaType, setMediaType] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [tags, setTags] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);

  useEffect(() => {
    getGalleryPermission();
  }, []);

  const getGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHasGalleryPermission(status === 'granted');
  };

  const handleSelectMedia = async (type) => {
    try {
      if (type === 'photo') {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.cancelled) {
          setMediaPreview(result.uri);
          setMediaType(type);
        }
      } else if (type === 'video') {
        // Implement video selection logic if needed
      }
    } catch (error) {
      console.error('Error selecting media:', error);
    }
  };

  const handleUpload = () => {
    // Implement the upload logic here, e.g., sending the data to a server
    setIsUploading(true);

    // Simulating upload progress
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => prevProgress + 10);
      if (uploadProgress === 100) {
        clearInterval(interval);
        setIsUploadComplete(true);
      }
    }, 1000);
  };

  const handleCancelUpload = () => {
    // Implement the logic to cancel the upload
    setIsUploading(false);
    setUploadProgress(0);
  };

  const handleCreateNewAlbum = () => {
    // Implement logic to create a new album
  };

  const handleAlbumSelection = (album) => {
    // Implement logic to select an existing album
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back} />
      <ScrollView style={styles.contentContainer}>
        {mediaPreview && <Image source={{ uri: mediaPreview }} style={styles.mediaPreview} />}

        <View style={styles.galleryStrip}>
          <TouchableOpacity onPress={() => handleSelectMedia('photo')} style={styles.galleryItem}>
            <Text style={styles.galleryText}>Select from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectMedia('video')} style={styles.galleryItem}>
            <Text style={styles.galleryText}>Capture Photos / Record Videos</Text>
          </TouchableOpacity>
          {/* Additional gallery items can be added here */}
        </View>

        {/* Rest of the code remains the same */}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 0.7,
  },
  contentContainer: {
    flex: 0.3,
    padding: 20,
    backgroundColor: '#222',
  },
  mediaPreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  galleryStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  galleryItem: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
  },
  galleryText: {
    color: 'white',
    textAlign: 'center',
  },
  logo: {
    fontSize: 30,
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonRed: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  buttonBlue: {
    backgroundColor: 'blue',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  buttonTextWhite: {
    color: 'white',
    textAlign: 'center',
  },
  text: {
    color: 'white',
    marginBottom: 10,
  },
  mediaPreview: {
    width: 200,
    height: 200,
  },
});

export default UploadContent;
