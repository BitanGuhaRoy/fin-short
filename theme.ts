import { useColorScheme } from 'react-native';

export interface ThemeColors {
  background: string;
  text: string;
  secondaryText: string;
  primary: string;
  border: string;
  card: string;
  error: string;
  errorBackground: string;
}

export const lightTheme: ThemeColors = {
  background: '#f8f9fa',
  text: '#1a1f36',
  secondaryText: '#6b778c',
  primary: '#007AFF',
  border: '#ddd',
  card: '#FFFFFF',
  error: '#c62828',
  errorBackground: '#ffebee',
};

export const darkTheme: ThemeColors = {
  background: '#121212',
  text: '#FFFFFF',
  secondaryText: '#999999',
  primary: '#007AFF',
  border: '#2D2D2D',
  card: '#2D2D2D',
  error: '#ff6b6b',
  errorBackground: '#333333',
};

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  return theme;
};
