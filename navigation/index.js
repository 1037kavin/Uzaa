import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AuthNavigator from './AuthNavigator';
import FarmerNavigator from './FarmerNavigator';
import AdminNavigator from './AdminNavigator';
import { THEME } from '../utils/theme';

const Navigation = () => {
  const { isAuthenticated, userType } = useSelector((state) => state.auth);

  return (
    <NavigationContainer theme={THEME}>
      {!isAuthenticated ? (
        <AuthNavigator />
      ) : userType === 'admin' ? (
        <AdminNavigator />
      ) : (
        <FarmerNavigator />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
