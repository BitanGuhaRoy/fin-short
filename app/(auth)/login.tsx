import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, useColorScheme, ColorSchemeName, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { useOAuth } from '@clerk/clerk-expo';
import * as WebBrowser from "expo-web-browser";
import { Ionicons } from '@expo/vector-icons';

const useWarmUpBrowser = () => {
  React.useEffect(() => {
    if (Platform.OS === 'web') return;
    // Warm up the browser to improve UX
    // https://docs.expo.dev/versions/latest/sdk/webbrowser/#webbrowserwarmupasyncbrowserpackagename
    void WebBrowser.warmUpAsync();
    return () => {
      // Cool down the browser when the component unmounts
      // https://docs.expo.dev/versions/latest/sdk/webbrowser/#webbrowsercooldownasyncbrowserpackagename
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

export default function LoginScreen() {
  useWarmUpBrowser(); // Warm up the browser for a smoother OAuth experience
  const router = useRouter();
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPressGoogleSignIn = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        // The <SignedIn> component in _layout will now render the authenticated app.
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

  return (
    <ImageBackground 
      source={require('../../assets/fin.jpg')} 
      style={styles.container}
      blurRadius={10}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.tip}>  Not sure where to begin with Tax, Crypto, Mutual Funds, or anything else? Sign in and switch on Beginner Mode to get started.
          </Text>
          <Text style={styles.title}>Welcome to FinShort</Text>
          <Text style={styles.tagline}>We keep you updated and aware of the current market.</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
          {/* <Text style={styles.description}>Stay informed with daily financial news, simplified for you.</Text> */}
          <TouchableOpacity
            style={[styles.button, styles.googleButton]}
            onPress={onPressGoogleSignIn}
          >
            <Ionicons name="logo-google" size={24} color="#DB4437" style={styles.icon} />
            <Text style={[styles.buttonText, styles.googleButtonText]}>Sign in with Google</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ImageBackground>
  );
}

const getStyles = (colorScheme: ColorSchemeName) => StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      padding: 20,
    },
    content: {
      width: '100%',
      alignItems: 'center',
      padding: 25,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    title: {
      fontSize: 42,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
      marginBottom: 15,
      fontFamily: Platform.OS === 'ios' ? 'Avenir Next' : 'Roboto',
    },
    tagline: {
      fontSize: 18,
      color: '#E0E0E0',
      textAlign: 'center',
      marginBottom: 25,
      fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif-light',
    },
    subtitle: {
      fontSize: 22,
      color: '#FFFFFF',
      textAlign: 'center',
      marginBottom: 35,
      fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif',
    },
    tip: {
      fontSize: 16,
      fontStyle: 'italic',
      color: '#D1D1D1',
      textAlign: 'center',
      marginBottom: 45,
      paddingHorizontal: 20,
      fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif-light',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 18,
      paddingHorizontal: 35,
      borderRadius: 35,
      marginVertical: 10,
      width: '95%',
      elevation: 4,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
    },
    googleButton: {
      backgroundColor: '#FFFFFF',
    },
    googleButtonText: {
      color: '#212121',
      fontSize: 18,
      fontWeight: '600',
      marginLeft: 15,
    },
    icon: {
      marginRight: 15,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
