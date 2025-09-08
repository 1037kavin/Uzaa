import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';

// Mock admin data
const ADMIN_DATA = {
  id: 'admin1',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'Administrator',
  lastLogin: '2023-08-27 10:30 AM',
};

const AdminProfileScreen = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: ADMIN_DATA.name,
    email: ADMIN_DATA.email,
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    newApplications: true,
    systemUpdates: true,
    userRegistrations: false,
  });
  
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };
  
  const handleEditProfile = () => {
    setIsEditing(true);
  };
  
  const handleSaveProfile = () => {
    // In a real app, this would update the admin profile in the backend
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setProfileData({
      name: ADMIN_DATA.name,
      email: ADMIN_DATA.email,
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
      <Text style={styles.userRole}>{ADMIN_DATA.role}</Text>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{profileData.email}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Last Login</Text>
          <Text style={styles.infoValue}>{ADMIN_DATA.lastLogin}</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.editButton}
        onPress={handleEditProfile}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
  
  const renderProfileEdit = () => (
    <View style={styles.profileEditContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Full Name</Text>
        <TouchableOpacity style={styles.input}>
          <Text style={styles.inputText}>{profileData.name}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TouchableOpacity style={[styles.input, styles.disabledInput]}>
          <Text style={styles.inputText}>{profileData.email}</Text>
        </TouchableOpacity>
        <Text style={styles.inputNote}>Email cannot be changed</Text>
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <TouchableOpacity style={styles.input}>
          <Text style={styles.inputText}>••••••••</Text>
        </TouchableOpacity>
        <Text style={styles.inputNote}>Leave blank to keep current password</Text>
      </View>
      
      <View style={styles.editButtons}>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={handleCancelEdit}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSaveProfile}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  const renderNotificationSettings = () => (
    <View style={styles.settingsSection}>
      <Text style={styles.sectionTitle}>Notification Settings</Text>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>New Applications</Text>
        <Switch
          trackColor={{ false: '#333333', true: '#1DB954' }}
          thumbColor={notificationSettings.newApplications ? '#FFFFFF' : '#B3B3B3'}
          onValueChange={() => toggleSwitch('newApplications')}
          value={notificationSettings.newApplications}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>System Updates</Text>
        <Switch
          trackColor={{ false: '#333333', true: '#1DB954' }}
          thumbColor={notificationSettings.systemUpdates ? '#FFFFFF' : '#B3B3B3'}
          onValueChange={() => toggleSwitch('systemUpdates')}
          value={notificationSettings.systemUpdates}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>User Registrations</Text>
        <Switch
          trackColor={{ false: '#333333', true: '#1DB954' }}
          thumbColor={notificationSettings.userRegistrations ? '#FFFFFF' : '#B3B3B3'}
          onValueChange={() => toggleSwitch('userRegistrations')}
          value={notificationSettings.userRegistrations}
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
        <Text style={styles.actionButtonText}>Manage Schemes</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => navigation.navigate('ManageCrops')}
      >
        <Text style={styles.actionButtonText}>Manage Crops & Fertilizers</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Manage Users</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>System Settings</Text>
      </TouchableOpacity>
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
        <Text style={styles.settingButtonText}>Data Backup</Text>
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Profile</Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {isEditing ? renderProfileEdit() : renderProfileInfo()}
        
        {!isEditing && (
          <>
            {renderNotificationSettings()}
            {renderAdminActions()}
            {renderAppSettings()}
            
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('AdminHome')}
        >
          <Text style={styles.navIcon}>📊</Text>
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('ManageSchemes')}
        >
          <Text style={styles.navIcon}>📋</Text>
          <Text style={styles.navText}>Schemes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('ManageCrops')}
        >
          <Text style={styles.navIcon}>🌱</Text>
          <Text style={styles.navText}>Crops</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={[styles.navText, styles.activeNavText]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#0D0D0D',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  profileInfoContainer: {
    alignItems: 'center',
    padding: 16,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    color: '#1DB954',
    marginBottom: 16,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  infoItem: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#B3B3B3',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  editButton: {
    width: '100%',
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1DB954',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1DB954',
  },
  profileEditContainer: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#B3B3B3',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  disabledInput: {
    opacity: 0.7,
  },
  inputText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  inputNote: {
    fontSize: 12,
    color: '#B3B3B3',
    marginTop: 4,
    fontStyle: 'italic',
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    width: '48%',
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  saveButton: {
    width: '48%',
    backgroundColor: '#1DB954',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  settingsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  settingLabel: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  settingButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  settingButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  settingValue: {
    fontSize: 14,
    color: '#1DB954',
  },
  actionsSection: {
    padding: 16,
  },
  actionButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  logoutButton: {
    margin: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF4136',
    marginBottom: 80,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF4136',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  activeNavItem: {
    borderTopWidth: 2,
    borderTopColor: '#1DB954',
    marginTop: -2,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: '#B3B3B3',
  },
  activeNavText: {
    color: '#1DB954',
  },
});

export default AdminProfileScreen;
