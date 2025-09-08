import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addCrop, updateCrop } from '../../store/slices/cropSlice';
import { COLORS, FONTS, SIZES } from '../../utils/theme';
import { SOIL_TYPES, SEASONS } from '../../utils/mockData';
import Header from '../../components/ui/Header';
import TextInput from '../../components/ui/TextInput';
import Button from '../../components/ui/Button';

const CropFormScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { fertilizers } = useSelector((state) => state.crops);
  const isEditing = route.params?.isEditing || false;
  const existingCrop = route.params?.crop || null;
  
  const [formData, setFormData] = useState({
    id: isEditing ? existingCrop.id : Math.random().toString(36).substr(2, 9),
    name: '',
    scientificName: '',
    season: '',
    soilTypes: [],
    waterRequirement: '',
    fertilizers: [],
    image: null,
    description: '',
  });
  
  const [errors, setErrors] = useState({});
  const [showSoilTypesDropdown, setShowSoilTypesDropdown] = useState(false);
  const [showSeasonsDropdown, setShowSeasonsDropdown] = useState(false);
  const [showFertilizersDropdown, setShowFertilizersDropdown] = useState(false);

  useEffect(() => {
    if (isEditing && existingCrop) {
      setFormData({
        id: existingCrop.id,
        name: existingCrop.name,
        scientificName: existingCrop.scientificName,
        season: existingCrop.season,
        soilTypes: existingCrop.soilTypes,
        waterRequirement: existingCrop.waterRequirement,
        fertilizers: existingCrop.fertilizers,
        image: existingCrop.image,
        description: existingCrop.description,
      });
    }
  }, [isEditing, existingCrop]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleToggleSoilType = (soilType) => {
    const updatedSoilTypes = [...formData.soilTypes];
    const index = updatedSoilTypes.indexOf(soilType);
    
    if (index === -1) {
      updatedSoilTypes.push(soilType);
    } else {
      updatedSoilTypes.splice(index, 1);
    }
    
    handleChange('soilTypes', updatedSoilTypes);
  };

  const handleToggleFertilizer = (fertilizer) => {
    const updatedFertilizers = [...formData.fertilizers];
    const index = updatedFertilizers.indexOf(fertilizer);
    
    if (index === -1) {
      updatedFertilizers.push(fertilizer);
    } else {
      updatedFertilizers.splice(index, 1);
    }
    
    handleChange('fertilizers', updatedFertilizers);
  };

  const validateForm = () => {
    let formErrors = {};
    
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.scientificName) formErrors.scientificName = 'Scientific name is required';
    if (!formData.season) formErrors.season = 'Season is required';
    if (formData.soilTypes.length === 0) formErrors.soilTypes = 'At least one soil type is required';
    if (!formData.waterRequirement) formErrors.waterRequirement = 'Water requirement is required';
    if (!formData.description) formErrors.description = 'Description is required';
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (isEditing) {
        dispatch(updateCrop(formData));
        Alert.alert(
          "Success",
          "Crop updated successfully",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      } else {
        dispatch(addCrop(formData));
        Alert.alert(
          "Success",
          "Crop added successfully",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      }
    } else {
      Alert.alert(
        "Error",
        "Please fill all required fields",
        [{ text: "OK" }]
      );
    }
  };

  const renderMultiSelectDropdown = (
    label, 
    options, 
    selectedValues, 
    onToggle, 
    showDropdown, 
    setShowDropdown, 
    error
  ) => (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>{label}</Text>
      
      <TouchableOpacity
        style={styles.dropdownSelector}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text style={styles.dropdownText}>
          {selectedValues.length > 0 
            ? `${selectedValues.length} selected`
            : 'Select options'}
        </Text>
        <Text style={styles.dropdownIcon}>{showDropdown ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      {showDropdown && (
        <View style={styles.dropdownOptions}>
          {options.map((option) => (
            <TouchableOpacity
              key={typeof option === 'string' ? option : option.value}
              style={[
                styles.dropdownOption,
                selectedValues.includes(typeof option === 'string' ? option : option.label) && 
                  styles.selectedDropdownOption,
              ]}
              onPress={() => onToggle(typeof option === 'string' ? option : option.label)}
            >
              <Text
                style={[
                  styles.dropdownOptionText,
                  selectedValues.includes(typeof option === 'string' ? option : option.label) && 
                    styles.selectedDropdownOptionText,
                ]}
              >
                {typeof option === 'string' ? option : option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  const renderSingleSelectDropdown = (
    label, 
    options, 
    selectedValue, 
    onSelect, 
    showDropdown, 
    setShowDropdown, 
    error
  ) => (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>{label}</Text>
      
      <TouchableOpacity
        style={styles.dropdownSelector}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text style={styles.dropdownText}>
          {selectedValue || 'Select an option'}
        </Text>
        <Text style={styles.dropdownIcon}>{showDropdown ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      {showDropdown && (
        <View style={styles.dropdownOptions}>
          {options.map((option) => (
            <TouchableOpacity
              key={typeof option === 'string' ? option : option.value}
              style={[
                styles.dropdownOption,
                selectedValue === (typeof option === 'string' ? option : option.label) && 
                  styles.selectedDropdownOption,
              ]}
              onPress={() => {
                onSelect('season', typeof option === 'string' ? option : option.label);
                setShowDropdown(false);
              }}
            >
              <Text
                style={[
                  styles.dropdownOptionText,
                  selectedValue === (typeof option === 'string' ? option : option.label) && 
                    styles.selectedDropdownOptionText,
                ]}
              >
                {typeof option === 'string' ? option : option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={isEditing ? "Edit Crop" : "Add New Crop"} />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TextInput
          label="Crop Name"
          placeholder="Enter crop name"
          value={formData.name}
          onChangeText={(value) => handleChange('name', value)}
          error={errors.name}
        />
        
        <TextInput
          label="Scientific Name"
          placeholder="Enter scientific name"
          value={formData.scientificName}
          onChangeText={(value) => handleChange('scientificName', value)}
          error={errors.scientificName}
        />
        
        {renderSingleSelectDropdown(
          'Season',
          SEASONS,
          formData.season,
          handleChange,
          showSeasonsDropdown,
          setShowSeasonsDropdown,
          errors.season
        )}
        
        {renderMultiSelectDropdown(
          'Soil Types',
          SOIL_TYPES,
          formData.soilTypes,
          handleToggleSoilType,
          showSoilTypesDropdown,
          setShowSoilTypesDropdown,
          errors.soilTypes
        )}
        
        <View style={styles.waterRequirementContainer}>
          <Text style={styles.label}>Water Requirement</Text>
          <View style={styles.waterRequirementOptions}>
            <Button
              title="Low"
              onPress={() => handleChange('waterRequirement', 'Low')}
              type={formData.waterRequirement === 'Low' ? 'primary' : 'outline'}
              size="small"
              style={styles.waterRequirementButton}
            />
            <Button
              title="Medium"
              onPress={() => handleChange('waterRequirement', 'Medium')}
              type={formData.waterRequirement === 'Medium' ? 'primary' : 'outline'}
              size="small"
              style={styles.waterRequirementButton}
            />
            <Button
              title="High"
              onPress={() => handleChange('waterRequirement', 'High')}
              type={formData.waterRequirement === 'High' ? 'primary' : 'outline'}
              size="small"
              style={styles.waterRequirementButton}
            />
          </View>
          {errors.waterRequirement && <Text style={styles.errorText}>{errors.waterRequirement}</Text>}
        </View>
        
        {renderMultiSelectDropdown(
          'Recommended Fertilizers',
          fertilizers.map(f => f.name),
          formData.fertilizers,
          handleToggleFertilizer,
          showFertilizersDropdown,
          setShowFertilizersDropdown
        )}
        
        <TextInput
          label="Description"
          placeholder="Enter crop description"
          value={formData.description}
          onChangeText={(value) => handleChange('description', value)}
          multiline
          numberOfLines={4}
          error={errors.description}
        />
        
        <View style={styles.imageUploadContainer}>
          <Text style={styles.label}>Crop Image</Text>
          <Button
            title="Upload Image"
            type="outline"
            onPress={() => {
              // In a real app, this would open an image picker
              Alert.alert("Feature Coming Soon", "Image upload functionality will be available in the next update.");
            }}
          />
          <Text style={styles.imageStatus}>
            {formData.image ? 'Image uploaded' : 'No image uploaded'}
          </Text>
        </View>
        
        <View style={styles.formActions}>
          <Button
            title="Cancel"
            onPress={() => navigation.goBack()}
            type="outline"
            style={styles.cancelButton}
          />
          <Button
            title={isEditing ? "Update Crop" : "Add Crop"}
            onPress={handleSubmit}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SIZES.lg,
    paddingBottom: SIZES.xxl,
  },
  label: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
  },
  dropdownContainer: {
    marginBottom: SIZES.md,
    zIndex: 10,
    position: 'relative',
  },
  dropdownSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.sm,
    paddingHorizontal: SIZES.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dropdownText: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  dropdownIcon: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.primary,
  },
  dropdownOptions: {
    position: 'absolute',
    top: 75,
    left: 0,
    right: 0,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    zIndex: 20,
    maxHeight: 200,
    overflow: 'scroll',
  },
  dropdownOption: {
    paddingVertical: SIZES.sm,
    paddingHorizontal: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  selectedDropdownOption: {
    backgroundColor: COLORS.primary,
  },
  dropdownOptionText: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  selectedDropdownOptionText: {
    ...FONTS.medium,
    color: COLORS.textPrimary,
  },
  errorText: {
    ...FONTS.regular,
    fontSize: 12,
    color: COLORS.error,
    marginTop: 2,
  },
  waterRequirementContainer: {
    marginBottom: SIZES.md,
  },
  waterRequirementOptions: {
    flexDirection: 'row',
    marginBottom: SIZES.xs,
  },
  waterRequirementButton: {
    marginRight: SIZES.sm,
    flex: 1,
  },
  imageUploadContainer: {
    marginBottom: SIZES.lg,
  },
  imageStatus: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: SIZES.xs,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.lg,
  },
  cancelButton: {
    flex: 0.48,
  },
  submitButton: {
    flex: 0.48,
  },
});

export default CropFormScreen;
