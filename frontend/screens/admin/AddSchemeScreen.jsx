import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';

const AddSchemeScreen = ({ navigation, route }) => {
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
        // In a real app, this would update the scheme in the backend
        Alert.alert(
          "Success",
          "Scheme updated successfully",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      } else {
        // In a real app, this would add the scheme to the backend
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
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditing ? 'Edit Scheme' : 'Add New Scheme'}
        </Text>
        <View style={styles.headerRight} />
      </View>
      
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Scheme Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter scheme title"
              placeholderTextColor="#B3B3B3"
              value={formData.title}
              onChangeText={(value) => handleChange('title', value)}
            />
            {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter scheme description"
              placeholderTextColor="#B3B3B3"
              value={formData.description}
              onChangeText={(value) => handleChange('description', value)}
              multiline
              numberOfLines={4}
            />
            {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Eligibility</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter eligibility criteria"
              placeholderTextColor="#B3B3B3"
              value={formData.eligibility}
              onChangeText={(value) => handleChange('eligibility', value)}
              multiline
              numberOfLines={3}
            />
            {errors.eligibility && <Text style={styles.errorText}>{errors.eligibility}</Text>}
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Benefits</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter scheme benefits"
              placeholderTextColor="#B3B3B3"
              value={formData.benefits}
              onChangeText={(value) => handleChange('benefits', value)}
              multiline
              numberOfLines={3}
            />
            {errors.benefits && <Text style={styles.errorText}>{errors.benefits}</Text>}
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Deadline (YYYY-MM-DD)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter application deadline"
              placeholderTextColor="#B3B3B3"
              value={formData.deadline}
              onChangeText={(value) => handleChange('deadline', value)}
            />
            {errors.deadline && <Text style={styles.errorText}>{errors.deadline}</Text>}
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Status</Text>
            <View style={styles.statusOptions}>
              <TouchableOpacity
                style={[
                  styles.statusOption,
                  formData.status === 'Active' && styles.selectedStatusOption,
                ]}
                onPress={() => handleChange('status', 'Active')}
              >
                <Text
                  style={[
                    styles.statusOptionText,
                    formData.status === 'Active' && styles.selectedStatusOptionText,
                  ]}
                >
                  Active
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.statusOption,
                  formData.status === 'Upcoming' && styles.selectedStatusOption,
                ]}
                onPress={() => handleChange('status', 'Upcoming')}
              >
                <Text
                  style={[
                    styles.statusOptionText,
                    formData.status === 'Upcoming' && styles.selectedStatusOptionText,
                  ]}
                >
                  Upcoming
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.statusOption,
                  formData.status === 'Expired' && styles.selectedStatusOption,
                ]}
                onPress={() => handleChange('status', 'Expired')}
              >
                <Text
                  style={[
                    styles.statusOptionText,
                    formData.status === 'Expired' && styles.selectedStatusOptionText,
                  ]}
                >
                  Expired
                </Text>
              </TouchableOpacity>
            </View>
            {errors.status && <Text style={styles.errorText}>{errors.status}</Text>}
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Scheme Image</Text>
            <TouchableOpacity style={styles.imageUploadButton}>
              <Text style={styles.imageUploadButtonText}>Upload Image</Text>
            </TouchableOpacity>
            <Text style={styles.imageStatus}>No image uploaded</Text>
          </View>
          
          <View style={styles.formActions}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>
                {isEditing ? 'Update Scheme' : 'Add Scheme'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#0D0D0D',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  formContainer: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#333333',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    fontSize: 12,
    color: '#FF4136',
    marginTop: 4,
  },
  statusOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusOption: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  selectedStatusOption: {
    backgroundColor: '#1DB954',
    borderColor: '#1DB954',
  },
  statusOptionText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  selectedStatusOptionText: {
    fontWeight: 'bold',
  },
  imageUploadButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1DB954',
  },
  imageUploadButtonText: {
    fontSize: 14,
    color: '#1DB954',
  },
  imageStatus: {
    fontSize: 12,
    color: '#B3B3B3',
    marginTop: 8,
    fontStyle: 'italic',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#1DB954',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginLeft: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default AddSchemeScreen;
