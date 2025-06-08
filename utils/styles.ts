import { StyleProp, ViewStyle, TextStyle } from 'react-native';

interface ThemeColors {
  backgroundColor: string;
  textColor: string;
  secondaryTextColor: string;
  tertiaryTextColor: string;
  cardBackgroundColor: string;
  borderColor: string;
  accentColor: string;
  selectedBackgroundColor: string;
  selectedTextColor: string;
  selectedBorderColor: string;
}

const lightTheme: ThemeColors = {
  backgroundColor: '#f5f5f5',
  textColor: '#1a1a1a',
  secondaryTextColor: '#666666',
  tertiaryTextColor: '#999999',
  cardBackgroundColor: '#ffffff',
  borderColor: '#e0e0e0',
  accentColor: '#4a90e2',
  selectedBackgroundColor: '#4a90e2',
  selectedTextColor: '#ffffff',
  selectedBorderColor: '#4a90e2',
};

const darkTheme: ThemeColors = {
  backgroundColor: '#121212',
  textColor: '#ffffff',
  secondaryTextColor: '#cccccc',
  tertiaryTextColor: '#888888',
  cardBackgroundColor: '#2a2a2a',
  borderColor: '#333333',
  accentColor: '#4a90e2',
  selectedBackgroundColor: '#4a90e2',
  selectedTextColor: '#ffffff',
  selectedBorderColor: '#4a90e2',
};

interface StyleObject {
  container: StyleProp<ViewStyle>;
  content: StyleProp<ViewStyle>;
  title: StyleProp<TextStyle>;
  subtitle: StyleProp<TextStyle>;
  button: StyleProp<ViewStyle>;
  buttonText: StyleProp<TextStyle>;
  categoryContainer: StyleProp<ViewStyle>;
  categoryCard: StyleProp<ViewStyle>;
  selectedCard: StyleProp<ViewStyle>;
  categoryTitle: StyleProp<TextStyle>;
  categoryDescription: StyleProp<TextStyle>;
  categoryIconContainer: StyleProp<ViewStyle>;
  categoryContent: StyleProp<ViewStyle>;
  categoryEmoji: StyleProp<TextStyle>;
  contentContainer: StyleProp<ViewStyle>;
  backgroundColor: string;
}

export const getStyle = (colorScheme: 'light' | 'dark'): StyleObject => {
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  return {
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.backgroundColor,
    } as StyleProp<ViewStyle>,
    content: {
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      marginBottom: 40,
      flex: 1,
    } as StyleProp<ViewStyle>,
    title: {
      fontSize: 28,
      fontWeight: 'bold' as const,
      marginBottom: 8,
      textAlign: 'center' as const,
    } as StyleProp<TextStyle>,
    subtitle: {
      fontSize: 16,
      color: theme.secondaryTextColor,
      textAlign: 'center' as const,
      marginBottom: 40,
    } as StyleProp<TextStyle>,
    button: {
      padding: 16,
      borderRadius: 12,
      alignItems: 'center' as const,
      width: '100%' as const,
      maxWidth: 400,
      marginVertical: 20,
      backgroundColor: theme.accentColor,
    } as StyleProp<ViewStyle>,
    buttonText: {
      fontSize: 18,
      fontWeight: '600' as const,
      letterSpacing: 0.5,
      color: theme.textColor,
    } as StyleProp<TextStyle>,
    categoryContainer: {
      flexDirection: 'row' as const,
      flexWrap: 'wrap' as const,
      justifyContent: 'space-between' as const,
      gap: 15,
      paddingHorizontal: 10,
    } as StyleProp<ViewStyle>,
    categoryCard: {
      borderRadius: 20,
      padding: 25,
      width: '48%' as const,
      borderWidth: 1,
      borderColor: theme.borderColor,
      elevation: 4,
      shadowColor: theme.textColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      backgroundColor: theme.cardBackgroundColor,
    } as StyleProp<ViewStyle>,
    selectedCard: {
      borderWidth: 2,
      borderColor: theme.selectedBorderColor,
      elevation: 8,
      shadowOpacity: 0.2,
      shadowRadius: 8,
      backgroundColor: theme.selectedBackgroundColor,
    } as StyleProp<ViewStyle>,
    categoryTitle: {
      fontSize: 18,
      fontWeight: 'bold' as const,
      marginBottom: 8,
      color: theme.textColor,
    } as StyleProp<TextStyle>,
    categoryDescription: {
      fontSize: 14,
      color: theme.secondaryTextColor,
    } as StyleProp<TextStyle>,
    categoryIconContainer: {
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      marginBottom: 15,
    } as StyleProp<ViewStyle>,
    categoryContent: {
      paddingHorizontal: 10,
    } as StyleProp<ViewStyle>,
    categoryEmoji: {
      fontSize: 32,
      color: theme.accentColor,
    } as StyleProp<TextStyle>,
  };
};