import { createSlice } from '@reduxjs/toolkit';
import { USER_PROFILE } from '../../utils/mockData';
import { storeData, removeData, STORAGE_KEYS } from '../../utils/storage';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  userType: null, // 'farmer' or 'admin'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.userType = action.payload.userType;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.userType = null;
    },
    registerStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.userType = action.payload.userType;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

// Mock login function (to be replaced with actual API call later)
export const login = (credentials) => (dispatch) => {
  dispatch(loginStart());
  
  // Simulate API call
  setTimeout(() => {
    if (credentials.email === 'farmer@example.com' && credentials.password === 'password') {
      const userData = { 
        user: USER_PROFILE, 
        userType: 'farmer' 
      };
      
      // Store user data in AsyncStorage
      storeData(STORAGE_KEYS.USER, userData);
      
      dispatch(loginSuccess(userData));
    } else if (credentials.email === 'admin@example.com' && credentials.password === 'admin') {
      const userData = { 
        user: { 
          id: 'admin1', 
          name: 'Admin User', 
          email: 'admin@example.com' 
        }, 
        userType: 'admin' 
      };
      
      // Store user data in AsyncStorage
      storeData(STORAGE_KEYS.USER, userData);
      
      dispatch(loginSuccess(userData));
    } else {
      dispatch(loginFailure('Invalid credentials'));
    }
  }, 1000);
};

// Mock register function (to be replaced with actual API call later)
export const register = (userData) => (dispatch) => {
  dispatch(registerStart());
  
  // Simulate API call
  setTimeout(() => {
    if (userData.email && userData.password) {
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        location: userData.location || '',
        farmSize: userData.farmSize || '',
        crops: [],
        soilType: '',
        irrigationType: '',
        registeredSchemes: [],
      };
      
      const userDataToStore = { 
        user: newUser, 
        userType: 'farmer' 
      };
      
      // Store user data in AsyncStorage
      storeData(STORAGE_KEYS.USER, userDataToStore);
      
      dispatch(registerSuccess(userDataToStore));
    } else {
      dispatch(registerFailure('Please fill all required fields'));
    }
  }, 1000);
};

// Update profile function
export const updateUserProfile = (profileData) => (dispatch) => {
  dispatch(updateProfile(profileData));
  
  // Update user data in AsyncStorage
  storeData(STORAGE_KEYS.USER, {
    user: profileData,
    userType: profileData.userType || 'farmer'
  });
};

// Logout function with AsyncStorage cleanup
export const logoutUser = () => (dispatch) => {
  // Remove user data from AsyncStorage
  removeData(STORAGE_KEYS.USER);
  removeData(STORAGE_KEYS.AUTH_TOKEN);
  
  // Dispatch logout action
  dispatch(logout());
};

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  registerStart, 
  registerSuccess, 
  registerFailure,
  updateProfile
} = authSlice.actions;

export default authSlice.reducer;
