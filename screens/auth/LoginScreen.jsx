import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { COLORS, FONTS, SIZES } from '../../utils/theme';
import TextInput from '../../components/ui/TextInput';
import Button from '../../components/ui/Button';
import Loading from '../../components/ui/Loading';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const validateForm = () => {
    let formErrors = {};
    
    if (!email) formErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) formErrors.email = 'Email is invalid';
    
    if (!password) formErrors.password = 'Password is required';
    else if (password.length < 6) formErrors.password = 'Password must be at least 6 characters';
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      dispatch(login({ email, password }));
    }
  };

  const handleFarmerLogin = () => {
    setEmail('farmer@example.com');
    setPassword('password');
    setTimeout(() => {
      dispatch(login({ email: 'farmer@example.com', password: 'password' }));
    }, 500);
  };

  const handleAdminLogin = () => {
    setEmail('admin@example.com');
    setPassword('admin');
    setTimeout(() => {
      dispatch(login({ email: 'admin@example.com', password: 'admin' }));
    }, 500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
          <Text style={styles.appName}>UZAA</Text>
          <Text style={styles.tagline}>Your Agricultural Assistant</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Login</Text>
          
          {error && <Text style={styles.errorText}>{error}</Text>}

          <TextInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            error={errors.email}
          />

          <TextInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
          />

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            title="Login"
            onPress={handleLogin}
            loading={isLoading}
            disabled={isLoading}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.quickLoginContainer}>
            <Button
              title="Farmer Demo"
              onPress={handleFarmerLogin}
              type="outline"
              style={styles.quickLoginButton}
            />
            <Button
              title="Admin Demo"
              onPress={handleAdminLogin}
              type="outline"
              style={styles.quickLoginButton}
            />
          </View>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: SIZES.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: SIZES.xxl,
    marginBottom: SIZES.xl,
  },
  logo: {
    width: 100,
    height: 100,
  },
  appName: {
    ...FONTS.bold,
    fontSize: 32,
    color: COLORS.primary,
    marginTop: SIZES.md,
  },
  tagline: {
    ...FONTS.regular,
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: SIZES.xs,
  },
  formContainer: {
    paddingHorizontal: SIZES.xl,
  },
  title: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.textPrimary,
    marginBottom: SIZES.lg,
  },
  errorText: {
    ...FONTS.regular,
    color: COLORS.error,
    marginBottom: SIZES.md,
    textAlign: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: SIZES.lg,
  },
  forgotPasswordText: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.primary,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    ...FONTS.medium,
    color: COLORS.textSecondary,
    marginHorizontal: SIZES.sm,
  },
  quickLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.xl,
  },
  quickLoginButton: {
    flex: 0.48,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.lg,
  },
  registerText: {
    ...FONTS.regular,
    color: COLORS.textSecondary,
    marginRight: SIZES.xs,
  },
  registerLink: {
    ...FONTS.medium,
    color: COLORS.primary,
  },
});

export default LoginScreen;
