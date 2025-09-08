import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/slices/authSlice';
import { COLORS, FONTS, SIZES } from '../../utils/theme';
import TextInput from '../../components/ui/TextInput';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    
    if (!formData.name) formErrors.name = 'Name is required';
    
    if (!formData.email) formErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'Email is invalid';
    
    if (!formData.phone) formErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) formErrors.phone = 'Phone number must be 10 digits';
    
    if (!formData.password) formErrors.password = 'Password is required';
    else if (formData.password.length < 6) formErrors.password = 'Password must be at least 6 characters';
    
    if (!formData.confirmPassword) formErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      dispatch(register(formData));
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Create Account"
        showBackButton={true}
        style={styles.header}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.formContainer}>
            {error && <Text style={styles.errorText}>{error}</Text>}

            <TextInput
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChangeText={(value) => handleChange('name', value)}
              error={errors.name}
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
              label="Phone Number"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChangeText={(value) => handleChange('phone', value)}
              keyboardType="phone-pad"
              error={errors.phone}
            />

            <TextInput
              label="Password"
              placeholder="Create a password"
              value={formData.password}
              onChangeText={(value) => handleChange('password', value)}
              secureTextEntry
              error={errors.password}
            />

            <TextInput
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange('confirmPassword', value)}
              secureTextEntry
              error={errors.confirmPassword}
            />

            <Button
              title="Register"
              onPress={handleRegister}
              loading={isLoading}
              disabled={isLoading}
              style={styles.registerButton}
            />

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: SIZES.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: SIZES.lg,
  },
  logo: {
    width: 80,
    height: 80,
  },
  formContainer: {
    paddingHorizontal: SIZES.xl,
  },
  errorText: {
    ...FONTS.regular,
    color: COLORS.error,
    marginBottom: SIZES.md,
    textAlign: 'center',
  },
  registerButton: {
    marginTop: SIZES.lg,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.xl,
  },
  loginText: {
    ...FONTS.regular,
    color: COLORS.textSecondary,
    marginRight: SIZES.xs,
  },
  loginLink: {
    ...FONTS.medium,
    color: COLORS.primary,
  },
});

export default RegisterScreen;
