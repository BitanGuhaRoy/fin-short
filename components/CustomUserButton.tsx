import React from 'react';
import { TouchableOpacity, Text, StyleSheet, useColorScheme } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

const CustomUserButton = () => {
  const { isLoaded, signOut } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme();

  const theme = {
    cardBackgroundColor: colorScheme === 'dark' ? '#1C1C1E' : '#FFFFFF',
    textColor: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
  };

  const handleSignOut = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      await signOut();
      // The <SignedOut> component in _layout will now render the login screen.
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <TouchableOpacity onPress={handleSignOut} style={[styles.buttonContainer, { backgroundColor: theme.cardBackgroundColor }]}>
      <Text style={[styles.buttonText, { color: theme.textColor }]}>
        Sign Out
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CustomUserButton;
