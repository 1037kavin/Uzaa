import { getData, storeData, clearAllData, STORAGE_KEYS } from './storage';
import { loginSuccess } from '../store/slices/authSlice';
import { getSchemes } from '../store/slices/schemeSlice';
import { loadCropsAndFertilizers } from '../store/slices/cropSlice';
import { getWeatherData } from '../store/slices/weatherSlice';
import { getNotifications } from '../store/slices/notificationSlice';

/**
 * Initialize the app by loading data from AsyncStorage
 * @param {Function} dispatch - Redux dispatch function
 */
export const initializeApp = async (dispatch) => {
  try {
    // Load user data from AsyncStorage
    const userData = await getData(STORAGE_KEYS.USER);
    
    // If user data exists, log the user in
    if (userData && userData.user) {
      dispatch(loginSuccess(userData));
    }
    
    // Load other data regardless of authentication state
    // This ensures offline access to data
    dispatch(getSchemes());
    dispatch(loadCropsAndFertilizers());
    dispatch(getWeatherData());
    dispatch(getNotifications());
    
    return true;
  } catch (error) {
    console.error('Error initializing app:', error);
    return false;
  }
};

/**
 * Check if the user is already logged in
 * @returns {Promise<boolean>}
 */
export const isUserLoggedIn = async () => {
  try {
    const userData = await getData(STORAGE_KEYS.USER);
    return !!(userData && userData.user);
  } catch (error) {
    console.error('Error checking user login status:', error);
    return false;
  }
};

/**
 * Clear app data and reset to initial state
 * @param {Function} dispatch - Redux dispatch function
 * @param {Function} resetAction - Redux action to reset the store
 */
export const resetApp = async (dispatch, resetAction) => {
  try {
    // Clear all app data from AsyncStorage
    await clearAllData();
    
    // Reset Redux store
    if (resetAction) {
      dispatch(resetAction());
    }
    
    return true;
  } catch (error) {
    console.error('Error resetting app:', error);
    return false;
  }
};
