import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useOAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'; // Assuming hooks are aliased to @/hooks or adjust path
import { Ionicons } from '@expo/vector-icons'; // For Google icon


export default function LoginScreen() {
  useWarmUpBrowser(); // Warm up the browser for a smoother OAuth experience
  const router = useRouter();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPressGoogleSignIn = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
        router.replace('/'); // Navigate to home or dashboard after successful sign-in
      } else {
        // Use signIn or signUp for next steps such as MFA
        // This might happen if the user needs to complete a multi-factor authentication step
        // or if they are signing up for the first time and need to complete their profile.
        // For this example, we'll keep it simple.
        if (signIn?.firstFactorVerification.status === 'transferable') {
          // Handle transfer if necessary, or prompt for next step
        }
        if (signUp && signUp.missingFields && signUp.missingFields.length > 0) {
          // Navigate to a screen to complete missing fields
        }
        console.log("OAuth flow started, but session not immediately created. Handle next steps.");
      }
    } catch (err) {
      console.error('OAuth error', err);
      // Handle error (e.g., show a message to the user)
    }
  }, [startOAuthFlow, router]);

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
          style={[styles.button, styles.googleButton]}
          onPress={onPressGoogleSignIn}
        >
          <Ionicons name="logo-google" size={24} color="#DB4437" style={styles.icon} />
          <Text style={[styles.buttonText, styles.googleButtonText]}>Sign in with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.guestButton]}
          onPress={handleGuestLogin}
        >
          <Text style={[styles.buttonText, styles.guestButtonText]}>Continue as Guest</Text>
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
    alignItems: 'center', // Center buttons
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: '100%', // Make buttons take full width of content container
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
    borderWidth: 1,
  },
  guestButton: {
    backgroundColor: '#EFEFEF', // A slightly different background for guest
    borderColor: '#CCCCCC',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  googleButtonText: {
    color: '#333333',
    marginLeft: 10,
  },
  guestButtonText: {
    color: '#555555',
  },
  icon: {
    marginRight: 10,
  }
});
