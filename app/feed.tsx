import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Switch, 
  ScrollView, 
  FlatList, 
  StyleProp, 
  ViewStyle, 
  TextStyle, 
  ImageStyle,
  ColorSchemeName,
  DimensionValue,
  useColorScheme 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Image as ExpoImage } from 'expo-image';

interface FeedStyles {
  container: StyleProp<ViewStyle>;
  filterContainer: StyleProp<ViewStyle>;
  toggleCard: StyleProp<ViewStyle>;
  toggleCardContent: StyleProp<ViewStyle>;
  toggleIconContainer: StyleProp<ViewStyle>;
  toggleIcon: StyleProp<TextStyle>;
  toggleTextContainer: StyleProp<ViewStyle>;
  toggleTitle: StyleProp<TextStyle>;
  toggleDescription: StyleProp<TextStyle>;
  toggleSwitchContainer: StyleProp<ViewStyle>;
  toggleSwitch: StyleProp<ViewStyle>;
  list: StyleProp<ViewStyle>;
  articleCard: StyleProp<ViewStyle>;
  articleImage: StyleProp<ImageStyle>;
  articleTitle: StyleProp<TextStyle>;
  articleDescription: StyleProp<TextStyle>;
  articleInfo: StyleProp<ViewStyle>;
  articleAuthor: StyleProp<TextStyle>;
  articleDate: StyleProp<TextStyle>;
  articleReadTime: StyleProp<TextStyle>;
}

interface ThemeColors {
  backgroundColor: string;
  textColor: string;
  secondaryTextColor: string;
  borderColor: string;
  beginnerColor: string;
  advancedColor: string;
  toggleColor: string;
  toggleTextColor: string;
  cardBackgroundColor: string;
}

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  author: string;
  date: string;
  readTime: number;
  content: string;
  beginner: boolean;
}

const getThemeColors = (colorScheme: ColorSchemeName): ThemeColors => {
  const isDark = colorScheme === 'dark';
  return {
    backgroundColor: isDark ? '#121212' : '#FFFFFF',
    textColor: isDark ? '#FFFFFF' : '#000000',
    secondaryTextColor: isDark ? '#A0A0A0' : '#666666',
    borderColor: isDark ? '#333333' : '#E0E0E0',
    beginnerColor: '#4CAF50',
    advancedColor: '#FF9800',
    toggleColor: '#4CAF50',
    toggleTextColor: '#4CAF50',
    cardBackgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
  };
};

export default function FeedScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [isBeginnerMode, setIsBeginnerMode] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const theme = getThemeColors(colorScheme);

  const articles: Article[] = [
    {
      id: '1',
      title: 'Understanding Mutual Funds',
      description: 'Learn the basics of mutual funds and how they work',
      category: 'Mutual Fund',
      imageUrl: 'https://images.unsplash.com/photo-1504384764587-65818e5f5659',
      author: 'John Doe',
      date: '2024-06-07',
      readTime: 5,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      beginner: true
    },
    {
      id: '2',
      title: 'Stock Market Basics',
      description: 'Introduction to stock market concepts',
      category: 'Stock',
      imageUrl: 'https://images.unsplash.com/photo-1504384764587-65818e5f5659',
      author: 'Jane Smith',
      date: '2024-06-06',
      readTime: 7,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      beginner: true
    },
    {
      id: '3',
      title: 'Advanced Insurance Strategies',
      description: 'Explore advanced insurance planning techniques',
      category: 'Insurance',
      imageUrl: 'https://images.unsplash.com/photo-1504384764587-65818e5f5659',
      author: 'Robert Johnson',
      date: '2024-06-05',
      readTime: 10,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      beginner: false
    },
    {
      id: '4',
      title: 'RD & FD Investment Guide',
      description: 'Everything you need to know about recurring deposits',
      category: 'RD & FD',
      imageUrl: 'https://images.unsplash.com/photo-1504384764587-65818e5f5659',
      author: 'Mike Brown',
      date: '2024-06-04',
      readTime: 6,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      beginner: true
    },
    {
      id: '5',
      title: 'Crypto Market Analysis',
      description: 'Understanding cryptocurrency trends and investments',
      category: 'Crypto',
      imageUrl: 'https://images.unsplash.com/photo-1504384764587-65818e5f5659',
      author: 'Sarah Wilson',
      date: '2024-06-03',
      readTime: 8,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      beginner: false
    },
    {
      id: '6',
      title: 'Tax Planning Basics',
      description: 'Maximize your savings with smart tax planning',
      category: 'Tax',
      imageUrl: 'https://images.unsplash.com/photo-1504384764587-65818e5f5659',
      author: 'David Lee',
      date: '2024-06-02',
      readTime: 4,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      beginner: true
    },
    {
      id: '7',
      title: 'Understanding Mutual Funds',
      description: 'Learn the basics of mutual funds and how they work',
      category: 'Mutual Fund',
      imageUrl: 'https://images.unsplash.com/photo-1504384764587-65818e5f5659',
      author: 'John Doe',
      date: '2024-06-07',
      readTime: 5,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      beginner: true
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      padding: 4,
    },
    filterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 8,
      backgroundColor: theme.cardBackgroundColor,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    toggleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.backgroundColor,
      borderRadius: 16,
      padding: 6,
      elevation: 1,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    toggleLabel: {
      fontSize: 10,
      fontWeight: '500',
      color: theme.secondaryTextColor,
      marginRight: 4,
    },
    toggleSwitch: {
      transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }],
    },
    list: {
      flex: 1,
      width: '100%' as DimensionValue,
      paddingHorizontal: 4,
      backgroundColor: theme.backgroundColor,
    },
    articleCard: {
      backgroundColor: theme.cardBackgroundColor,
      borderRadius: 8,
      padding: 12,
      marginHorizontal: 12,
      marginVertical: 6,
      elevation: 1,
    },
    articleImage: {
      width: '100%',
      height: 120,
      borderRadius: 8,
      marginBottom: 8,
    },
    articleTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.textColor,
      marginTop: 8,
    },
    articleDescription: {
      fontSize: 12,
      color: theme.secondaryTextColor,
      marginTop: 6,
    },
    articleInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 6,
      justifyContent: 'space-between',
    },
    articleMeta: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    articleAuthor: {
      fontSize: 10,
      color: theme.secondaryTextColor,
      marginRight: 4,
    },
    articleDate: {
      fontSize: 10,
      color: theme.secondaryTextColor,
    },
    articleReadTime: {
      fontSize: 10,
      color: theme.secondaryTextColor,
    },
  });

  const toggleBeginnerMode = () => {
    setIsBeginnerMode(!isBeginnerMode);
  };

  const renderBeginnerToggle = () => {
    return (
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>Beginner</Text>
        <Switch
          value={isBeginnerMode}
          onValueChange={toggleBeginnerMode}
          thumbColor={theme.toggleTextColor}
          trackColor={{ false: '#767577', true: theme.toggleColor }}
          ios_backgroundColor="#3e3e3e"
          style={styles.toggleSwitch}
        />
      </View>
    );
  };

  const renderArticle = ({ item }: { item: Article }) => {
    return (
      <TouchableOpacity
        onPress={() => router.push(`/article-detail?id=${item.id}`)}
        style={styles.articleCard}
      >
        <ExpoImage
          source={{ uri: item.imageUrl }}
          style={styles.articleImage}
          contentFit="cover"
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.articleTitle}>{item.title}</Text>
          <Text style={styles.articleDescription}>{item.description}</Text>
          <View style={styles.articleInfo}>
            <View style={styles.articleMeta}>
              <Text style={styles.articleAuthor}>{item.author}</Text>
              <Text style={styles.articleDate}>{item.date}</Text>
            </View>
            <Text style={styles.articleReadTime}>{item.readTime} min read</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const filteredArticles = articles.filter((article) => {
    if (!isBeginnerMode) return true;
    return article.beginner;
  });

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <View style={styles.filterContainer}>
          {renderBeginnerToggle()}
        </View>
        <FlatList
          data={filteredArticles}
          renderItem={renderArticle}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}