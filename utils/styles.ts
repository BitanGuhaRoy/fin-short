import { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

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

export interface StyleObject {
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
  // Feed Screen Specific Styles
  filterContainer: StyleProp<ViewStyle>;
  toggleCard: StyleProp<ViewStyle>;
  toggleCardContent: StyleProp<ViewStyle>;
  toggleIconContainer: StyleProp<ViewStyle>;
  toggleIcon: StyleProp<TextStyle>;
  toggleTextContainer: StyleProp<ViewStyle>;
  toggleTitle: StyleProp<TextStyle>;
  toggleDescription: StyleProp<TextStyle>;
  toggleSwitchContainer: StyleProp<ViewStyle>;
  list: StyleProp<ViewStyle>;
  articleCard: StyleProp<ViewStyle>;
  articleImage: StyleProp<ImageStyle>;
  articleTitle: StyleProp<TextStyle>;
  articleDescription: StyleProp<TextStyle>;
  articleMeta: StyleProp<ViewStyle>;
  authorDateText: StyleProp<TextStyle>;
  readTimeText: StyleProp<TextStyle>;
  beginnerBadge: StyleProp<TextStyle>;
}

export const getThemeColors = (colorScheme: 'light' | 'dark'): ThemeColors => {
  return colorScheme === 'dark' ? darkTheme : lightTheme;
};

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
    // Feed Screen Specific Styles
    filterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: theme.cardBackgroundColor, 
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    } as StyleProp<ViewStyle>,
    toggleCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.cardBackgroundColor,
      borderRadius: 10,
      padding: 15,
      marginVertical: 10, // Added margin for spacing
      elevation: 3,
      shadowColor: theme.textColor, // Use theme color for shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    } as StyleProp<ViewStyle>,
    toggleCardContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    } as StyleProp<ViewStyle>,
    toggleIconContainer: {
      marginRight: 15,
      padding: 10,
      backgroundColor: theme.accentColor, // Use theme accent for icon background
      borderRadius: 25, // Circular background
    } as StyleProp<ViewStyle>,
    toggleIcon: {
      fontSize: 24,
      color: theme.selectedTextColor, // Icon color on accent background
    } as StyleProp<TextStyle>,
    toggleTextContainer: {
      flex: 1,
    } as StyleProp<ViewStyle>,
    toggleTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.textColor,
    } as StyleProp<TextStyle>,
    toggleDescription: {
      fontSize: 14,
      color: theme.secondaryTextColor,
      marginTop: 4,
    } as StyleProp<TextStyle>,
    toggleSwitchContainer: {
      // Styles for the switch container, e.g., alignment or specific margins
    } as StyleProp<ViewStyle>,
    list: {
      paddingBottom: 20,
    } as StyleProp<ViewStyle>,
    articleCard: {
      backgroundColor: theme.cardBackgroundColor,
      borderRadius: 8,
      padding: 15,
      marginHorizontal: 10,
      marginVertical: 8,
      elevation: 2,
      shadowColor: theme.textColor,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    } as StyleProp<ViewStyle>,
    articleImage: {
      width: '100%',
      height: 150,
      borderRadius: 8,
      marginBottom: 10,
    } as StyleProp<ImageStyle>,
    articleTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.textColor,
      marginTop: 5,
    } as StyleProp<TextStyle>,
    articleDescription: {
      fontSize: 14,
      color: theme.secondaryTextColor,
      marginTop: 5,
    } as StyleProp<TextStyle>,
    articleMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      justifyContent: 'space-between',
    } as StyleProp<ViewStyle>,
    authorDateText: {
      fontSize: 12,
      color: theme.secondaryTextColor,
      marginRight: 5,
    } as StyleProp<TextStyle>,
    readTimeText: {
      fontSize: 12,
      color: theme.secondaryTextColor,
    } as StyleProp<TextStyle>,
    beginnerBadge: {
      fontSize: 12,
      fontWeight: 'bold',
      color: theme.accentColor, // Or a specific beginner color from theme
      // Example: backgroundColor: theme.beginnerColor, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, overflow: 'hidden'
    } as StyleProp<TextStyle>,
  };
};