import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // For demo purposes, use simple validation
    if (email === 'farmer@example.com' && password === 'password') {
      navigation.replace('FarmerHome');
    } else if (email === 'admin@example.com' && password === 'admin') {
      navigation.replace('AdminHome');
    } else {
      alert('Invalid credentials. Try farmer@example.com/password or admin@example.com/admin');
    }
  };

  const handleDemoFarmer = () => {
    setEmail('farmer@example.com');
    setPassword('password');
    setTimeout(() => {
      navigation.replace('FarmerHome');
    }, 500);
  };

  const handleDemoAdmin = () => {
    setEmail('admin@example.com');
    setPassword('admin');
    setTimeout(() => {
      navigation.replace('AdminHome');
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uzaa</Text>
      <Text style={styles.subtitle}>Login to your account</Text>
      
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#B3B3B3"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#B3B3B3"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity 
          style={styles.forgotPassword}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>
        
        <View style={styles.demoContainer}>
          <TouchableOpacity style={styles.demoButton} onPress={handleDemoFarmer}>
            <Text style={styles.demoButtonText}>Farmer Demo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.demoButton} onPress={handleDemoAdmin}>
            <Text style={styles.demoButtonText}>Admin Demo</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1DB954',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#333333',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#1DB954',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#1DB954',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#333333',
  },
  dividerText: {
    color: '#B3B3B3',
    paddingHorizontal: 10,
  },
  demoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  demoButton: {
    borderWidth: 1,
    borderColor: '#1DB954',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    width: '48%',
  },
  demoButtonText: {
    color: '#1DB954',
    fontSize: 14,
    fontWeight: '500',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#B3B3B3',
    marginRight: 5,
  },
  registerLink: {
    color: '#1DB954',
    fontWeight: '500',
  },
});

export default LoginScreen;
