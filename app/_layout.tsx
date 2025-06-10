import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { View, useColorScheme, SafeAreaView, ActivityIndicator } from 'react-native';
import { useEffect } from 'react';

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const publishableKey = 'pk_test_b3JnYW5pYy1kcmFrZS03NS5jbGVyay5hY2NvdW50cy5kZXYk';

if (!publishableKey) {
  throw new Error("Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Make sure it's set in your .env file.");
}

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const themedBackgroundColor = colorScheme === 'dark' ? '#121212' : '#FFFFFF';

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (isSignedIn && inAuthGroup) {
      router.replace('/');
    } else if (!isSignedIn && !inAuthGroup) {
      router.replace('/(auth)/login');
    }
  }, [isLoaded, isSignedIn, segments, router]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: themedBackgroundColor }}>
        <ActivityIndicator size="large" color={colorScheme === 'dark' ? '#FFFFFF' : '#000000'} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themedBackgroundColor }}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} translucent={true} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="categories" />
        <Stack.Screen name="feed" />
        <Stack.Screen name="article-detail" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="not-found" />
        <Stack.Screen name="(auth)/login" />
      </Stack>
    </SafeAreaView>
  );
};

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <InitialLayout />
    </ClerkProvider>
  );
}
