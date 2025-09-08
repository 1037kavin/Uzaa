import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { applyForScheme } from '../../store/slices/schemeSlice';
import { COLORS, FONTS, SIZES } from '../../utils/theme';
import Header from '../../components/ui/Header';
import TextInput from '../../components/ui/TextInput';
import Button from '../../components/ui/Button';

const SchemeApplicationScreen = ({ navigation, route }) => {
  const { scheme } = route.params;
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.schemes);
  const { user } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.location || '',
    landSize: user?.farmSize || '',
    aadharNumber: '',
    bankAccountNumber: '',
    ifscCode: '',
    additionalInfo: '',
  });
  
  const [errors, setErrors] = useState({});
  const [documentUploads, setDocumentUploads] = useState({
    identityProof: false,
    landRecords: false,
    bankDetails: false,
    photograph: false,
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    
    if (!formData.fullName) formErrors.fullName = 'Full name is required';
    if (!formData.phone) formErrors.phone = 'Phone number is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.address) formErrors.address = 'Address is required';
    if (!formData.landSize) formErrors.landSize = 'Land size is required';
    if (!formData.aadharNumber) formErrors.aadharNumber = 'Aadhar number is required';
    else if (formData.aadharNumber.length !== 12) formErrors.aadharNumber = 'Aadhar number must be 12 digits';
    if (!formData.bankAccountNumber) formErrors.bankAccountNumber = 'Bank account number is required';
    if (!formData.ifscCode) formErrors.ifscCode = 'IFSC code is required';
    
    // Check if all documents are uploaded
    if (!documentUploads.identityProof) formErrors.identityProof = 'Identity proof is required';
    if (!documentUploads.landRecords) formErrors.landRecords = 'Land records are required';
    if (!documentUploads.bankDetails) formErrors.bankDetails = 'Bank details are required';
    if (!documentUploads.photograph) formErrors.photograph = 'Photograph is required';
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleUploadDocument = (documentType) => {
    // In a real app, this would open a document picker
    // For now, we'll just toggle the upload status
    setDocumentUploads({
      ...documentUploads,
      [documentType]: true,
    });
    
    // Clear error
    if (errors[documentType]) {
      setErrors({ ...errors, [documentType]: null });
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(applyForScheme(scheme.id, formData));
      
      // Show success alert
      Alert.alert(
        "Application Submitted",
        "Your application for the scheme has been submitted successfully. You will receive updates on your application status.",
        [
          { 
            text: "OK", 
            onPress: () => navigation.navigate('SchemesMain')
          }
        ]
      );
    } else {
      // Show error alert
      Alert.alert(
        "Form Incomplete",
        "Please fill all required fields and upload all required documents.",
        [{ text: "OK" }]
      );
    }
  };

  const renderDocumentUpload = (title, documentType) => (
    <View style={styles.documentUploadItem}>
      <View style={styles.documentInfo}>
        <Text style={styles.documentTitle}>{title}</Text>
        <Text style={styles.documentStatus}>
          {documentUploads[documentType] ? 'Uploaded' : 'Not Uploaded'}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.uploadButton,
          documentUploads[documentType] && styles.uploadedButton,
        ]}
        onPress={() => handleUploadDocument(documentType)}
      >
        <Text style={styles.uploadButtonText}>
          {documentUploads[documentType] ? 'Change' : 'Upload'}
        </Text>
      </TouchableOpacity>
      {errors[documentType] && (
        <Text style={styles.errorText}>{errors[documentType]}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={`Apply for ${scheme.title}`} />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <TextInput
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChangeText={(value) => handleChange('fullName', value)}
            error={errors.fullName}
          />
          
          <TextInput
            label="Phone Number"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChangeText={(value) => handleChange('phone', value)}
            keyboardType="phone-pad"
            error={errors.phone}
          />
          
          <TextInput
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(value) => handleChange('email', value)}
            keyboardType="email-address"
            error={errors.email}
          />
          
          <TextInput
            label="Address"
            placeholder="Enter your address"
            value={formData.address}
            onChangeText={(value) => handleChange('address', value)}
            multiline
            numberOfLines={3}
            error={errors.address}
          />
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Land Details</Text>
          
          <TextInput
            label="Land Size (in acres)"
            placeholder="Enter land size"
            value={formData.landSize}
            onChangeText={(value) => handleChange('landSize', value)}
            keyboardType="numeric"
            error={errors.landSize}
          />
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Bank Details</Text>
          
          <TextInput
            label="Aadhar Number"
            placeholder="Enter 12-digit Aadhar number"
            value={formData.aadharNumber}
            onChangeText={(value) => handleChange('aadharNumber', value)}
            keyboardType="numeric"
            maxLength={12}
            error={errors.aadharNumber}
          />
          
          <TextInput
            label="Bank Account Number"
            placeholder="Enter bank account number"
            value={formData.bankAccountNumber}
            onChangeText={(value) => handleChange('bankAccountNumber', value)}
            keyboardType="numeric"
            error={errors.bankAccountNumber}
          />
          
          <TextInput
            label="IFSC Code"
            placeholder="Enter bank IFSC code"
            value={formData.ifscCode}
            onChangeText={(value) => handleChange('ifscCode', value)}
            autoCapitalize="characters"
            error={errors.ifscCode}
          />
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Document Upload</Text>
          
          {renderDocumentUpload('Identity Proof (Aadhar/PAN)', 'identityProof')}
          {renderDocumentUpload('Land Records/Ownership Documents', 'landRecords')}
          {renderDocumentUpload('Bank Account Details', 'bankDetails')}
          {renderDocumentUpload('Passport Size Photograph', 'photograph')}
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Additional Information</Text>
          
          <TextInput
            placeholder="Any additional information you want to provide"
            value={formData.additionalInfo}
            onChangeText={(value) => handleChange('additionalInfo', value)}
            multiline
            numberOfLines={4}
          />
        </View>
        
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By submitting this application, I hereby declare that all the information provided is true to the best of my knowledge.
          </Text>
        </View>
        
        <Button
          title="Submit Application"
          onPress={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
          style={styles.submitButton}
        />
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
  formSection: {
    marginBottom: SIZES.xl,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: 18,
    color: COLORS.primary,
    marginBottom: SIZES.md,
  },
  documentUploadItem: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginBottom: SIZES.sm,
  },
  documentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  documentTitle: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.textPrimary,
    flex: 1,
  },
  documentStatus: {
    ...FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  uploadButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.xs,
    alignItems: 'center',
  },
  uploadedButton: {
    backgroundColor: COLORS.secondary,
  },
  uploadButtonText: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  errorText: {
    ...FONTS.regular,
    fontSize: 12,
    color: COLORS.error,
    marginTop: SIZES.xs,
  },
  termsContainer: {
    marginBottom: SIZES.lg,
  },
  termsText: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  submitButton: {
    marginBottom: SIZES.xl,
  },
});

export default SchemeApplicationScreen;
