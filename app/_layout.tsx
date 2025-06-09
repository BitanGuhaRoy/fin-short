import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
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

// Ensure this key is in your .env file
const publishableKey = "pk_test_c291bmQtYmVhZ2xlLTYwLmNsZXJrLmFjY291bnRzLmRldiQ";

if (!publishableKey) {
  throw new Error("Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Make sure it's set in your .env file.");
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  return (
    <>
      <StatusBar style="auto" />
      <SignedIn>
        {/* Screens accessible when the user is signed in */}
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="categories" options={{ headerShown: false }} />
          <Stack.Screen name="feed" options={{ headerShown: false }} />
          <Stack.Screen name="article-detail" options={{ headerShown: false }} /> 
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* Add other authenticated screens/layouts here */}
          <Stack.Screen name="not-found" options={{ headerShown: false }} />
        </Stack>
      </SignedIn>
      <SignedOut>
        {/* Auth screens, typically in a dedicated (auth) group */}
        <Stack>
          <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
          {/* You might have a sign-up screen here too e.g. (auth)/signup */}
          {/* Add a catch-all or redirect for other paths when signed out if necessary */}
        </Stack>
      </SignedOut>
    </>
  );
}
