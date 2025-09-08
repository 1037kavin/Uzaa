import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';

// Farmer Screens
import HomeScreen from '../screens/farmer/HomeScreen';
import SchemesScreen from '../screens/farmer/SchemesScreen';
import SchemeDetailScreen from '../screens/farmer/SchemeDetailScreen';
import CropRecommendationScreen from '../screens/farmer/CropRecommendationScreen';
import WeatherScreen from '../screens/farmer/WeatherScreen';
import ProfileScreen from '../screens/farmer/ProfileScreen';
import NotificationsScreen from '../screens/farmer/NotificationsScreen';

// Admin Screens
import DashboardScreen from '../screens/admin/DashboardScreen';
import ManageSchemesScreen from '../screens/admin/ManageSchemesScreen';
import AddSchemeScreen from '../screens/admin/AddSchemeScreen';
import ManageCropsScreen from '../screens/admin/ManageCropsScreen';
import AdminProfileScreen from '../screens/admin/AdminProfileScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0D0D0D' },
        }}
      >
        {/* Common Screens */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={LoginScreen} />
        
        {/* Farmer Screens */}
        <Stack.Screen name="FarmerHome" component={HomeScreen} />
        <Stack.Screen name="Schemes" component={SchemesScreen} />
        <Stack.Screen name="SchemeDetail" component={SchemeDetailScreen} />
        <Stack.Screen name="CropRecommendation" component={CropRecommendationScreen} />
        <Stack.Screen name="Weather" component={WeatherScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        
        {/* Admin Screens */}
        <Stack.Screen name="AdminHome" component={DashboardScreen} />
        <Stack.Screen name="ManageSchemes" component={ManageSchemesScreen} />
        <Stack.Screen name="AddScheme" component={AddSchemeScreen} />
        <Stack.Screen name="ManageCrops" component={ManageCropsScreen} />
        <Stack.Screen name="AdminProfile" component={AdminProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;