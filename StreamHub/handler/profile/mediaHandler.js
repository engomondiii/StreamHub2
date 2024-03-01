// MediaHandler.js
import axios from 'axios';
import {fetchUserCredentials } from '../storage/database';
import { USER_DETAILS_URL,MEDIA_MANAGER_MEDIA } from '../apiConfig'; 


const uploadMedia = async ({
  title,
  description,
  mediaType,
  privacy,
  tags,
  fileUri,
  onUploadProgress,
}) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('media_type', mediaType);
  formData.append('privacy', privacy);
  formData.append('tags', JSON.stringify(tags));
  formData.append('file', {
    uri: fileUri,
    name: 'media.jpg', // You might want to dynamically set the file name based on the media type
    type: 'image/jpg', // Adjust based on your media type
  });
  const credentials = await fetchUserCredentials();
  const { authToken } = credentials;  
  try {
    const response = await axios.get(USER_DETAILS_URL, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Token ${authToken}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error.message || 'Error uploading media');
  }
};
const getUserMedia = async () => {
  try {
    // Fetch user details using the user details API
    const credentials = await fetchUserCredentials();
    const { authToken } = credentials;
    const response = await axios.get(MEDIA_MANAGER_MEDIA, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });

    if (response.status === 200) {
      // If the request is successful
     const data = [];
     
     response.data.forEach((media) => {
       data.push({
        "id": media.id,
       "title": media.title,
       "description": media.description,
       "privacy": media.privacy,
       "tags": media.tags,
       "file": media.file,
       "likes": media.like,
       "comments": media.comments,
       "album": media.album,
       "user": media.user });
     });
     console.log(data)
     return data;
    } else {
      // Handle the case where fetching user details fails
      console.error('Failed to fetch user details:', response.data);
    }
  } catch (error) {
    // Handle any network or other errors that may occur during the request
    console.error('An error occurred while fetching user details:', error);
  }
};
export { getUserMedia , uploadMedia }