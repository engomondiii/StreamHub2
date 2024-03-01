STREAM-HUB DOCUMENTATION FROM SCRATCH
1) FRONTEND
i) Components
- Auth (API.JS)
This Code outlines the usage of the authentication module built using Axios for making HTTP requests. The authentication module provides functions for user login and registration.

Prerequisites
Before using the authentication module, ensure that you have the following:

Node.js installed on your machine.
A backend server with authentication endpoints. Replace 'http://your-backend-url/api/auth' with the actual URL of your backend server in the BASE_URL variable.
Installation
Install Axios using npm:

- Login Js
React Native Login Component Documentation
This code provides information on using the React Native Login component. The component includes functionality for user authentication, utilizing an API for user login, and AsyncStorage for token storage.

Prerequisites
Before using the React Native Login component, ensure that you have:

A React Native project set up 
The necessary dependencies installed, including @react-native-async-storage/async-storage.
An API module with a loginUser function for handling user login.
Installation
Install AsyncStorage:

- SignUp Js
React Native Sign-Up Component Documentation
This documentation provides information on using the React Native Sign-Up component. The component includes functionality for user registration, utilizing an API for user sign-up.

Prerequisites
Before using the React Native Sign-Up component, ensure that you have:

A React Native project set up.
The necessary dependencies installed.
Installation
Import the registerUser function from your API module.

Customize Styling
The SignUp component includes predefined styles. Customize the styles as needed to fit your application's design.

Handle Navigation
Adjust the navigation logic in the handleSignUp function to navigate to the desired screen upon successful registration.

Error Handling
If an error occurs during registration, an error message is displayed on the screen.

The component includes a loading state that disables the sign-up button and displays a loading message while the registration process is in progress.

Form Fields
The Sign-Up component includes the following form fields:

Full Name
Username
Password
Confirm Password


HOME
- AboutUs.js 
React Native About Us Screen Documentation
This documentation provides information on using the React Native About Us screen component. The component, named AboutUs, is designed to display information about the StreamHub application, including its features, version details, developer information, contact information, mission statement, acknowledgments, social media links, legal information, app credits, and support details.

Prerequisites
Before using the AboutUs screen component, ensure that you have:

A React Native project set up.
The necessary dependencies installed, including @react-navigation/native and Linking.
Installation
Import the AboutUs component into your project.

Styling
The AboutUs component includes predefined styles. Customize the styles as needed to fit your application's design.

External Links
The openExternalLink function is utilized to open external links. Ensure that you replace placeholder URLs with the actual URLs of your social media profiles.

Sections
The component is organized into various sections, each providing specific information:

Logo Section: Displays the application logo.
Title Section: Introduces the application and provides a brief description.
Scroll Content: Includes information about the application's features, version details, developer information, contact details, mission statement, acknowledgments, social media links, legal information, app credits, and support details.
Legal Information Links
The component includes links to the Terms of Service and Privacy Policy screens using the useNavigation hook.

External Links
Social media links are provided with the ability to open them externally using the openExternalLink function.

Support Information
The component provides a section with support information, including an email address for inquiries and a link to the Contact Support screen.

The AboutUs screen component is designed to present comprehensive information about the StreamHub application, making it easy for users to understand the features, version details, and contact information. Customize the component based on your application's requirements and integrate it into your navigation flow. Ensure that you have the necessary navigation screens set up for legal information and support.

- AlbumDetails.js
Album Details Component Documentation
Overview
The AlbumDetails component is a React Native component that displays details of a specific album. It provides functionality to view, delete, stream media, and create new albums. The component utilizes various React Native and third-party library components, such as Modal, FlatList, and icons from @expo/vector-icons.

Component Structure
Header Section:
Displays the logo and the album header containing the back button and album name.
Album Content Section:

Utilizes a FlatList to display media items (images, videos, etc.) in a grid layout.
Supports the selection of a media item to view in fullscreen.

Bottom Buttons Section:
Contains buttons for streaming, creating a new album, and deleting the current album.
The visibility of these buttons is conditional based on whether a media item is selected for fullscreen.

Modals:
Delete Album Modal:

Appears when the user initiates the album deletion process.
Provides a confirmation prompt with "Delete" and "Cancel" buttons.

Stream Modal:
Appears when the user wants to start streaming content.
Allows the user to initiate or cancel the streaming process.

Create Album Modal:
Appears when the user wants to create a new album.
Provides input fields for the new album's name and description, and allows the user to specify whether the new album is a nested album.

Nested Album Feature:
Allows the creation of nested albums (albums within albums).
A toggle switch enables the user to specify whether the new album is a nested album.

Media Fullscreen Component:
Appears when a media item is selected for fullscreen viewing.
Provides options to delete, move, and stream the selected media item.

State Management
Manages various states using the useState hook, including modal visibility, selected media for fullscreen, streaming status, and details for creating a new album.

API Interaction
Utilizes API calls for album deletion and moving media items to a different album.
Provides error handling for API interactions.

Styles
Employs a set of styles defined in the styles constant to achieve a consistent and visually appealing UI.

Dependencies
Requires the @expo/vector-icons library for icons.
Relies on React Navigation (useNavigation) for navigation within the app.

Additional Notes
The component assumes the existence of API functions for deleting an album and moving media items.


- AuthContext.js
Authentication Context Provider Documentation
Overview
The AuthProvider component is a React context provider that manages the authentication state of a user in a React Native application. It utilizes the AsyncStorage library to persist the user's authentication token across app sessions. The component includes a context, AuthContext, and provides a context value to its children components.

Context Structure
AuthContext:
The context object created using createContext().
Exposes the userToken and setUserToken as part of the context.

Component Structure
AuthProvider:
Wraps its children with the AuthContext.Provider to make the authentication context available to its descendants.Utilizes useState and useEffect hooks for managing the authentication state and handling asynchronous tasks during component initialization.

State Management
userToken:
Represents the user's authentication token.
Initially set to null and updated using the setUserToken function.

isLoading:
Indicates whether the component is still in the process of loading.
Set to true initially and updated to false once the asynchronous tasks (e.g., fetching the authentication token from storage) are completed.

AsyncStorage Usage
Utilizes AsyncStorage to persist the user's authentication token between app sessions.
Retrieves the token during the component's initialization using the useEffect hook.

Auth Context Value
The context value provided to consumers includes:
userToken: The current user's authentication token.
setUserToken: A function to update the user's authentication token.


- ChatJS
Chat Component Documentation
Overview
The Chat component is a React Native component designed to display a list of chat items, allowing users to navigate to individual chat screens. It includes features such as a search functionality and an aesthetically designed interface. The component uses a light-dark background theme with color-coded chat items and provides basic customization options for profile pictures and chat details.

Component Structure
Header Section:
Displays a logo, chat title, and a search icon for accessing the search functionality.
Utilizes the FontAwesome library for the search icon.

Search Input Section:
Enables users to input a search query for filtering chat items.
Dynamically updates the displayed chat list based on the search query.

Chat List Section:
Uses a FlatList to render individual chat items.
Each chat item includes profile pictures, chat information, and an unread message badge.

State Management
Utilizes the useState hook for managing the state of the search query and the chat list.
Functionality

enterChat:
Navigates to the chat screen with the selected chat's data.
Requires the implementation of a separate ChatScreen component.

searchChats:
Invoked when the search icon is pressed.
Implements chat search logic based on the entered search query.
Updates the chats state with the filtered results.

Chat Data
Includes sample chat data (chatData) with fields such as id, name, lastMessage, and unreadMessages.
Styles
Employs a set of styles defined in the styles constant to achieve a visually appealing and user-friendly UI.
Allows for easy customization of colors, font sizes, and other style properties.
Dependencies
Relies on the @expo/vector-icons library for the search icon.
Assumes the existence of a navigation system (e.g., React Navigation).

- Contact Support Js
ContactSupport Component Documentation
Overview
The ContactSupport component is a React Native component designed to provide users with various options for contacting support. It includes features such as email support, a contact form, mobile support, social media links, information about support response time, and a link to Frequently Asked Questions (FAQs). The component aims to offer a comprehensive set of options for users seeking assistance.

Component Structure
Logo Section:
Displays a simple logo, denoted by the letters 'SH', in red color.

Title Section:
Features a bold and large title, "Contact Support," in white color.

ScrollView Content:
Contains a series of informational sections and options within a scrollable container.
Contact Options

Email Support:
Provides an option to contact support via email.
Users can press on the displayed email address to open their default email client.

Contact Form:
Includes a contact form with a multiline text input for users to enter their messages.
Displays a submit button to trigger the form submission.
Success message is shown upon successful form submission, along with the submitted message.

Mobile Support:
Displays a phone/WhatsApp contact option along with a note about potential operating hours.

Additional Contact Options:
Offers links to social media platforms (Twitter and Facebook) for alternative contact methods.

Support Response Time:
Provides information about the expected response time from the support team.

Frequently Asked Questions (FAQs):
Links to the Frequently Asked Questions (FAQs) section.
Navigates to the 'FAQScreen' when the user presses on the "FAQs" link.

Style and Theming
Employs a dark background theme with white, blue, and red color accents.
Utilizes styles defined in the styles constant for consistent and visually appealing UI.

Form Handling
Utilizes the react-hook-form library for form management.
Validates the message field, displaying an error message if the field is empty.

External Links
Uses the Linking module to open external links (email, social media) in the user's default browser or app.

- Create Post Js
CreatePost Component Documentation
Overview
The CreatePost component is a React Native component designed to facilitate the creation and publishing of posts. It includes features such as adding text content, attaching images, adding location, setting privacy options, tagging friends, adding reactions (emojis), and configuring publishing options. The component provides a user-friendly interface for creating and customizing posts before publication.

Component Structure
Input Container:

Displays a multiline TextInput for entering post content.
Image Container:

Displays selected images horizontally in a ScrollView.
Buttons Container:

Contains buttons for adding images and publishing the post.
Additional Options:

Includes various options such as location input, privacy settings, tagging friends, adding reactions, and post publishing options.
Post Content Management

Post Content:
Managed using the useState hook for dynamic updates.

Selected Images:
Stored in the selectedImages state using the useState hook.
Users can add images from the device's camera roll.

Location:
Managed using the useState hook.
Allows users to add a location to the post.

Actions and Handlers
Add Image:
Invokes the handleAddImage function, allowing users to add images to the post.

Tag Friends:
Placeholder function (handleTagFriend) for tagging friends; users can implement logic as needed.

Add Reaction:
Invokes the handleAddReaction function to add reactions (emojis) to the post.

Publish:
Invokes the handlePublish function to log post details.
Users can extend this function to implement logic for publishing the post.

Style and Theming
Employs a dark background theme with white and green color accents.
Utilizes styles defined in the styles constant for a consistent and visually appealing UI.

External Modules
ImagePicker:
Uses the expo-image-picker module to request permissions and allow users to select images from the camera roll.


- CreateWatchParty.js
CreateWatchParty Component Documentation
Overview
The CreateWatchParty component is a React Native component designed to allow users to create a watch party event. It includes input fields for the event name, start time, and privacy settings. The component also provides buttons for creating the watch party and inviting friends. Additionally, it utilizes the react-native-push-notification library to schedule a reminder notification for the watch party.

Component Structure
Logo:Displays a red text logo ("SH") at the top left.

Screen Title:
Displays the title "Create Watch Party."

Input Fields:Event Name: TextInput for entering the name of the watch party.
Start Time: TextInput for entering the start time of the watch party.
Privacy Settings: TextInput for entering privacy settings.

Action Buttons:Create Watch Party Button: A red button for creating the watch party.
Invite Friends Button: A blue button for inviting friends to the watch party.

State Management
Uses the useState hook to manage the state of eventName, startTime, and privacySettings.

Actions and Handlers
createWatchParty:

Invoked when the user presses the "Create Watch Party" button.
Calls the scheduleNotification function and performs logic for creating the watch party.

inviteFriends:Placeholder function for inviting friends to the watch party.
Users can implement logic for sending invitations via email, SMS, or in-app notifications.

scheduleNotification:Calculates the notification time based on the start time.
Uses react-native-push-notification to schedule a local notification for the watch party.

External Modules
react-native-push-notification:
Used to handle local notifications for reminding users about the upcoming watch party.
Style and Theming

Employs a light background theme with red and blue buttons for visual appeal.
Utilizes styles defined in the styles constant for consistent UI design.

- Downloads.js 
Downloads Component Documentation
The Downloads component is a React Native application component designed to manage and display downloaded items. It provides features such as viewing completed downloads, ongoing downloads, and storage space usage.

2. Fetching Downloads
Downloads are fetched from the backend when the component mounts.

3. Fetching Downloads from Backend
A function is implemented to fetch downloads from the backend.

Styling
The component includes a stylesheet (styles) with predefined styles for various UI elements, such as buttons, lists, and item details.

The Downloads component is a comprehensive solution for managing downloaded items in a React Native application. Users can view completed downloads, manage ongoing downloads, and monitor storage space usage. The component's modular structure allows for easy integration and customization within larger applications.


- EmojiPicker.js 
EmojiPicker Component Documentation
Introduction
The EmojiPicker component is a React Native component designed to provide a simple emoji selection interface. It consists of a button that triggers the display of a custom emoji picker, allowing users to choose an emoji and notifying the parent component through a callback function.

Installation
Ensure that you have React and React Native installed in your project. You can then include the EmojiPicker component in your project by importing it as follows:

Component Structure
The EmojiPicker component is structured as follows:

State:
isPickerVisible: A state variable to manage the visibility of the emoji picker.
Methods:
showPicker: Function to set isPickerVisible to true and display the emoji picker.
hidePicker: Function to set isPickerVisible to false and hide the emoji picker.
handleEmojiPicked: Function called when an emoji is picked. It invokes the onEmojiSelected callback and hides the emoji picker.

Render:
A View containing a TouchableOpacity that triggers the display of the emoji picker.
Conditional rendering of the emoji picker based on the isPickerVisible state.

A placeholder for your custom emoji selection UI inside the conditional rendering section.
Customization
The component provides a placeholder for your custom emoji selection UI. Replace the comment, Your Custom Emoji Picker Goes Here, with your own UI components for selecting emojis, such as emoji buttons or a modal with emojis.

- Favourite.js 
Favourites Screen Documentation
Overview
The Favourites screen is a React Native component designed to manage and display a user's favorite items. Users can add new favorites manually, organize them by category, sort and filter the displayed list, and view recently watched items.

Dependencies
The component relies on the following external libraries and modules:
React and React Native for building the user interface.
@react-native-picker/picker for rendering the sorting criteria picker.
expo-notifications for handling notifications.
FavouritesApi for handling CRUD operations related to favorites.
Component Structure


The Favourites component is structured as follows:

State Variables
favouritesData: Stores the list of all favorite items.
manualInput: Represents the user's manual input for adding new favorites.
categoryInput: Captures the category or tag input for organizing favorites.
sortingCriteria: Determines the sorting criteria for the displayed list (e.g., date or likes).
filterCriteria: Holds the input for filtering favorites by username.
viewingHistory: Maintains the list of recently watched items.

Effects
Uses useEffect to fetch initial data (all favorites) when the component mounts.
Rendering Functions

renderFavouriteItem: Renders individual favorite items with user details and a share option.
renderRecentlyWatchedItem: Renders recently watched items with user details.

Action Functions
handleManualAdd: Adds a new favorite item based on user manual input.
handleRemove: Deletes a favorite item based on the provided item ID.

UI Elements
ScrollView: Main container for the screen.
Text: Displays screen title, no-favorites messages, and labels.
TouchableOpacity: Enables user interaction for manual addition, organization, share, and full-screen viewing.
FlatList: Renders lists of favorite items and recently watched items.
TextInput: Allows user input for manual addition and filtering.
Picker: Displays sorting criteria options.

Styling
Utilizes a StyleSheet for defining the visual style of components.

Usage
To use the Favourites component, integrate it into your React Native application and pass the required props as needed. The component can be customized further by adjusting the styling and modifying the behavior of action functions.

export default App;

Styling
The component utilizes a set of predefined styles to achieve a cohesive and visually appealing layout. The styles include background color, text color, button styling, input styling, and more. Adjustments can be made to these styles to match the overall theme of your application.

Styles Overview
container: Styles for the main container.
header: Styles for the screen title.
noFavouritesText: Styles for the text displayed when there are no favorites or recently watched items.
favouriteItem: Styles for the container of individual favorite items.
input: Styles for text input fields.
row: Styles for layout rows.
label: Styles for labels.
picker: Styles for the sorting criteria picker.
redButton: Styles for buttons with a red background.


-Favourite API.js
Favourites API Documentation
Introduction
The Favourites API module provides a set of functions for seamless communication with a backend API, allowing developers to perform essential CRUD (Create, Read, Update, Delete) operations on a collection of favourites. This module is built on Axios, a widely-used HTTP client for both browser and Node.js environments.

Installation
To incorporate the Favourites API module into your project, ensure that Axios is installed. If Axios is not already part of your project, install it using the following command:

Before utilizing the Favourites API functions, configure the API_BASE_URL variable with the base URL of your backend API.

1. getAllFavourites
Retrieve all favourites from the backend.

2. addFavourite
Add a new favourite to the backend.


- Following.js
# Favourites API Documentation
## Introduction
The Favourites API module provides a set of functions for seamless communication with a backend API, enabling developers to perform essential CRUD (Create, Read, Update, Delete) operations on a collection of favourites. This module is built on Axios, a widely-used HTTP client for both browser and Node.js environments.

## Installation
To incorporate the Favourites API module into your project, ensure that Axios is installed. If Axios is not already part of your project, install it using the following command:

npm install axios
Importing Favourites API

Configuration
Before utilizing the Favourites API functions, configure the API_BASE_URL variable with the base URL of your backend API.

FavouritesApi Functions
1. getAllFavourites
Retrieve all favourites from the backend.

2. addFavourite
Add a new favourite to the backend.

- Friends.js
Friends Component Documentation
Overview
The Friends component is a React Native component designed to manage a user's friends and friend-related functionalities in a social networking application. It includes features such as viewing friends, sending/receiving friend requests, starting conversations, and managing privacy settings.

Usage
To use this component, import it into your React Native application and integrate it into your navigation system. Make sure to set up the necessary navigation routes, such as the 'Chat' route.

Props
The Friends component does not accept any external props.

State
friends: An array storing the user's friends.
searchText: Stores the input for searching friends.
isAddFriendModalVisible: Controls the visibility of the "Add Friend" modal.
newFriendUsername: Stores the username for sending friend requests.
friendRequests: An array storing incoming friend requests.
isFriendRequestsModalVisible: Controls the visibility of the friend requests modal.
isOnlineStatus: Represents the user's online status.
allowFriendRequests: Toggles the user's preference for receiving friend requests.
showFriendList: Toggles the visibility of the user's friend list.
friendRecommendations: An array storing friend recommendations.

Methods
sendFriendRequest: Sends a friend request to the specified username.
acceptFriendRequest: Accepts a friend request from a specific user.
rejectFriendRequest: Rejects a friend request from a specific user.
removeFriend: Removes a friend from the user's friends list.
toggleOnlineStatus: Toggles the user's online status.
updateFriendRequestPrivacy: Updates the "Allow Friend Requests" privacy setting.
updateFriendListPrivacy: Updates the "Show Friend List" privacy setting.
startChatWithFriend: Initiates a chat or conversation with a friend.

UI Components
The component includes various UI elements for rendering friends, friend requests, and friend recommendations. It uses React Native components such as View, Text, FlatList, TouchableOpacity, TextInput, Modal, Image, Switch, and icons from the @expo/vector-icons library.

Styling
The component is styled using the StyleSheet API, defining styles for different UI elements such as buttons, input fields, friend items, and privacy settings.

- GetLive.JS
GetLive Component Documentation
Overview
The GetLive component is a React Native component designed for handling live streaming functionalities in a mobile application. It integrates with the Camera and Audio components from the expo libraries and communicates with a backend API (GetLiveApi) for stream creation and chat messaging.

Usage
To use this component, import it into your React Native application and include it in your navigation structure. Ensure that you have the necessary dependencies installed, such as expo-camera, expo-av, and GetLiveApi.

Props
The GetLive component does not accept any external props.

State
isStreaming: Represents the streaming status (true if streaming, false otherwise).
cameraPermission: The camera permission status.
audioPermission: The audio permission status.
streamTitle: Stores the title of the stream.
chatMessages: An array storing chat messages.
audioRecording: Represents the audio recording instance.

Methods
startStreaming: Initiates the live streaming process by obtaining permissions, creating a stream, initializing the camera, and starting audio recording.
stopStreaming: Stops the live streaming process by stopping audio recording and updating the streaming status.
handleChatSend: Handles sending chat messages by calling the createChatMessage method from GetLiveApi.

UI Components
The component includes various UI elements such as the Camera, TextInput, and TouchableOpacity for interacting with the camera, entering stream title, and managing the streaming process. Additionally, the chat interface is a placeholder (<View style={styles.chatContainer} />) that can be implemented as per application requirements.

Styling
The component is styled using the StyleSheet API, defining styles for different UI elements, including the header, camera, overlay, input, buttons, and chat container.

Dependencies
Make sure to have the following dependencies installed:
expo-camera: For handling camera functionalities.
expo-av: For handling audio recording.
Additionally, ensure that the GetLiveApi module is properly imported and configured to communicate with the backend API.


- GetLive APIs.JS
GetLiveApi Module Documentation
The GetLiveApi module is a utility module that provides functions for interacting with a backend API related to live streaming and chat messaging. It uses the Axios library for making asynchronous HTTP requests.

Setup
Before using the GetLiveApi module, ensure that you have the Axios library installed in your project:
Returns: An array of stream objects.

getStreamById(streamId)
Description: Fetches a specific stream by its ID from the backend.

Parameters:
streamId: ID of the stream to be fetched.
Returns: The stream object.

createStream(streamData)
Description: Creates a new stream on the backend.

Parameters:
streamData: Data for creating the stream.
Returns: The created stream object.

updateStream(streamId, streamData)
Description: Updates an existing stream on the backend.

Parameters:
streamId: ID of the stream to be updated.
streamData: Updated data for the stream.
Returns: The updated stream object.

deleteStream(streamId)
Description: Deletes a specific stream by its ID from the backend.

Parameters:
streamId: ID of the stream to be deleted.
getAllChatMessages()
Description: Fetches all chat messages from the backend.

Returns: An array of chat message objects.

getChatMessageById(chatMessageId)
Description: Fetches a specific chat message by its ID from the backend.

Parameters:
chatMessageId: ID of the chat message to be fetched.
Returns: The chat message object.

createChatMessage(chatMessageData)
Description: Creates a new chat message on the backend.

Parameters:
chatMessageData: Data for creating the chat message.
Returns: The created chat message object.

updateChatMessage(chatMessageId, chatMessageData)
Description: Updates an existing chat message on the backend.

Parameters:
chatMessageId: ID of the chat message to be updated.
chatMessageData: Updated data for the chat message.
Returns: The updated chat message object.

Parameters:
chatMessageId: ID of the chat message to be deleted.

-GroupLiveAPI.JS
GroupLivestream Component Documentation
The GroupLivestream component is a React Native component designed for managing group livestreams. It allows users to view ongoing livestreams, join a selected livestream, and start their own livestream with chat functionality.

Component Structure
Simulated Livestream Data
The initialLivestreams array contains simulated data for initial livestreams. In a real-world application, you should fetch this data from a server.

State Variables
livestreams: An array to store the list of ongoing livestreams.
selectedLivestream: Keeps track of the currently selected livestream for viewing.
chatMessages: Stores chat messages for the selected livestream.
isStreaming: Indicates whether the user is currently streaming.

useEffect Hook
Fetches initial livestream data when the component mounts.

Functions
joinLivestream(livestream)
Description: Sets the selectedLivestream state when a user chooses to join a livestream.

Parameters:
livestream: The livestream object selected by the user.
startStreaming()
Description: Sets the isStreaming state to true and initiates logic to start the user's own livestream.
stopStreaming()
Description: Sets the isStreaming state to false and initiates logic to stop the user's own livestream.
handleChatSend(message)
Description: Handles the sending of chat messages to the selected livestream.

Parameters:
message: The text of the chat message.
Component Rendering
Selected Livestream View
If a selectedLivestream exists, the component displays the selected livestream's video streaming component, chat interface, and viewer interaction buttons.

List of Ongoing Livestreams
If no selectedLivestream is present, the component renders a list of ongoing livestreams using a FlatList. Each livestream item includes details such as title, streamer, viewers, and category. Users can join a livestream by tapping on an item.

Streaming Interface
If the user is currently streaming (isStreaming is true), the component displays the user's own streaming interface, including video streaming component, chat interface, and a button to stop streaming.

Start Your Livestream Button
If the user is not currently streaming, a button is displayed to allow the user to start their own livestream.

Styling
Logo
The red text logo "SH" is positioned in the top-left corner.

Livestream Item Style (livestreamItemRed)
Background: Red
Padding: 10
Border radius: 10 (rounded corners)
Border bottom: 1px, Color: '#ccc' (for separating items)
Start Streaming Button Style (startStreamingButtonRed)
Background: Red
Padding: 10
Border radius: 10 (rounded corners)
Button Text Style (buttonTextWhite)
Text color: White
Text align: Center

- HotLiveSream.JS
HotLivestream Component Documentation
The HotLivestream component is a React Native component designed to showcase and interact with a list of hot livestreams. It includes features such as filtering, sorting, and selecting livestreams, as well as options for searching, interacting with selected livestreams, and a floating action button (FAB) for starting a new livestream.

Component Structure
State Variables
livestreams: An array to store the list of hot livestreams.
selectedLivestream: Keeps track of the currently selected livestream for additional details and interactions.
searchQuery: Holds the user's input for searching livestreams.
filter: Represents the selected category filter option.
sortOrder: Represents the selected sort order option.

Simulated Livestream Data
The initialLivestreams array contains simulated data for initial hot livestreams. In a real-world application, you should fetch this data from a server.

Functions
filterLivestreams()
Description: Filters the list of livestreams based on the selected category filter.
Implementation: Uses the filter state to filter the livestreams accordingly.
sortLivestreams()
Description: Sorts the list of livestreams based on the selected sort order.
Implementation: Uses the sortOrder state to sort the livestreams.
handleRefresh()
Description: Handles refreshing the list of livestreams. You should implement logic to fetch the latest livestream data.

Component Rendering
Hot Livestreams Title
Displays the title "Hot Livestreams" at the top of the component.

Filter and Search Bar
Includes a category filter dropdown (Picker) and a search input bar.

Sort Order Dropdown
Provides a dropdown (Picker) for selecting the sort order.

Livestream List
Renders a scrollable list of livestreams using a ScrollView component.

Livestream Item Style (livestreamItem)
Each livestream item includes thumbnail, details, and interaction buttons.

Additional Livestream Information and Interaction (if a livestream is selected)
Shows additional details and interaction options when a livestream is selected.

Livestream Interaction
Includes buttons for liking, commenting, and sharing a selected livestream.

Floating Action Button (FAB)
A button represented by a video camera icon that is positioned at the bottom right of the screen. It is a placeholder for starting a new livestream.

Red Text Logo at the Top Left
Displays a red text logo "SH" at the top-left corner.

Styling
General Styling
Dark background (#222) for the main container.
Red logo text, titles, and buttons for emphasis.
Rounded corners for various components using borderRadius.
Logo Text Style (logoText)
Red text logo at the top-left corner with a font size of 24 and bold weight.


- JoinWatchParty.JS
HotLivestream Component Documentation
The HotLivestream component is a React Native component designed to showcase hot livestreams with features such as filtering, searching, sorting, and interactive livestream details. It also includes a floating action button (FAB) for quick access to starting a new livestream.

Component Structure
State Variables
livestreams: An array to store the list of hot livestreams.
selectedLivestream: Keeps track of the currently selected livestream for detailed view.
searchQuery: Stores the user's input for livestream search.
filter: Represents the selected category filter for livestreams.
sortOrder: Represents the selected sort order for livestreams.


Simulated Livestream Data
The initialLivestreams array contains simulated data for initial hot livestreams. In a real-world application, you should fetch this data from a server.

Functions
filterLivestreams(): Filters livestreams based on the selected category filter.
sortLivestreams(): Sorts livestreams based on the selected sort order.
handleRefresh(): Handles refreshing the livestream list (placeholder for actual API call).


UI Components
Logo
The red text logo "SH" is displayed at the top left of the component.

Hot Livestreams Title
Displays a bold white text title "Hot Livestreams" to indicate the purpose of the component.

Filter and Search Bar
Picker: Allows users to select a category filter for livestreams.
TextInput: Enables users to input search queries for livestreams.


Sort Order Dropdown
A Picker component to select the sort order for the livestream list.

Livestream List
A ScrollView containing a list of livestreams. Each livestream is represented by a TouchableOpacity element displaying its thumbnail, details, and a "Watch Now" button.

Selected Livestream Details
If a livestream is selected (selectedLivestream is not null), detailed information about the selected livestream is displayed, including a thumbnail, creator, viewer count, duration, and interactive buttons for liking, commenting, and sharing.

Livestream Interaction
Includes buttons for full-screen mode, volume control, and pause/play functionality.

Chat Section
A section for displaying chat messages with an input field for sending new messages.

Livestream End Time
Placeholder for displaying the estimated end time of the livestream.

Report Livestream Button
A button for users to report the livestream if needed.

Floating Action Button (FAB)
A button with a video camera icon, positioned at the bottom right, allowing users to quickly navigate to the screen for starting a new livestream.

Styling
Colors and Styling
The component utilizes various styling properties such as backgroundColor, borderRadius, and color customization for text and buttons.

Logo Style (logoText)
Font size: 24
Font weight: Bold
Color: Red


Livestream Item Style (livestreamItem)
Background: Semi-transparent white
Border radius: 10
Margin bottom: 20


Watch Now Button Style (watchNowButton)
Background: Red
Border radius: 10
Padding: 5
Margin top: 10


Floating Action Button Style (fabButton)
Position: Absolute
Bottom: 20
Right: 20
Background: Red
Border radius: 25
Padding: 10


- ManageFriendList.JS
ManageFriendList Component Documentation
The ManageFriendList component is a React Native component designed to manage user interactions with their friends, friend requests, and blocked users. It provides features such as accepting/declining friend requests, sending friend requests, removing friends, blocking/unblocking users, and privacy settings.

Component Structure
State Variables
friends: An array to store the list of user's friends.
blockedUsers: An array to store the list of blocked users.
friendRequests: An array to store incoming friend requests.
sentRequests: An array to store sent friend requests.
searchQuery: Stores the user's input for searching friends.


Dummy Data
The dummyFriendsData array contains simulated data for initial friend list. In a real-world application, you should fetch this data from a server.

Functions
handleAcceptRequest(requestId): Handles the logic to accept a friend request.
handleDeclineRequest(requestId): Handles the logic to decline a friend request.
handleSendFriendRequest(userId): Handles the logic to send a friend request.
handleRemoveFriend(friendId): Handles the logic to remove a friend.
handleBlockUser(userId): Handles the logic to block a user.
handleUnblockUser(userId): Handles the logic to unblock a user.

Render Functions
renderFriendItem({ item }): Renders each friend item with a remove button.
renderBlockedUserItem({ item }): Renders each blocked user item with an unblock button.


UI Components
Logo Section
Displays the red text logo "SH" at the top of the component.

Title Section
Displays the bold white text title "Manage Friends List".

Friend Requests Section
Displays incoming friend requests with options to accept or decline.
Displays sent friend requests.
Friends List Section
Allows users to search for friends.
Displays the list of friends with a remove button for each.
Privacy Settings Section
Placeholder for adding privacy settings components.

Blocked Users Section
Displays the list of blocked users with an unblock button for each.

Styling
Colors and Styling
Background color: #222 (light dark background)
Various styling properties such as fontSize, fontWeight, color, borderWidth, borderColor, borderRadius, padding, and margin are utilized.

Logo Style (logo)
Font size: 30
Font weight: Bold
Color: Red
Title Style (title)
Font size: 24
Font weight: Bold
Margin bottom: 10
Color: White

Friend Item Style (friendItem)
Flex direction: Row
Justify content: Space between
Align items: Center
Border bottom width: 1
Border bottom color: #ccc
Padding vertical: 10

Blocked User Item Style (blockedUserItem)
Similar to friendItem
Search Input Style (searchInput)
Border width: 1
Border color: #ccc
Border radius: 5
Padding: 10
Margin bottom: 10
Friend Request Item Style (friendRequestItem)
Similar to friendItem
Friend Request Buttons Style (friendRequestButtons)
Flex direction: Row
Accept/Decline Request Text Style (acceptRequestText, declineRequestText)
Colors: Green, Red
Margin right: 10


Sent Requests Title Style (sentRequestsTitle)
Font size: 16
Font weight: Bold
Margin top: 10
Margin bottom: 5


Sent Request Item Style (sentRequestItem)
Similar to friendItem
Scroll Content Style (scrollContent)
Padding bottom: 80 (Adjust based on content length)


- ManageUploadContent.JS
ManageUploadContent Component Documentation
The ManageUploadContent component is a React Native component designed to provide users with an intuitive interface for managing various settings related to content upload. This documentation presents an overview of the component's structure, state management, functions, user interface elements, styling, and usage examples.

Component Structure
State Variables
privacySetting: Tracks the user's selected content privacy setting (Public, Friends Only, Private).
notificationPreferences: Manages the user's preferred upload notification settings (Real-Time, Custom).
defaultAlbum: Records the default album choice for uploaded content (e.g., General).
uploadRestrictions: Manages the selected upload restrictions for content (Everyone, Friends Only, Only Me).
autoTaggingEnabled: Tracks the user's preference for enabling or disabling auto-tagging.

Functions
handlePrivacySettingChange(newSetting): Updates the privacySetting state based on the user's selection.
handleNotificationPreferencesChange(newPreferences): Updates notificationPreferences based on the user's selection.

handleDefaultAlbumChange(newAlbum): Updates the defaultAlbum state based on the chosen default album.
handleUploadRestrictionsChange(newRestrictions): Updates uploadRestrictions based on the chosen restrictions.
handleAutoTaggingToggle(): Toggles the state of autoTaggingEnabled between true and false.

User Interface Elements
Logo Section
Displays the text logo "SH" in red at the top-left corner of the component.

Title Section
Displays the bold white text "Manage Upload Content" as the title.

Content Privacy Settings Section
Provides options to set content privacy with choices like Public, Friends Only, and Private.
Users can select their preference by tapping on the respective option.

Upload Notifications Section
Allows users to choose between Real-Time and Custom for upload notifications.
Tapping on an option updates the notification preferences.

Default Album Section
Offers options for selecting the default album, with an initial choice of General.
Additional album options can be added as needed.

Upload Restrictions Section
Users can set upload restrictions to Everyone, Friends Only, or Only Me.
Tapping on an option updates the selected restrictions.

Auto-Tagging Section
Allows users to enable or disable auto-tagging with a toggle.
Displays the status of auto-tagging as either Enabled or Disabled.

Additional Tips Section
Provides users with helpful tips on managing their content effectively.
Tips include reminders to update privacy settings, use default albums for organization, experiment with auto-tagging, and stay informed about interactions.

Styling
Colors and Styling
Background color: #222 (light dark background).
Various styling properties such as fontSize, fontWeight, color, textDecorationLine, and margin are utilized.

Logo Style (logo)
Font size: 30
Font weight: Bold
Color: Red
Title Style (title)
Font size: 24
Font weight: Bold
Margin bottom: 10
Color: White
Section Style (section)
Margin bottom: 20

Section Title Style (sectionTitle)
Font size: 18
Font weight: Bold
Margin top: 10
Margin bottom: 5
Color: White
Option Style (option)
Font size: 16
Color: Blue
Text decoration: Underline
Margin bottom: 5

Selected Option Style (selectedOption)
Font size: 16
Color: Red
Text decoration: Underline
Font weight: Bold
Margin bottom: 5
Tip Text Style (tipText)
Font size: 16
Color: White
Margin bottom: 15
Scroll Content Style (scrollContent)
Padding bottom: 80 (Adjust based on content length)

-MediaFullScreen.JS
