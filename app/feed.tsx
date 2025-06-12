import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Linking
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { useColorScheme } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Query } from 'appwrite';
import { databases, DATABASE_ID, ARTICLES_COLLECTION_ID } from '../config/appwrite';
import * as WebBrowser from 'expo-web-browser';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------
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
  url: string;
  videoUrl1?: string;
  videoUrl2?: string;
}

// -----------------------------------------------------------------------------
// Theming
// -----------------------------------------------------------------------------
const themeColors = {
  light: {
    background: '#ffffff',
    text: '#000000',
    card: '#f8f9fa',
    border: '#dee2e6',
    primary: '#4CAF50',
    secondary: '#666666'
  },
  dark: {
    background: '#121212',
    text: '#ffffff',
    card: '#1e1e1e',
    border: '#333333',
    primary: '#81C784',
    secondary: '#A0A0A0'
  }
} as const;

// -----------------------------------------------------------------------------
// FeedScreen
// -----------------------------------------------------------------------------
export default function FeedScreen() {
  const insets = useSafeAreaInsets();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [beginnerMode, setBeginnerMode] = useState(false);
  const router = useRouter();
  const { categories: selectedCategories } = useLocalSearchParams<{ categories?: string }>();
  const parsedCategories = selectedCategories ? JSON.parse(selectedCategories) as string[] : [];
  const colorScheme = useColorScheme();
  const colors = themeColors[colorScheme === 'dark' ? 'dark' : 'light'];

  // ---------------------------------------------------------------------------
  // Fetch Helpers
  // ---------------------------------------------------------------------------
  const fetchArticles = async () => {
    try {
      setError(null);
      const queries: string[] = [
        Query.orderDesc('$createdAt'),
        ...(beginnerMode 
          ? [Query.equal('beginner', true)] 
          : [Query.equal('beginner', false)]),
        ...(parsedCategories.length > 0 
          ? [Query.equal('category', parsedCategories)]
          : [])
      ];
      const response = await databases.listDocuments(
        DATABASE_ID,
        ARTICLES_COLLECTION_ID,
        queries
      );

      const parsed: Article[] = response.documents.map((doc: any) => ({
        id: doc.$id,
        title: doc.title ?? 'Untitled',
        description: doc.description ?? '',
        category: doc.category ?? 'General',
        imageUrl:
          doc.imageUrl ?? 'https://images.unsplash.com/photo-1504384764587-65818e5f5659',
        author: doc.author ?? 'Anonymous',
        date: doc.$createdAt
          ? new Date(doc.$createdAt).toISOString().split('T')[0]
          : 'Unknown',
        readTime: doc.readTime ?? 5,
        content: doc.content ?? 'No content available',
        beginner: Boolean(doc.beginner),
        url: doc.url ?? '',
        videoUrl1: doc.videoUrl1 ?? '',
        videoUrl2: doc.videoUrl2 ?? '',
      }));
      setArticles(parsed);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load articles';
      setError(message);
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial + whenever beginner mode toggles
  useEffect(() => {
    setLoading(true);
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beginnerMode]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchArticles();
  };

  // ---------------------------------------------------------------------------
  // Render helpers
  // ---------------------------------------------------------------------------
  const renderArticle = ({ item }: { item: Article }) => (
    <View
      style={[styles.storyContainer, { backgroundColor: colors.card }]}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.storyImage} resizeMode="cover" />
      <View style={styles.articleContent}>
        <Text style={[styles.articleTitle, { color: colors.text }]}>{item.title}</Text>
        <ScrollView style={styles.articleScroll} showsVerticalScrollIndicator={false}>
          <Text style={[styles.articleDescription, { color: colors.text }]}>{item.description}</Text>
        </ScrollView>
        {/* Action buttons row */}
        <View style={styles.videoButtonsRow}>
          <TouchableOpacity
            style={[styles.knowMoreButton, { backgroundColor: colors.primary, flex:1, marginRight:4 }]}
            onPress={() =>
              WebBrowser.openBrowserAsync(
                `https://www.google.co.in/search?q=${encodeURIComponent(item.title)}&hl=en&gl=in`
              )
            }
          >
            <Text style={styles.knowMoreText} numberOfLines={1}>Google Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.knowMoreButton, { backgroundColor: colors.primary, flex:1, marginRight:4 }]}
            onPress={() =>
              WebBrowser.openBrowserAsync(
                `https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + ' india')}&hl=en&gl=in`
              )
            }
          >
            <Text style={styles.knowMoreText} numberOfLines={1}>Search YouTube</Text>
          </TouchableOpacity>
          {item.videoUrl1 && (
            <TouchableOpacity
              style={[styles.knowMoreButton, { backgroundColor: colors.primary, flex:1, marginHorizontal:4 }]}
              onPress={() => WebBrowser.openBrowserAsync(item.videoUrl1!)}
            >
              <Text style={styles.knowMoreText} numberOfLines={1}>Video 1</Text>
            </TouchableOpacity>
          )}
          {item.videoUrl2 && (
            <TouchableOpacity
              style={[styles.knowMoreButton, { backgroundColor: colors.primary, flex:1, marginLeft:4 }]}
              onPress={() => WebBrowser.openBrowserAsync(item.videoUrl2!)}
            >
              <Text style={styles.knowMoreText} numberOfLines={1}>Video 2</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  if (error) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text, marginBottom: 16 }]}>{error}</Text>
        <TouchableOpacity style={[styles.retryButton, { backgroundColor: colors.primary }]} onPress={fetchArticles}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border, paddingTop: Platform.OS === 'android' ? insets.top : 0 }]}>
        <View style={styles.toggleContainer}>
          <Text style={[styles.toggleLabel, { color: colors.text }]}>Beginner</Text>
          <Pressable
            onPress={() => setBeginnerMode(!beginnerMode)}
            style={({ pressed }) => [
              styles.smallToggle,
              {
                backgroundColor: beginnerMode ? colors.primary : colors.border,
                opacity: pressed ? 0.7 : 1
              }
            ]}
          >
            <View
              style={[
                styles.smallToggleCircle,
                {
                  transform: [{ translateX: beginnerMode ? 16 : 0 }],
                  backgroundColor: colors.background
                }
              ]}
            />
          </Pressable>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.id}
        pagingEnabled
        snapToInterval={SCREEN_HEIGHT}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          loading ? (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : (
            <View style={styles.centerContainer}>
              <Text style={[styles.emptyText, { color: colors.text }]}>No articles available.</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  toggleLabel: {
    marginRight: 8,
    fontSize: 16
  },
  listContent: {
    padding: 16
  },
  storyContainer: {
    height: SCREEN_HEIGHT,
    width: '100%'
  },
  storyImage: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.25
  },
  articleContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start'
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  articleDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12
  },
  articleScroll: {
    flexGrow: 0,
    maxHeight: SCREEN_HEIGHT * 0.45,
    marginBottom: 12
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  articleMeta: {
    fontSize: 12
  },
  beginnerBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  beginnerText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600'
  },
  // Generic containers
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center'
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6
  },
  retryText: {
    color: '#fff',
    fontWeight: '600'
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center'
  },
  smallToggle: {
    width: 32,
    height: 16,
    borderRadius: 8,
    padding: 2
  },
  smallToggleCircle: {
    width: 12,
    height: 12,
    borderRadius: 6
  },
  knowMoreButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    alignSelf: 'flex-start'
  },
  knowMoreText: {
    color: '#fff',
    fontWeight: '600'
  },
  videoButtonsRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 8
  },
});