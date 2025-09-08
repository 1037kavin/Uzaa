import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout, updateProfile } from '../../store/slices/authSlice';
import { COLORS, FONTS, SIZES } from '../../utils/theme';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import TextInput from '../../components/ui/TextInput';

const AdminProfileScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState({});

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: () => dispatch(logout())
        }
      ]
    );
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    
    if (!profileData.name) formErrors.name = 'Name is required';
    
    if (profileData.password || profileData.confirmPassword) {
      if (profileData.password.length < 6) {
        formErrors.password = 'Password must be at least 6 characters';
      }
      
      if (profileData.password !== profileData.confirmPassword) {
        formErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSaveProfile = () => {
    if (validateForm()) {
      // Create updated user object
      const updatedUser = {
        ...user,
        name: profileData.name,
      };
      
      dispatch(updateProfile(updatedUser));
      setIsEditing(false);
      
      Alert.alert(
        "Profile Updated",
        "Your profile has been updated successfully.",
        [{ text: "OK" }]
      );
    }
  };

  const handleCancelEdit = () => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      confirmPassword: '',
    });
    setIsEditing(false);
    setErrors({});
  };

  const renderProfileInfo = () => (
    <View style={styles.profileInfoContainer}>
      <View style={styles.profileAvatar}>
        <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'A'}</Text>
      </View>
      
      <Text style={styles.userName}>{user?.name || 'Admin User'}</Text>
      <Text style={styles.userRole}>Administrator</Text>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{user?.email || 'admin@example.com'}</Text>
        </View>
      </View>
      
      <Button
        title="Edit Profile"
        onPress={handleEditProfile}
        type="outline"
        style={styles.editButton}
      />
    </View>
  );

  const renderProfileEdit = () => (
    <View style={styles.profileEditContainer}>
      <TextInput
        label="Full Name"
        value={profileData.name}
        onChangeText={(value) => handleChange('name', value)}
        error={errors.name}
      />
      
      <TextInput
        label="Email"
        value={profileData.email}
        onChangeText={(value) => handleChange('email', value)}
        keyboardType="email-address"
        editable={false}
      />
      
      <TextInput
        label="New Password (leave blank to keep current)"
        value={profileData.password}
        onChangeText={(value) => handleChange('password', value)}
        secureTextEntry
        error={errors.password}
      />
      
      <TextInput
        label="Confirm New Password"
        value={profileData.confirmPassword}
        onChangeText={(value) => handleChange('confirmPassword', value)}
        secureTextEntry
        error={errors.confirmPassword}
      />
      
      <View style={styles.editButtons}>
        <Button
          title="Cancel"
          onPress={handleCancelEdit}
          type="outline"
          style={styles.cancelButton}
        />
        <Button
          title="Save"
          onPress={handleSaveProfile}
          style={styles.saveButton}
        />
      </View>
    </View>
  );

  const renderAdminActions = () => (
    <View style={styles.actionsSection}>
      <Text style={styles.sectionTitle}>Admin Actions</Text>
      
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => navigation.navigate('ManageSchemes')}
      >
        <Text style={styles.actionIcon}>📋</Text>
        <Text style={styles.actionText}>Manage Schemes</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => navigation.navigate('ManageCrops')}
      >
        <Text style={styles.actionIcon}>🌱</Text>
        <Text style={styles.actionText}>Manage Crops & Fertilizers</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionIcon}>👥</Text>
        <Text style={styles.actionText}>Manage Users</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionIcon}>📊</Text>
        <Text style={styles.actionText}>View Analytics</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Admin Profile" showBackButton={false} />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {isEditing ? renderProfileEdit() : renderProfileInfo()}
        
        {!isEditing && (
          <>
            {renderAdminActions()}
            
            <View style={styles.settingsSection}>
              <Text style={styles.sectionTitle}>Settings</Text>
              
              <TouchableOpacity style={styles.settingButton}>
                <Text style={styles.settingButtonText}>App Settings</Text>
                <Text style={styles.settingValue}>Manage</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingButton}>
                <Text style={styles.settingButtonText}>Backup & Restore</Text>
                <Text style={styles.settingValue}>View</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingButton}>
                <Text style={styles.settingButtonText}>Privacy Policy</Text>
                <Text style={styles.settingValue}>View</Text>
              </TouchableOpacity>
            </View>
            
            <Button
              title="Logout"
              onPress={handleLogout}
              type="outline"
              style={styles.logoutButton}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: SIZES.xxl,
  },
  profileInfoContainer: {
    alignItems: 'center',
    padding: SIZES.lg,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  avatarText: {
    ...FONTS.bold,
    fontSize: 40,
    color: COLORS.textPrimary,
  },
  userName: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
  },
  userRole: {
    ...FONTS.medium,
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: SIZES.md,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginBottom: SIZES.md,
  },
  infoItem: {
    marginBottom: SIZES.sm,
  },
  infoLabel: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    ...FONTS.regular,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  editButton: {
    width: '100%',
  },
  profileEditContainer: {
    padding: SIZES.lg,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.md,
  },
  cancelButton: {
    flex: 0.48,
  },
  saveButton: {
    flex: 0.48,
  },
  actionsSection: {
    padding: SIZES.lg,
    paddingTop: 0,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: 18,
    color: COLORS.primary,
    marginBottom: SIZES.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginBottom: SIZES.sm,
  },
  actionIcon: {
    fontSize: 24,
    marginRight: SIZES.md,
  },
  actionText: {
    ...FONTS.medium,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  settingsSection: {
    padding: SIZES.lg,
    paddingTop: 0,
  },
  settingButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingButtonText: {
    ...FONTS.regular,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  settingValue: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.primary,
  },
  logoutButton: {
    marginHorizontal: SIZES.lg,
    marginTop: SIZES.xl,
  },
});

export default AdminProfileScreen;
