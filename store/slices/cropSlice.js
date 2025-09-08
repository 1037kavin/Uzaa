import { createSlice } from '@reduxjs/toolkit';
import { CROPS, FERTILIZERS } from '../../utils/mockData';
import { storeData, getData, STORAGE_KEYS } from '../../utils/storage';

const initialState = {
  crops: CROPS,
  fertilizers: FERTILIZERS,
  recommendedCrops: [],
  recommendedFertilizers: [],
  isLoading: false,
  error: null,
};

const cropSlice = createSlice({
  name: 'crops',
  initialState,
  reducers: {
    getCropsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getCropsSuccess: (state, action) => {
      state.isLoading = false;
      state.crops = action.payload;
      state.error = null;
    },
    getCropsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getFertilizersStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getFertilizersSuccess: (state, action) => {
      state.isLoading = false;
      state.fertilizers = action.payload;
      state.error = null;
    },
    getFertilizersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getRecommendationsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getRecommendationsSuccess: (state, action) => {
      state.isLoading = false;
      state.recommendedCrops = action.payload.crops;
      state.recommendedFertilizers = action.payload.fertilizers;
      state.error = null;
    },
    getRecommendationsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addCrop: (state, action) => {
      state.crops.push(action.payload);
    },
    updateCrop: (state, action) => {
      const index = state.crops.findIndex(crop => crop.id === action.payload.id);
      if (index !== -1) {
        state.crops[index] = action.payload;
      }
    },
    deleteCrop: (state, action) => {
      state.crops = state.crops.filter(crop => crop.id !== action.payload);
    },
    addFertilizer: (state, action) => {
      state.fertilizers.push(action.payload);
    },
    updateFertilizer: (state, action) => {
      const index = state.fertilizers.findIndex(fertilizer => fertilizer.id === action.payload.id);
      if (index !== -1) {
        state.fertilizers[index] = action.payload;
      }
    },
    deleteFertilizer: (state, action) => {
      state.fertilizers = state.fertilizers.filter(fertilizer => fertilizer.id !== action.payload);
    },
  },
});

// Function to load crops and fertilizers from storage or use mock data
export const loadCropsAndFertilizers = () => async (dispatch) => {
  dispatch(getCropsStart());
  dispatch(getFertilizersStart());
  
  try {
    // Try to get crops from AsyncStorage
    const storedCrops = await getData(STORAGE_KEYS.CROPS);
    
    // If crops exist in storage, use them, otherwise use mock data
    if (storedCrops && storedCrops.length > 0) {
      dispatch(getCropsSuccess(storedCrops));
    } else {
      // Use mock data and store it for future use
      dispatch(getCropsSuccess(CROPS));
      storeData(STORAGE_KEYS.CROPS, CROPS);
    }
    
    // Try to get fertilizers from AsyncStorage
    const storedFertilizers = await getData(STORAGE_KEYS.FERTILIZERS);
    
    // If fertilizers exist in storage, use them, otherwise use mock data
    if (storedFertilizers && storedFertilizers.length > 0) {
      dispatch(getFertilizersSuccess(storedFertilizers));
    } else {
      // Use mock data and store it for future use
      dispatch(getFertilizersSuccess(FERTILIZERS));
      storeData(STORAGE_KEYS.FERTILIZERS, FERTILIZERS);
    }
  } catch (error) {
    dispatch(getCropsFailure('Failed to load crops and fertilizers'));
    dispatch(getFertilizersFailure('Failed to load crops and fertilizers'));
  }
};

// Mock function to get crop recommendations based on field details
export const getRecommendations = (fieldDetails) => (dispatch, getState) => {
  dispatch(getRecommendationsStart());
  
  // Get crops and fertilizers from state
  const { crops, fertilizers } = getState().crops;
  
  // Simulate API call
  setTimeout(() => {
    // Simple recommendation logic based on soil type and season
    const recommendedCrops = crops.filter(crop => {
      return crop.soilTypes.some(soil => soil.toLowerCase() === fieldDetails.soilType.toLowerCase()) &&
             crop.season.toLowerCase().includes(fieldDetails.season.toLowerCase());
    });
    
    // Get recommended fertilizers based on recommended crops
    const cropNames = recommendedCrops.map(crop => crop.name);
    const recommendedFertilizers = fertilizers.filter(fertilizer => {
      return fertilizer.crops.some(crop => cropNames.includes(crop));
    });
    
    const recommendations = {
      crops: recommendedCrops,
      fertilizers: recommendedFertilizers,
    };
    
    dispatch(getRecommendationsSuccess(recommendations));
    
    // Store recommendations in AsyncStorage for offline access
    storeData(STORAGE_KEYS.CROPS + '_recommendations', recommendations);
  }, 1000);
};

// CRUD operations with AsyncStorage updates
export const addCropWithStorage = (cropData) => (dispatch, getState) => {
  dispatch(addCrop(cropData));
  
  // Store updated crops in AsyncStorage
  const { crops } = getState().crops;
  storeData(STORAGE_KEYS.CROPS, crops);
};

export const updateCropWithStorage = (cropData) => (dispatch, getState) => {
  dispatch(updateCrop(cropData));
  
  // Store updated crops in AsyncStorage
  const { crops } = getState().crops;
  storeData(STORAGE_KEYS.CROPS, crops);
};

export const deleteCropWithStorage = (cropId) => (dispatch, getState) => {
  dispatch(deleteCrop(cropId));
  
  // Store updated crops in AsyncStorage
  const { crops } = getState().crops;
  storeData(STORAGE_KEYS.CROPS, crops);
};

export const addFertilizerWithStorage = (fertilizerData) => (dispatch, getState) => {
  dispatch(addFertilizer(fertilizerData));
  
  // Store updated fertilizers in AsyncStorage
  const { fertilizers } = getState().crops;
  storeData(STORAGE_KEYS.FERTILIZERS, fertilizers);
};

export const updateFertilizerWithStorage = (fertilizerData) => (dispatch, getState) => {
  dispatch(updateFertilizer(fertilizerData));
  
  // Store updated fertilizers in AsyncStorage
  const { fertilizers } = getState().crops;
  storeData(STORAGE_KEYS.FERTILIZERS, fertilizers);
};

export const deleteFertilizerWithStorage = (fertilizerId) => (dispatch, getState) => {
  dispatch(deleteFertilizer(fertilizerId));
  
  // Store updated fertilizers in AsyncStorage
  const { fertilizers } = getState().crops;
  storeData(STORAGE_KEYS.FERTILIZERS, fertilizers);
};

export const { 
  getCropsStart, 
  getCropsSuccess, 
  getCropsFailure,
  getFertilizersStart,
  getFertilizersSuccess,
  getFertilizersFailure,
  getRecommendationsStart,
  getRecommendationsSuccess,
  getRecommendationsFailure,
  addCrop,
  updateCrop,
  deleteCrop,
  addFertilizer,
  updateFertilizer,
  deleteFertilizer
} = cropSlice.actions;

export default cropSlice.reducer;
