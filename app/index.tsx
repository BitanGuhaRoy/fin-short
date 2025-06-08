import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme, ColorSchemeName } from 'react-native';
import { getStyle } from '../utils/styles';

export default function Home() {
  const router = useRouter();
  const colorScheme = useColorScheme() as ColorSchemeName;
  const styles = getStyle(colorScheme as 'light' | 'dark');

  useEffect(() => {
    // Delay navigation slightly to ensure root layout is mounted
    setTimeout(() => {
      router.replace('/categories');
    }, 100);
  }, [router]);

  return null;
}
