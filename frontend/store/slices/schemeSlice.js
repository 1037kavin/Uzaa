import { createSlice } from '@reduxjs/toolkit';
import { SCHEMES } from '../../utils/mockData';
import { storeData, getData, STORAGE_KEYS } from '../../utils/storage';

const initialState = {
  schemes: SCHEMES,
  isLoading: false,
  error: null,
  userApplications: [], // To store user's scheme applications
};

const schemeSlice = createSlice({
  name: 'schemes',
  initialState,
  reducers: {
    getSchemesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getSchemesSuccess: (state, action) => {
      state.isLoading = false;
      state.schemes = action.payload;
      state.error = null;
    },
    getSchemesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    applyForSchemeStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    applyForSchemeSuccess: (state, action) => {
      state.isLoading = false;
      state.userApplications.push(action.payload);
      state.error = null;
    },
    applyForSchemeFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addScheme: (state, action) => {
      state.schemes.push(action.payload);
    },
    updateScheme: (state, action) => {
      const index = state.schemes.findIndex(scheme => scheme.id === action.payload.id);
      if (index !== -1) {
        state.schemes[index] = action.payload;
      }
    },
    deleteScheme: (state, action) => {
      state.schemes = state.schemes.filter(scheme => scheme.id !== action.payload);
    },
  },
});

// Mock function to apply for a scheme (to be replaced with actual API call later)
export const applyForScheme = (schemeId, applicationData) => (dispatch, getState) => {
  dispatch(applyForSchemeStart());
  
  // Simulate API call
  setTimeout(() => {
    const application = {
      id: Math.random().toString(36).substr(2, 9),
      schemeId,
      applicationDate: new Date().toISOString(),
      status: 'pending',
      ...applicationData,
    };
    
    dispatch(applyForSchemeSuccess(application));
    
    // Store updated applications in AsyncStorage
    const { userApplications } = getState().schemes;
    storeData(STORAGE_KEYS.SCHEMES + '_applications', userApplications);
  }, 1000);
};

// Function to load schemes from storage or use mock data
export const getSchemes = () => async (dispatch) => {
  dispatch(getSchemesStart());
  
  try {
    // Try to get schemes from AsyncStorage
    const storedSchemes = await getData(STORAGE_KEYS.SCHEMES);
    
    // If schemes exist in storage, use them, otherwise use mock data
    if (storedSchemes && storedSchemes.length > 0) {
      dispatch(getSchemesSuccess(storedSchemes));
    } else {
      // Use mock data and store it for future use
      dispatch(getSchemesSuccess(SCHEMES));
      storeData(STORAGE_KEYS.SCHEMES, SCHEMES);
    }
    
    // Also load user applications if available
    const storedApplications = await getData(STORAGE_KEYS.SCHEMES + '_applications');
    if (storedApplications && storedApplications.length > 0) {
      // Add each application to the state
      storedApplications.forEach(application => {
        dispatch(applyForSchemeSuccess(application));
      });
    }
  } catch (error) {
    dispatch(getSchemesFailure('Failed to load schemes'));
  }
};

// Add scheme with AsyncStorage update
export const addSchemeWithStorage = (schemeData) => (dispatch, getState) => {
  dispatch(addScheme(schemeData));
  
  // Store updated schemes in AsyncStorage
  const { schemes } = getState().schemes;
  storeData(STORAGE_KEYS.SCHEMES, schemes);
};

// Update scheme with AsyncStorage update
export const updateSchemeWithStorage = (schemeData) => (dispatch, getState) => {
  dispatch(updateScheme(schemeData));
  
  // Store updated schemes in AsyncStorage
  const { schemes } = getState().schemes;
  storeData(STORAGE_KEYS.SCHEMES, schemes);
};

// Delete scheme with AsyncStorage update
export const deleteSchemeWithStorage = (schemeId) => (dispatch, getState) => {
  dispatch(deleteScheme(schemeId));
  
  // Store updated schemes in AsyncStorage
  const { schemes } = getState().schemes;
  storeData(STORAGE_KEYS.SCHEMES, schemes);
};

export const { 
  getSchemesStart, 
  getSchemesSuccess, 
  getSchemesFailure,
  applyForSchemeStart,
  applyForSchemeSuccess,
  applyForSchemeFailure,
  addScheme,
  updateScheme,
  deleteScheme
} = schemeSlice.actions;

export default schemeSlice.reducer;
