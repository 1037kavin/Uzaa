import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../utils/theme';

const NotificationItem = ({ notification, onPress }) => {
  // Function to format date
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to get notification type color
  const getTypeColor = (type) => {
    switch (type) {
      case 'success':
        return COLORS.success;
      case 'warning':
        return COLORS.warning;
      case 'error':
        return COLORS.error;
      case 'info':
      default:
        return COLORS.primary;
    }
  };

  // Function to get notification icon based on type
  const getTypeIcon = (type) => {
    // This is a placeholder - in a real app, you would use actual icons
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

  return (
    <TouchableOpacity
      style={[
        styles.container,
        notification.read ? styles.readContainer : styles.unreadContainer,
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: getTypeColor(notification.type) },
        ]}
      >
        <Text style={styles.icon}>{getTypeIcon(notification.type)}</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text
            style={[
              styles.title,
              notification.read ? styles.readText : styles.unreadText,
            ]}
            numberOfLines={1}
          >
            {notification.title}
          </Text>
          <Text style={styles.date}>{formatDate(notification.date)}</Text>
        </View>

        <Text
          style={[
            styles.message,
            notification.read ? styles.readText : styles.unreadText,
          ]}
          numberOfLines={2}
        >
          {notification.message}
        </Text>
      </View>

      {!notification.read && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  unreadContainer: {
    backgroundColor: COLORS.background,
  },
  readContainer: {
    backgroundColor: COLORS.card,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.md,
  },
  icon: {
    fontSize: 18,
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.xs,
  },
  title: {
    ...FONTS.medium,
    fontSize: 16,
    flex: 1,
    marginRight: SIZES.sm,
  },
  unreadText: {
    color: COLORS.textPrimary,
  },
  readText: {
    color: COLORS.textSecondary,
  },
  date: {
    ...FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  message: {
    ...FONTS.regular,
    fontSize: 14,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginLeft: SIZES.sm,
    alignSelf: 'center',
  },
});

export default NotificationItem;
