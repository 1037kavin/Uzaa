import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import schemeReducer from './slices/schemeSlice';
import cropReducer from './slices/cropSlice';
import weatherReducer from './slices/weatherSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    schemes: schemeReducer,
    crops: cropReducer,
    weather: weatherReducer,
    notifications: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
