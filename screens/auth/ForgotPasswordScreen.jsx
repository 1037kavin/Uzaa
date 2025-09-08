import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../utils/theme';
import TextInput from '../../components/ui/TextInput';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = () => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    setError('');
    return true;
  };

  const handleResetPassword = () => {
    if (validateEmail()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setEmailSent(true);
        
        // Show success alert
        Alert.alert(
          "Reset Link Sent",
          "A password reset link has been sent to your email. Please check your inbox.",
          [{ text: "OK" }]
        );
      }, 1500);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Forgot Password"
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
            <Text style={styles.title}>Reset Your Password</Text>
            <Text style={styles.subtitle}>
              Enter your email address and we'll send you instructions to reset your password.
            </Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TextInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              error={error}
              editable={!emailSent}
            />

            {!emailSent ? (
              <Button
                title="Send Reset Link"
                onPress={handleResetPassword}
                loading={isLoading}
                disabled={isLoading}
                style={styles.resetButton}
              />
            ) : (
              <Button
                title="Back to Login"
                onPress={() => navigation.navigate('Login')}
                type="outline"
                style={styles.resetButton}
              />
            )}

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Remember your password?</Text>
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
  title: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.textPrimary,
    marginBottom: SIZES.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SIZES.xl,
    textAlign: 'center',
  },
  errorText: {
    ...FONTS.regular,
    color: COLORS.error,
    marginBottom: SIZES.md,
    textAlign: 'center',
  },
  resetButton: {
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

export default ForgotPasswordScreen;
