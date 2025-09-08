import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Mock notifications data
const NOTIFICATIONS = [
  {
    id: '1',
    title: 'Scheme Application Approved',
    message: 'Your application for PM Kisan Samman Nidhi has been approved.',
    date: '2023-08-20',
    read: false,
    type: 'success',
  },
  {
    id: '2',
    title: 'Weather Alert',
    message: 'Heavy rainfall expected in your region in the next 48 hours.',
    date: '2023-08-22',
    read: true,
    type: 'warning',
  },
  {
    id: '3',
    title: 'New Scheme Available',
    message: 'New subsidy scheme for organic farming has been launched.',
    date: '2023-08-23',
    read: false,
    type: 'info',
  },
  {
    id: '4',
    title: 'Crop Advisory',
    message: 'Time to apply second dose of fertilizer for your wheat crop.',
    date: '2023-08-24',
    read: false,
    type: 'info',
  },
  {
    id: '5',
    title: 'Application Reminder',
    message: 'Last date to apply for Kisan Credit Card is approaching.',
    date: '2023-08-25',
    read: true,
    type: 'warning',
  },
  {
    id: '6',
    title: 'Market Price Update',
    message: 'Wheat prices have increased by 5% in your region.',
    date: '2023-08-26',
    read: false,
    type: 'info',
  },
];

const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  
  // Function to format date
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Function to mark notification as read
  const handleNotificationPress = (id) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };
  
  // Function to mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
  };
  
  // Function to get notification type color
  const getTypeColor = (type) => {
    switch (type) {
      case 'success':
        return '#2ECC40';
      case 'warning':
        return '#FF851B';
      case 'error':
        return '#FF4136';
      case 'info':
      default:
        return '#1DB954';
    }
  };
  
  // Function to get notification icon based on type
  const getTypeIcon = (type) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      case 'info':
      default:
        return 'ℹ️';
    }
  };
  
  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        item.read ? styles.readNotification : styles.unreadNotification,
      ]}
      onPress={() => handleNotificationPress(item.id)}
    >
      <View
        style={[
          styles.notificationDot,
          { backgroundColor: getTypeColor(item.type) },
        ]}
      />
      
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text
            style={[
              styles.notificationTitle,
              item.read ? styles.readText : styles.unreadText,
            ]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text style={styles.notificationDate}>{formatDate(item.date)}</Text>
        </View>
        
        <Text
          style={[
            styles.notificationMessage,
            item.read ? styles.readText : styles.unreadText,
          ]}
          numberOfLines={2}
        >
          {item.message}
        </Text>
      </View>
      
      {!item.read && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );
  
  const renderHeader = () => {
    const unreadCount = notifications.filter(n => !n.read).length;
    
    return (
      <View style={styles.listHeader}>
        <Text style={styles.notificationCount}>
          {unreadCount} Unread Notification{unreadCount !== 1 ? 's' : ''}
        </Text>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={handleMarkAllAsRead}>
            <Text style={styles.markAllText}>Mark All as Read</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No notifications</Text>
      <Text style={styles.emptySubtext}>You don't have any notifications at the moment.</Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerRight} />
      </View>
      
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={renderNotificationItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#0D0D0D',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerRight: {
    width: 40,
  },
  listContent: {
    flexGrow: 1,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  notificationCount: {
    fontSize: 14,
    color: '#B3B3B3',
  },
  markAllText: {
    fontSize: 14,
    color: '#1DB954',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  readNotification: {
    backgroundColor: '#0D0D0D',
  },
  unreadNotification: {
    backgroundColor: '#1A1A1A',
  },
  notificationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
  notificationDate: {
    fontSize: 12,
    color: '#B3B3B3',
  },
  notificationMessage: {
    fontSize: 14,
  },
  unreadText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  readText: {
    color: '#B3B3B3',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1DB954',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#B3B3B3',
    textAlign: 'center',
  },
});

export default NotificationsScreen;
