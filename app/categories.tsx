import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';

interface ThemeColors {
  backgroundColor: string;
  cardBackgroundColor: string;
  textColor: string;
  secondaryTextColor: string;
  borderColor: string;
  beginnerColor: string;
  advancedColor: string;
  toggleColor: string;
  toggleTextColor: string;
}

const getThemeColors = (colorScheme: string): ThemeColors => {
  const isDark = colorScheme === 'dark';
  return {
    backgroundColor: isDark ? '#121212' : '#FFFFFF',
    cardBackgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
    textColor: isDark ? '#FFFFFF' : '#000000',
    secondaryTextColor: isDark ? '#A0A0A0' : '#666666',
    borderColor: isDark ? '#333333' : '#E0E0E0',
    beginnerColor: '#4CAF50',
    advancedColor: '#FF9800',
    toggleColor: '#4CAF50',
    toggleTextColor: '#4CAF50',
  };
};

interface Category {
  id: string;
  title: string;
  description: string;
  emoji: string;
}

const categories: Category[] = [
  { id: 'mutual-funds', title: 'Mutual Fund', description: 'Discover mutual fund trends', emoji: '📊' },
  { id: 'stocks', title: 'Stock', description: 'Stay with latest stock news', emoji: '📈' },
  { id: 'ipo', title: 'IPO', description: 'Stay ahead with IPO news', emoji: '🚀' },
  // { id: 'rd-fd', title: 'RD & FD', description: 'Recurring Deposit & Fixed Deposit', emoji: '💰' },
  { id: 'crypto', title: 'Crypto', description: 'Stay updated on crypto prices and trends', emoji: '⚡' },
  { id: 'fraud', title: 'Latest Frauds', description: 'Stay informed about trending financial scams', emoji: '🚨' },
  { id: 'cards', title: 'Credit Card', description: 'Know the best cards, offers, and rewards', emoji: '💳' }, 
  { id: 'tax', title: 'Tax', description: 'Tax planning and compliance', emoji: '📝' },
  { id: 'insurance', title: 'Insurance', description: 'Stay aware of insurance news', emoji: '🛡️' },
  


];

export default function CategoriesScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const theme = getThemeColors(colorScheme || 'light');

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleContinue = () => {
    if (selectedCategories.length === 0) {
      alert('Please select at least one category');
      return;
    }

    // Get all selected categories' titles
    const selectedCategoryTitles = categories
      .filter(cat => selectedCategories.includes(cat.id))
      .map(cat => cat.title);

    router.push({
      pathname: '/feed',
      params: { 
        categories: JSON.stringify(selectedCategoryTitles)
      }
    });
  };

  const renderCategoryCard = (category: Category) => {
    const isSelected = selectedCategories.includes(category.id);
    const theme = getThemeColors(colorScheme || 'light');

    return (
      <TouchableOpacity
        style={{
          backgroundColor: theme.cardBackgroundColor,
          borderRadius: 20,
          padding: 25,
          width: '48%',
          marginVertical: 15,
          elevation: 4,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          borderWidth: 2,
          borderColor: isSelected ? theme.beginnerColor : theme.borderColor,
        }}
        onPress={() => handleCategoryPress(category.id)}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 40, color: theme.beginnerColor }}>
            {category.emoji}
          </Text>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ 
            fontSize: 20, 
            fontWeight: 'bold', 
            color: isSelected ? theme.beginnerColor : theme.textColor,
            textAlign: 'center',
            marginBottom: 12
          }}>
            {category.title}
          </Text>
          <Text style={{ 
            fontSize: 14, 
            color: isSelected ? theme.beginnerColor : theme.secondaryTextColor,
            textAlign: 'center'
          }}>
            {category.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <ScrollView 
        style={{ flex: 1, backgroundColor: theme.backgroundColor }}
        contentContainerStyle={{ backgroundColor: theme.backgroundColor, flexGrow: 1 }}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20 }}>
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.id);
              return (
                <TouchableOpacity
                  key={category.id}
                  style={{
                    backgroundColor: theme.cardBackgroundColor,
                    borderRadius: 20,
                    padding: 25,
                    width: '48%',
                    marginVertical: 15,
                    elevation: 4,
                    shadowColor: theme.textColor,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    borderWidth: isSelected ? 2 : 1,
                    borderColor: isSelected ? theme.beginnerColor : theme.borderColor
                  }}
                  onPress={() => handleCategoryPress(category.id)}
                >
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 40, color: theme.beginnerColor, textAlign: 'center', marginBottom: 20 }}>
                      {category.emoji}
                    </Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: isSelected ? theme.beginnerColor : theme.textColor, textAlign: 'center', marginBottom: 12 }}>
                      {category.title}
                    </Text>
                    <Text style={{ fontSize: 14, color: isSelected ? theme.beginnerColor : theme.secondaryTextColor, textAlign: 'center' }}>
                      {category.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          padding: 16,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
          width: '90%',
          maxWidth: 400,
          marginVertical: 20,
          backgroundColor: theme.beginnerColor,
          alignSelf: 'center',
        }}
        onPress={handleContinue}
      >
        <Text style={{ color: theme.textColor, fontSize: 18, fontWeight: 'bold', letterSpacing: 1 }}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
