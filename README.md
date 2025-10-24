# Uzaa - Agricultural Assistant App

Uzaa is a mobile-first agricultural assistant app designed to help farmers access agricultural schemes, get crop recommendations, check weather advisories, and more.



## Features

### For Farmers
- **Authentication**: Register and login to access personalized features
- **Schemes**: View and apply for agricultural schemes
- **Crop Recommendations**: Get personalized crop and fertilizer recommendations based on field conditions
- **Weather Advisory**: Check weather forecasts and advisories for better farming decisions
- **Offline Access**: Access essential information even without an internet connection
- **Notifications**: Receive important updates and alerts

### For Admins
- **Dashboard**: Overview of app statistics and activities
- **Scheme Management**: Add, edit, and delete agricultural schemes
- **Crop & Fertilizer Management**: Manage crop and fertilizer information
- **User Management**: View and manage user accounts

## Tech Stack

### Frontend
- **React Native (Expo)**: For cross-platform mobile app development
- **Redux Toolkit**: For state management
- **React Navigation**: For navigation between screens
- **AsyncStorage**: For offline data persistence
- **React Native Paper**: For UI components

### Backend (Planned)
- **Node.js + Express**: For RESTful API development
- **MongoDB Atlas**: For database storage
- **Mongoose**: For MongoDB object modeling

## Project Structure

```
/frontend
  /assets        -> icons, logos, images
  /components    -> reusable UI components
  /screens       -> individual app screens
  /navigation    -> React Navigation setup
  /store         -> Redux Toolkit slices
  /utils         -> helpers, constants, theme
  App.js
```

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/uzaa.git
cd uzaa
```

2. Install dependencies
```
cd frontend
npm install
```

3. Start the development server
```
npm start
```

4. Run on your device or emulator
- Scan the QR code with the Expo Go app on your device
- Press 'a' to run on Android emulator
- Press 'i' to run on iOS simulator (requires macOS)

## Color Theme

- **Background**: #0D0D0D
- **Accent**: #1DB954 (vibrant green)
- **Secondary accent**: #00A86B
- **Text**: #FFFFFF primary, #B3B3B3 secondary

## Current Status

The app currently has a functional frontend with static mock data. The backend integration is planned for future development.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Designed and developed as a solution for agricultural assistance in rural areas
- Inspired by the need for accessible agricultural information for farmers
