import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { COLORS } from '../utils/theme';

// Placeholder for actual screens (to be created)
import DashboardScreen from '../screens/admin/DashboardScreen';
import ManageSchemesScreen from '../screens/admin/ManageSchemesScreen';
import SchemeFormScreen from '../screens/admin/SchemeFormScreen';
import ManageCropsScreen from '../screens/admin/ManageCropsScreen';
import CropFormScreen from '../screens/admin/CropFormScreen';
import ManageFertilizersScreen from '../screens/admin/ManageFertilizersScreen';
import FertilizerFormScreen from '../screens/admin/FertilizerFormScreen';
import AdminProfileScreen from '../screens/admin/AdminProfileScreen';

const Tab = createBottomTabNavigator();
const DashboardStack = createNativeStackNavigator();
const SchemeStack = createNativeStackNavigator();
const CropStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

// Dashboard Stack
const DashboardStackNavigator = () => {
  return (
    <DashboardStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <DashboardStack.Screen name="DashboardMain" component={DashboardScreen} />
    </DashboardStack.Navigator>
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
      <SchemeStack.Screen name="ManageSchemes" component={ManageSchemesScreen} />
      <SchemeStack.Screen name="SchemeForm" component={SchemeFormScreen} />
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
      <CropStack.Screen name="ManageCrops" component={ManageCropsScreen} />
      <CropStack.Screen name="CropForm" component={CropFormScreen} />
      <CropStack.Screen name="ManageFertilizers" component={ManageFertilizersScreen} />
      <CropStack.Screen name="FertilizerForm" component={FertilizerFormScreen} />
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
      <ProfileStack.Screen name="AdminProfile" component={AdminProfileScreen} />
    </ProfileStack.Navigator>
  );
};

const AdminNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
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
        name="Dashboard"
        component={DashboardStackNavigator}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            // Replace with actual icon component
            <Text style={{ color, fontSize: size }}>📊</Text>
          ),
        }}
      />
      <Tab.Screen
        name="ManageSchemes"
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
        name="ManageCrops"
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
        name="AdminProfile"
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

export default AdminNavigator;
