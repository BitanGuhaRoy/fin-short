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
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';

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
  const colorScheme = useColorScheme();
  const colors = themeColors[colorScheme === 'dark' ? 'dark' : 'light'];
  const router = useRouter();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/(auth)/login');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const insets = useSafeAreaInsets();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [beginnerMode, setBeginnerMode] = useState(false);
  const { categories: selectedCategories } = useLocalSearchParams<{ categories?: string }>();
  const parsedCategories = selectedCategories ? JSON.parse(selectedCategories) as string[] : [];

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
          ? new Date(new Date(doc.$createdAt).getTime() + 5.5 * 60 * 60 * 1000)
              .toISOString()
              .split('T')[0]
          : 'Unknown',
        readTime: doc.readTime ?? 5,
        content: doc.content ?? 'No content available',
        beginner: Boolean(doc.beginner),
        url: doc.url ?? '',
        videoUrl1: doc.videoUrl1 ?? '',
        videoUrl2: doc.videoUrl2 ?? '',
      }));

      // Shuffle articles within each date group
      function shuffle<T>(array: T[]): T[] {
        // Fisher-Yates shuffle
        const arr = array.slice();
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      }
      const grouped: { [date: string]: Article[] } = {};
      for (const article of parsed) {
        if (!grouped[article.date]) grouped[article.date] = [];
        grouped[article.date].push(article);
      }
      // Sort dates descending
      const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
      const shuffled: Article[] = [];
      for (const date of sortedDates) {
        shuffled.push(...shuffle(grouped[date]));
      }
      setArticles(shuffled);
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
    style={[
      styles.fullScreenCard,
      { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }
    ]}
  >
    <View style={styles.fullScreenImageWrapper}>
      <Image source={{ uri: item.imageUrl }} style={styles.fullScreenImage} resizeMode="cover" />
      {/* Gradient overlay */}
      <View style={styles.cardImageGradient} />

    </View>
    <View
      style={[
        styles.fullScreenContentWrapper,
        { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }
      ]}
    >
      <ScrollView contentContainerStyle={styles.fullScreenContentScroll} showsVerticalScrollIndicator={false}>
        {/* Author + meta row */}
        <View style={styles.metaRow}>
          {item.author && item.author !== 'Anonymous' && (
            <Text style={[styles.metaText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>{item.author}</Text>
          )}
        </View>
        {/* Title */}
        <Text style={[styles.cardTitle, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>{item.title}</Text>
        {/* Description */}
        <View
          style={[
            styles.cardDescriptionContainer,
            { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }
          ]}
        >
          <Text style={[
            styles.cardDescriptionLarge,
            { color: colorScheme === 'dark' ? '#fff' : '#000' }
          ]}>{item.description}</Text>
        </View>
        {/* Content */}
        {item.content && item.content !== 'No content available' && (
          <Text style={[
            styles.fullScreenContent,
            { color: colorScheme === 'dark' ? '#fff' : '#000' }
          ]}>{item.content}</Text>
        )}
        {/* Date at bottom */}
        <Text style={{
          color: colorScheme === 'dark' ? '#fff' : '#000',
          fontSize: 14,
          opacity: 0.7,
          marginTop: 16,
          marginBottom: 2,
          textAlign: 'right',
        }}>{item.date}</Text>
        {/* Action buttons row */}
        <View style={styles.cardButtonRow}>
          <TouchableOpacity
            style={[styles.cardButton, { backgroundColor: colors.primary }]}
            onPress={() => WebBrowser.openBrowserAsync(`https://www.google.co.in/search?q=${encodeURIComponent(item.title)}&hl=en&gl=in`)}
          >
            <Ionicons name="search" size={18} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.cardButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cardButton, { backgroundColor: '#FF0000' }]}
            onPress={() => WebBrowser.openBrowserAsync(`https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + ' india')}&hl=en&gl=in`)}
          >
            <Ionicons name="logo-youtube" size={18} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.cardButtonText}>YouTube</Text>
          </TouchableOpacity>
          {item.videoUrl1 ? (
            <TouchableOpacity
              style={[styles.cardButton, { backgroundColor: colors.primary }]}
              onPress={() => WebBrowser.openBrowserAsync(item.videoUrl1!)}
            >
              <Ionicons name="play-circle" size={18} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.cardButtonText}>Video 1</Text>
            </TouchableOpacity>
          ) : null}
          {item.videoUrl2 ? (
            <TouchableOpacity
              style={[styles.cardButton, { backgroundColor: colors.primary }]}
              onPress={() => WebBrowser.openBrowserAsync(item.videoUrl2!)}
            >
              <Ionicons name="play-circle" size={18} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.cardButtonText}>Video 2</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
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
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <View
              style={[
                styles.smallToggleCircle,
                {
                  transform: [{ translateX: beginnerMode ? 16 : 0 }],
                  backgroundColor: colors.background,
                },
              ]}
            />
          </Pressable>
        </View>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Ionicons name="log-out-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
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
        contentContainerStyle={{}}
        style={{ flex: 1 }}
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
// --------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: { 
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingBottom: 8,
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8
  },
  articleDescription: {
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 12
  },
  articleScroll: {
    flexGrow: 0,
    maxHeight: SCREEN_HEIGHT * 0.7,
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
  // --- Modern Card Styles ---
  // Full screen card for paging
  fullScreenCard: {
    height: SCREEN_HEIGHT,
    width: '100%',
  },
  fullScreenImageWrapper: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.25,
    position: 'relative',
    overflow: 'hidden',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
  fullScreenContentWrapper: {
    height: SCREEN_HEIGHT * 0.75,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 24,
    flex: 1,
  },
  fullScreenContentScroll: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  fullScreenContent: {
    fontSize: 16,
    color: '#222',
    marginTop: 10,
    marginBottom: 20,
    lineHeight: 22,
    opacity: 0.97,
  },
  glassCardWrapper: {
    display: 'none', // Hide old card style
  },
  cardShadow: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    ...(Platform.OS === 'ios' ? { backdropFilter: 'blur(16px)' } : {}),
  },
  cardImageWrapper: {
    position: 'relative',
    width: '100%',
    height: 220,
    overflow: 'hidden',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardImageGradient: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  categoryPill: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: 'rgba(30,30,30,0.78)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    zIndex: 2,
  },
  categoryPillText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  beginnerBadgeModern: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    zIndex: 2,
    shadowColor: '#4CAF50',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  beginnerTextModern: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  cardContentWrapper: {
    padding: 18,
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  avatarInitials: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 16,
  },
  metaText: {
    color: '#222',
    fontSize: 13,
    fontWeight: '600',
    marginRight: 4,
  },
  metaDot: {
    color: '#aaa',
    fontSize: 15,
    marginHorizontal: 2,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 15,
    color: '#333',
    marginBottom: 14,
    lineHeight: 21,
    opacity: 0.94,
  },
  cardDescriptionContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 18,
  },
  cardDescriptionLarge: {
    fontSize: 20,
    lineHeight: 27,
    opacity: 0.98,
    fontWeight: '500',
  },
  cardButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 8,
    flexWrap: 'wrap',
  },
  cardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: 16,
    marginRight: 6,
    marginBottom: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.2,
  },
  // --- End Modern Card Styles ---
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
  signOutButton: {
    padding: 8,
  },
});