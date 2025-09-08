import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { COLORS } from '../utils/theme';

// Placeholder for actual screens (to be created)
import HomeScreen from '../screens/farmer/HomeScreen';
import SchemesScreen from '../screens/farmer/SchemesScreen';
import SchemeDetailScreen from '../screens/farmer/SchemeDetailScreen';
import SchemeApplicationScreen from '../screens/farmer/SchemeApplicationScreen';
import CropRecommendationScreen from '../screens/farmer/CropRecommendationScreen';
import CropDetailScreen from '../screens/farmer/CropDetailScreen';
import WeatherScreen from '../screens/farmer/WeatherScreen';
import ProfileScreen from '../screens/farmer/ProfileScreen';
import NotificationsScreen from '../screens/farmer/NotificationsScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SchemeStack = createNativeStackNavigator();
const CropStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

// Home Stack
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="Notifications" component={NotificationsScreen} />
    </HomeStack.Navigator>
  );
};

// Schemes Stack
const SchemeStackNavigator = () => {
  return (
    <SchemeStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <SchemeStack.Screen name="SchemesMain" component={SchemesScreen} />
      <SchemeStack.Screen name="SchemeDetail" component={SchemeDetailScreen} />
      <SchemeStack.Screen name="SchemeApplication" component={SchemeApplicationScreen} />
    </SchemeStack.Navigator>
  );
};

// Crop Stack
const CropStackNavigator = () => {
  return (
    <CropStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <CropStack.Screen name="CropRecommendation" component={CropRecommendationScreen} />
      <CropStack.Screen name="CropDetail" component={CropDetailScreen} />
    </CropStack.Navigator>
  );
};

// Profile Stack
const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

const FarmerNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.card,
          borderTopColor: COLORS.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            // Replace with actual icon component
            <Text style={{ color, fontSize: size }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Schemes"
        component={SchemeStackNavigator}
        options={{
          tabBarLabel: 'Schemes',
          tabBarIcon: ({ color, size }) => (
            // Replace with actual icon component
            <Text style={{ color, fontSize: size }}>📋</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Crops"
        component={CropStackNavigator}
        options={{
          tabBarLabel: 'Crops',
          tabBarIcon: ({ color, size }) => (
            // Replace with actual icon component
            <Text style={{ color, fontSize: size }}>🌱</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Weather"
        component={WeatherScreen}
        options={{
          tabBarLabel: 'Weather',
          tabBarIcon: ({ color, size }) => (
            // Replace with actual icon component
            <Text style={{ color, fontSize: size }}>☁️</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            // Replace with actual icon component
            <Text style={{ color, fontSize: size }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default FarmerNavigator;
