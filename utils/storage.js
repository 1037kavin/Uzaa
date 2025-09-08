import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
export const STORAGE_KEYS = {
  USER: 'uzaa_user',
  AUTH_TOKEN: 'uzaa_auth_token',
  SCHEMES: 'uzaa_schemes',
  CROPS: 'uzaa_crops',
  FERTILIZERS: 'uzaa_fertilizers',
  WEATHER: 'uzaa_weather',
  NOTIFICATIONS: 'uzaa_notifications',
  APP_SETTINGS: 'uzaa_app_settings',
};

/**
 * Store data in AsyncStorage
 * @param {string} key - Storage key
 * @param {any} value - Data to store (will be JSON stringified)
 * @returns {Promise<void>}
 */
export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error('Error storing data:', error);
    return false;
  }
};

/**
 * Retrieve data from AsyncStorage
 * @param {string} key - Storage key
 * @returns {Promise<any>} - Parsed data or null if not found
 */
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};

/**
 * Remove data from AsyncStorage
 * @param {string} key - Storage key
 * @returns {Promise<void>}
 */
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing data:', error);
    return false;
  }
};

/**
 * Clear all app data from AsyncStorage
 * @returns {Promise<void>}
 */
export const clearAllData = async () => {
  try {
    const keys = Object.values(STORAGE_KEYS);
    await AsyncStorage.multiRemove(keys);
    return true;
  } catch (error) {
    console.error('Error clearing all data:', error);
    return false;
  }
};

/**
 * Check if data exists in AsyncStorage
 * @param {string} key - Storage key
 * @returns {Promise<boolean>}
 */
export const hasData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null;
  } catch (error) {
    console.error('Error checking data:', error);
    return false;
  }
};

/**
 * Store multiple key-value pairs in AsyncStorage
 * @param {Array<Array<string, any>>} keyValuePairs - Array of [key, value] pairs
 * @returns {Promise<boolean>}
 */
export const multiStoreData = async (keyValuePairs) => {
  try {
    const pairs = keyValuePairs.map(([key, value]) => [
      key,
      JSON.stringify(value),
    ]);
    await AsyncStorage.multiSet(pairs);
    return true;
  } catch (error) {
    console.error('Error storing multiple data:', error);
    return false;
  }
};

/**
 * Retrieve multiple values from AsyncStorage
 * @param {Array<string>} keys - Array of keys to retrieve
 * @returns {Promise<Object>} - Object with key-value pairs
 */
export const multiGetData = async (keys) => {
  try {
    const pairs = await AsyncStorage.multiGet(keys);
    const result = {};
    pairs.forEach(([key, value]) => {
      result[key] = value ? JSON.parse(value) : null;
    });
    return result;
  } catch (error) {
    console.error('Error retrieving multiple data:', error);
    return {};
  }
};

/**
 * Update a specific field in a stored object
 * @param {string} key - Storage key
 * @param {string} field - Field to update
 * @param {any} value - New value
 * @returns {Promise<boolean>}
 */
export const updateField = async (key, field, value) => {
  try {
    const data = await getData(key);
    if (data) {
      const updatedData = { ...data, [field]: value };
      await storeData(key, updatedData);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating field:', error);
    return false;
  }
};

/**
 * Get all storage keys for the app
 * @returns {Promise<Array<string>>}
 */
export const getAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys.filter(key => key.startsWith('uzaa_'));
  } catch (error) {
    console.error('Error getting all keys:', error);
    return [];
  }
};
