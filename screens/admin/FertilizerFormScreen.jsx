import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFertilizer, updateFertilizer } from '../../store/slices/cropSlice';
import { COLORS, FONTS, SIZES } from '../../utils/theme';
import Header from '../../components/ui/Header';
import TextInput from '../../components/ui/TextInput';
import Button from '../../components/ui/Button';

const FertilizerFormScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { crops } = useSelector((state) => state.crops);
  const isEditing = route.params?.isEditing || false;
  const existingFertilizer = route.params?.fertilizer || null;
  
  const [formData, setFormData] = useState({
    id: isEditing ? existingFertilizer.id : Math.random().toString(36).substr(2, 9),
    name: '',
    nutrientContent: '',
    crops: [],
    application: '',
    precautions: '',
    image: null,
  });
  
  const [errors, setErrors] = useState({});
  const [showCropsDropdown, setShowCropsDropdown] = useState(false);

  useEffect(() => {
    if (isEditing && existingFertilizer) {
      setFormData({
        id: existingFertilizer.id,
        name: existingFertilizer.name,
        nutrientContent: existingFertilizer.nutrientContent,
        crops: existingFertilizer.crops,
        application: existingFertilizer.application,
        precautions: existingFertilizer.precautions,
        image: existingFertilizer.image,
      });
    }
  }, [isEditing, existingFertilizer]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleToggleCrop = (cropName) => {
    const updatedCrops = [...formData.crops];
    const index = updatedCrops.indexOf(cropName);
    
    if (index === -1) {
      updatedCrops.push(cropName);
    } else {
      updatedCrops.splice(index, 1);
    }
    
    handleChange('crops', updatedCrops);
  };

  const validateForm = () => {
    let formErrors = {};
    
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.nutrientContent) formErrors.nutrientContent = 'Nutrient content is required';
    if (formData.crops.length === 0) formErrors.crops = 'At least one crop is required';
    if (!formData.application) formErrors.application = 'Application instructions are required';
    if (!formData.precautions) formErrors.precautions = 'Precautions are required';
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (isEditing) {
        dispatch(updateFertilizer(formData));
        Alert.alert(
          "Success",
          "Fertilizer updated successfully",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      } else {
        dispatch(addFertilizer(formData));
        Alert.alert(
          "Success",
          "Fertilizer added successfully",
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

  const renderCropsDropdown = () => (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>Suitable for Crops</Text>
      
      <TouchableOpacity
        style={styles.dropdownSelector}
        onPress={() => setShowCropsDropdown(!showCropsDropdown)}
      >
        <Text style={styles.dropdownText}>
          {formData.crops.length > 0 
            ? `${formData.crops.length} crops selected`
            : 'Select crops'}
        </Text>
        <Text style={styles.dropdownIcon}>{showCropsDropdown ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      
      {errors.crops && <Text style={styles.errorText}>{errors.crops}</Text>}
      
      {showCropsDropdown && (
        <View style={styles.dropdownOptions}>
          {crops.map((crop) => (
            <TouchableOpacity
              key={crop.id}
              style={[
                styles.dropdownOption,
                formData.crops.includes(crop.name) && styles.selectedDropdownOption,
              ]}
              onPress={() => handleToggleCrop(crop.name)}
            >
              <Text
                style={[
                  styles.dropdownOptionText,
                  formData.crops.includes(crop.name) && styles.selectedDropdownOptionText,
                ]}
              >
                {crop.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={isEditing ? "Edit Fertilizer" : "Add New Fertilizer"} />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TextInput
          label="Fertilizer Name"
          placeholder="Enter fertilizer name"
          value={formData.name}
          onChangeText={(value) => handleChange('name', value)}
          error={errors.name}
        />
        
        <TextInput
          label="Nutrient Content"
          placeholder="E.g., Nitrogen (46%)"
          value={formData.nutrientContent}
          onChangeText={(value) => handleChange('nutrientContent', value)}
          error={errors.nutrientContent}
        />
        
        {renderCropsDropdown()}
        
        <TextInput
          label="Application Instructions"
          placeholder="Enter application instructions"
          value={formData.application}
          onChangeText={(value) => handleChange('application', value)}
          multiline
          numberOfLines={3}
          error={errors.application}
        />
        
        <TextInput
          label="Precautions"
          placeholder="Enter precautions"
          value={formData.precautions}
          onChangeText={(value) => handleChange('precautions', value)}
          multiline
          numberOfLines={3}
          error={errors.precautions}
        />
        
        <View style={styles.imageUploadContainer}>
          <Text style={styles.label}>Fertilizer Image</Text>
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
            title={isEditing ? "Update Fertilizer" : "Add Fertilizer"}
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

export default FertilizerFormScreen;
