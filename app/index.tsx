import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, ActivityIndicator, useColorScheme } from 'react-native';

export default function Index() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Add a small delay to allow the navigation stack to stabilize before redirecting.
    const timer = setTimeout(() => {
      router.replace('/categories');
    }, 100); // A 100ms delay is a safe, standard value for this.

    return () => clearTimeout(timer); // Clean up the timer if the component unmounts.
  }, [router]);

  // Show a loading indicator during the brief delay.
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colorScheme === 'dark' ? '#121212' : '#FFFFFF' }}>
      <ActivityIndicator size="large" color={colorScheme === 'dark' ? '#FFFFFF' : '#000000'} />
    </View>
  );
}
