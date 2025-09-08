import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getNotifications, markAsRead, markAllAsRead } from '../../store/slices/notificationSlice';
import { COLORS, FONTS, SIZES } from '../../utils/theme';
import Header from '../../components/ui/Header';
import NotificationItem from '../../components/NotificationItem';
import Loading from '../../components/ui/Loading';

const NotificationsScreen = () => {
  const dispatch = useDispatch();
  const { notifications, isLoading } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const handleNotificationPress = (notification) => {
    if (!notification.read) {
      dispatch(markAsRead(notification.id));
    }
    
    // In a real app, we would navigate to the relevant screen based on the notification type
    // For now, we just mark it as read
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

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
      <Header title="Notifications" />
      
      {isLoading ? (
        <Loading fullScreen />
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NotificationItem
              notification={item}
              onPress={() => handleNotificationPress(item)}
            />
          )}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    flexGrow: 1,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  notificationCount: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  markAllText: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.primary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.xl,
  },
  emptyText: {
    ...FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: SIZES.sm,
  },
  emptySubtext: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default NotificationsScreen;
