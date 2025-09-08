import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout, updateProfile } from '../../store/slices/authSlice';
import { COLORS, FONTS, SIZES } from '../../utils/theme';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import TextInput from '../../components/ui/TextInput';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    location: user?.location || '',
    farmSize: user?.farmSize || '',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    weatherAlerts: true,
    schemeUpdates: true,
  });

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

  const handleSaveProfile = () => {
    dispatch(updateProfile(profileData));
    setIsEditing(false);
    
    Alert.alert(
      "Profile Updated",
      "Your profile has been updated successfully.",
      [{ text: "OK" }]
    );
  };

  const handleCancelEdit = () => {
    setProfileData({
      name: user?.name || '',
      phone: user?.phone || '',
      email: user?.email || '',
      location: user?.location || '',
      farmSize: user?.farmSize || '',
    });
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const toggleSwitch = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };

  const renderProfileInfo = () => (
    <View style={styles.profileInfoContainer}>
      <View style={styles.profileAvatar}>
        <Text style={styles.avatarText}>{profileData.name.charAt(0)}</Text>
      </View>
      
      <Text style={styles.userName}>{profileData.name}</Text>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Phone</Text>
          <Text style={styles.infoValue}>{profileData.phone}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{profileData.email}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Location</Text>
          <Text style={styles.infoValue}>{profileData.location}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Farm Size</Text>
          <Text style={styles.infoValue}>{profileData.farmSize}</Text>
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
      />
      
      <TextInput
        label="Phone Number"
        value={profileData.phone}
        onChangeText={(value) => handleChange('phone', value)}
        keyboardType="phone-pad"
      />
      
      <TextInput
        label="Email"
        value={profileData.email}
        onChangeText={(value) => handleChange('email', value)}
        keyboardType="email-address"
        editable={false}
      />
      
      <TextInput
        label="Location"
        value={profileData.location}
        onChangeText={(value) => handleChange('location', value)}
      />
      
      <TextInput
        label="Farm Size (in acres)"
        value={profileData.farmSize}
        onChangeText={(value) => handleChange('farmSize', value)}
        keyboardType="numeric"
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

  const renderNotificationSettings = () => (
    <View style={styles.settingsSection}>
      <Text style={styles.sectionTitle}>Notification Settings</Text>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Push Notifications</Text>
        <Switch
          trackColor={{ false: COLORS.border, true: COLORS.primary }}
          thumbColor={notificationSettings.pushNotifications ? COLORS.textPrimary : COLORS.textSecondary}
          onValueChange={() => toggleSwitch('pushNotifications')}
          value={notificationSettings.pushNotifications}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Email Notifications</Text>
        <Switch
          trackColor={{ false: COLORS.border, true: COLORS.primary }}
          thumbColor={notificationSettings.emailNotifications ? COLORS.textPrimary : COLORS.textSecondary}
          onValueChange={() => toggleSwitch('emailNotifications')}
          value={notificationSettings.emailNotifications}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Weather Alerts</Text>
        <Switch
          trackColor={{ false: COLORS.border, true: COLORS.primary }}
          thumbColor={notificationSettings.weatherAlerts ? COLORS.textPrimary : COLORS.textSecondary}
          onValueChange={() => toggleSwitch('weatherAlerts')}
          value={notificationSettings.weatherAlerts}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Scheme Updates</Text>
        <Switch
          trackColor={{ false: COLORS.border, true: COLORS.primary }}
          thumbColor={notificationSettings.schemeUpdates ? COLORS.textPrimary : COLORS.textSecondary}
          onValueChange={() => toggleSwitch('schemeUpdates')}
          value={notificationSettings.schemeUpdates}
        />
      </View>
    </View>
  );

  const renderAppSettings = () => (
    <View style={styles.settingsSection}>
      <Text style={styles.sectionTitle}>App Settings</Text>
      
      <TouchableOpacity style={styles.settingButton}>
        <Text style={styles.settingButtonText}>Language</Text>
        <Text style={styles.settingValue}>English</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.settingButton}>
        <Text style={styles.settingButtonText}>Data Usage</Text>
        <Text style={styles.settingValue}>Manage</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.settingButton}>
        <Text style={styles.settingButtonText}>Privacy Policy</Text>
        <Text style={styles.settingValue}>View</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.settingButton}>
        <Text style={styles.settingButtonText}>Terms of Service</Text>
        <Text style={styles.settingValue}>View</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Profile" showBackButton={false} />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {isEditing ? renderProfileEdit() : renderProfileInfo()}
        
        {!isEditing && (
          <>
            {renderNotificationSettings()}
            {renderAppSettings()}
            
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
  settingsSection: {
    padding: SIZES.lg,
    paddingTop: 0,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: 18,
    color: COLORS.primary,
    marginBottom: SIZES.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingLabel: {
    ...FONTS.regular,
    fontSize: 16,
    color: COLORS.textPrimary,
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

export default ProfileScreen;
