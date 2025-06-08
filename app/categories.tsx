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
  { id: 'mutual-funds', title: 'Mutual Fund', description: 'Invest in professionally managed funds', emoji: '📊' },
  { id: 'stocks', title: 'Stock', description: 'Buy and sell individual company shares', emoji: '📈' },
  { id: 'insurance', title: 'Insurance', description: 'Protect your financial future with insurance', emoji: '🛡️' },
  { id: 'fraud', title: 'Latest Frauds', description: 'Stay informed about common financial scams', emoji: '🚨' },
  { id: 'rd-fd', title: 'RD & FD', description: 'Recurring Deposit & Fixed Deposit', emoji: '💰' },
  { id: 'crypto', title: 'Crypto', description: 'Digital currencies and blockchain', emoji: '⚡' },
  { id: 'tax', title: 'Tax', description: 'Tax planning and compliance', emoji: '📝' },
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

    router.push({
      pathname: '/feed',
      params: { 
        interests: selectedCategories.join(','),
        categories: selectedCategories 
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
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 8, color: theme.textColor }}>Select Your Interests</Text>
          <Text style={{ fontSize: 16, color: theme.secondaryTextColor, textAlign: 'center', marginBottom: 40 }}>Choose the topics you're interested in to see relevant articles</Text>
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
    </SafeAreaView>
  );
}
