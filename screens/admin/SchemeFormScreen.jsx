import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addScheme, updateScheme } from '../../store/slices/schemeSlice';
import { COLORS, FONTS, SIZES } from '../../utils/theme';
import Header from '../../components/ui/Header';
import TextInput from '../../components/ui/TextInput';
import Button from '../../components/ui/Button';

const SchemeFormScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isEditing = route.params?.isEditing || false;
  const existingScheme = route.params?.scheme || null;
  
  const [formData, setFormData] = useState({
    id: isEditing ? existingScheme.id : Math.random().toString(36).substr(2, 9),
    title: '',
    description: '',
    eligibility: '',
    benefits: '',
    deadline: '',
    status: 'Active',
    image: null,
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && existingScheme) {
      setFormData({
        id: existingScheme.id,
        title: existingScheme.title,
        description: existingScheme.description,
        eligibility: existingScheme.eligibility,
        benefits: existingScheme.benefits,
        deadline: existingScheme.deadline,
        status: existingScheme.status,
        image: existingScheme.image,
      });
    }
  }, [isEditing, existingScheme]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    
    if (!formData.title) formErrors.title = 'Title is required';
    if (!formData.description) formErrors.description = 'Description is required';
    if (!formData.eligibility) formErrors.eligibility = 'Eligibility is required';
    if (!formData.benefits) formErrors.benefits = 'Benefits is required';
    if (!formData.deadline) formErrors.deadline = 'Deadline is required';
    if (!formData.status) formErrors.status = 'Status is required';
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (isEditing) {
        dispatch(updateScheme(formData));
        Alert.alert(
          "Success",
          "Scheme updated successfully",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      } else {
        dispatch(addScheme(formData));
        Alert.alert(
          "Success",
          "Scheme added successfully",
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

  return (
    <View style={styles.container}>
      <Header title={isEditing ? "Edit Scheme" : "Add New Scheme"} />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TextInput
          label="Scheme Title"
          placeholder="Enter scheme title"
          value={formData.title}
          onChangeText={(value) => handleChange('title', value)}
          error={errors.title}
        />
        
        <TextInput
          label="Description"
          placeholder="Enter scheme description"
          value={formData.description}
          onChangeText={(value) => handleChange('description', value)}
          multiline
          numberOfLines={4}
          error={errors.description}
        />
        
        <TextInput
          label="Eligibility"
          placeholder="Enter eligibility criteria"
          value={formData.eligibility}
          onChangeText={(value) => handleChange('eligibility', value)}
          multiline
          numberOfLines={3}
          error={errors.eligibility}
        />
        
        <TextInput
          label="Benefits"
          placeholder="Enter scheme benefits"
          value={formData.benefits}
          onChangeText={(value) => handleChange('benefits', value)}
          multiline
          numberOfLines={3}
          error={errors.benefits}
        />
        
        <TextInput
          label="Deadline (YYYY-MM-DD)"
          placeholder="Enter application deadline"
          value={formData.deadline}
          onChangeText={(value) => handleChange('deadline', value)}
          error={errors.deadline}
        />
        
        <View style={styles.statusContainer}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusOptions}>
            <Button
              title="Active"
              onPress={() => handleChange('status', 'Active')}
              type={formData.status === 'Active' ? 'primary' : 'outline'}
              size="small"
              style={styles.statusButton}
            />
            <Button
              title="Upcoming"
              onPress={() => handleChange('status', 'Upcoming')}
              type={formData.status === 'Upcoming' ? 'primary' : 'outline'}
              size="small"
              style={styles.statusButton}
            />
            <Button
              title="Expired"
              onPress={() => handleChange('status', 'Expired')}
              type={formData.status === 'Expired' ? 'primary' : 'outline'}
              size="small"
              style={styles.statusButton}
            />
          </View>
          {errors.status && <Text style={styles.errorText}>{errors.status}</Text>}
        </View>
        
        <View style={styles.imageUploadContainer}>
          <Text style={styles.label}>Scheme Image</Text>
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
            title={isEditing ? "Update Scheme" : "Add Scheme"}
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
  statusContainer: {
    marginBottom: SIZES.md,
  },
  statusOptions: {
    flexDirection: 'row',
    marginBottom: SIZES.xs,
  },
  statusButton: {
    marginRight: SIZES.sm,
    flex: 1,
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

export default SchemeFormScreen;
