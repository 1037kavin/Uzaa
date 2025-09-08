import { createSlice } from '@reduxjs/toolkit';
import { WEATHER_DATA } from '../../utils/mockData';
import { storeData, getData, STORAGE_KEYS } from '../../utils/storage';

const initialState = {
  weatherData: WEATHER_DATA,
  isLoading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    getWeatherStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getWeatherSuccess: (state, action) => {
      state.isLoading = false;
      state.weatherData = action.payload;
      state.error = null;
    },
    getWeatherFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Function to get weather data from storage or use mock data
export const getWeatherData = (location) => async (dispatch) => {
  dispatch(getWeatherStart());
  
  try {
    // Create a storage key that includes the location
    const storageKey = location ? 
      `${STORAGE_KEYS.WEATHER}_${location.replace(/\s+/g, '_').toLowerCase()}` : 
      STORAGE_KEYS.WEATHER;
    
    // Try to get weather data from AsyncStorage
    const storedWeather = await getData(storageKey);
    
    // Check if stored weather data is still valid (not older than 3 hours)
    const isDataValid = storedWeather && 
                        storedWeather.timestamp && 
                        (Date.now() - storedWeather.timestamp < 3 * 60 * 60 * 1000);
    
    if (isDataValid) {
      // Use stored weather data
      dispatch(getWeatherSuccess(storedWeather.data));
    } else {
      // Simulate API call (in a real app, we would fetch from a weather API)
      setTimeout(() => {
        // In a real app, we would use the location parameter to fetch location-specific weather data
        const weatherData = WEATHER_DATA;
        
        // Store weather data with timestamp
        storeData(storageKey, {
          data: weatherData,
          timestamp: Date.now(),
        });
        
        dispatch(getWeatherSuccess(weatherData));
      }, 1000);
    }
  } catch (error) {
    dispatch(getWeatherFailure('Failed to load weather data'));
  }
};

export const { 
  getWeatherStart, 
  getWeatherSuccess, 
  getWeatherFailure 
} = weatherSlice.actions;

export default weatherSlice.reducer;
