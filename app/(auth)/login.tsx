import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  const handleGuestLogin = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to FinShort</Text>
      <Text style={styles.subtitle}>Your Personal Finance Assistant</Text>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome to FinShort</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
        <TouchableOpacity
          style={styles.guestButton}
          onPress={handleGuestLogin}
        >
          <Text style={styles.guestButtonText}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1f36',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b778c',
    marginBottom: 32,
    textAlign: 'center',
  },
  content: {
    width: '90%',
    maxWidth: 400,
  },
  guestButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4285F4',
    borderRadius: 8,
    padding: 16,
    width: '90%',
    maxWidth: 400,
  },
  guestButtonText: {
    color: '#4285F4',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
