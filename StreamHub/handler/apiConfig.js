// apiConfig.js

const BASE_URL = 'https://radically-happy-giraffe.ngrok-free.app'; // Replace with your actual API base URL

export const LOGIN_URL = `${BASE_URL}/authenticate/login/`;
export const REGISTER_URL = `${BASE_URL}/user/api/user-create/`;
export const USER_DETAILS_URL = `${BASE_URL}/user/api/user-manager/`;
export const CHECK_AUTH_URL = `${BASE_URL}/authenticate/check-authentication/`;
export const LOGOUT_URL = `${BASE_URL}/authenticate/logout/`;
export const MEDIA_MANAGER_ALBUM = `${BASE_URL}/api/album/`;
export const MEDIA_MANAGER_MEDIA = `${BASE_URL}/api/media/`;
export const USER_PREFERENCES_URL = `${BASE_URL}/api/accountSettings/media/preferences/`;
export const FOLLOW = `${BASE_URL}/user/api/follow/`;
export const UNFOLLOW = `${BASE_URL}/user/api/unfollow/`;
export const GET_FOLLOWERS = `${BASE_URL}/user/api/get-followers/`;
export const GET_FOLLOWING = `${BASE_URL}/user/api/get-following/`;







export default BASE_URL; // Exporting the base URL
