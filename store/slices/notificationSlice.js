import { createSlice } from '@reduxjs/toolkit';
import { NOTIFICATIONS } from '../../utils/mockData';
import { storeData, getData, STORAGE_KEYS } from '../../utils/storage';

const initialState = {
  notifications: NOTIFICATIONS,
  isLoading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    getNotificationsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getNotificationsSuccess: (state, action) => {
      state.isLoading = false;
      state.notifications = action.payload;
      state.error = null;
    },
    getNotificationsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    markAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
    deleteNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
  },
});

// Function to get notifications from storage or use mock data
export const getNotifications = () => async (dispatch) => {
  dispatch(getNotificationsStart());
  
  try {
    // Try to get notifications from AsyncStorage
    const storedNotifications = await getData(STORAGE_KEYS.NOTIFICATIONS);
    
    // If notifications exist in storage, use them, otherwise use mock data
    if (storedNotifications && storedNotifications.length > 0) {
      dispatch(getNotificationsSuccess(storedNotifications));
    } else {
      // Use mock data and store it for future use
      dispatch(getNotificationsSuccess(NOTIFICATIONS));
      storeData(STORAGE_KEYS.NOTIFICATIONS, NOTIFICATIONS);
    }
  } catch (error) {
    dispatch(getNotificationsFailure('Failed to load notifications'));
  }
};

// Mark notification as read with AsyncStorage update
export const markNotificationAsRead = (notificationId) => (dispatch, getState) => {
  dispatch(markAsRead(notificationId));
  
  // Store updated notifications in AsyncStorage
  const { notifications } = getState().notifications;
  storeData(STORAGE_KEYS.NOTIFICATIONS, notifications);
};

// Mark all notifications as read with AsyncStorage update
export const markAllNotificationsAsRead = () => (dispatch, getState) => {
  dispatch(markAllAsRead());
  
  // Store updated notifications in AsyncStorage
  const { notifications } = getState().notifications;
  storeData(STORAGE_KEYS.NOTIFICATIONS, notifications);
};

// Add notification with AsyncStorage update
export const addNewNotification = (notification) => (dispatch, getState) => {
  dispatch(addNotification(notification));
  
  // Store updated notifications in AsyncStorage
  const { notifications } = getState().notifications;
  storeData(STORAGE_KEYS.NOTIFICATIONS, notifications);
};

// Delete notification with AsyncStorage update
export const deleteNotificationWithStorage = (notificationId) => (dispatch, getState) => {
  dispatch(deleteNotification(notificationId));
  
  // Store updated notifications in AsyncStorage
  const { notifications } = getState().notifications;
  storeData(STORAGE_KEYS.NOTIFICATIONS, notifications);
};

export const { 
  getNotificationsStart, 
  getNotificationsSuccess, 
  getNotificationsFailure,
  markAsRead,
  markAllAsRead,
  addNotification,
  deleteNotification
} = notificationSlice.actions;

export default notificationSlice.reducer;
