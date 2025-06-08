import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  StyleProp, 
  ViewStyle, 
  TextStyle, 
  ImageStyle,
  DimensionValue
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Image as ExpoImage } from 'expo-image';

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

const articles: Article[] = [
  {
    id: '1',
    title: 'Understanding Mutual Funds: A Beginner\'s Guide',
    description: 'Learn the basics of mutual funds and how they can help grow your wealth.',
    category: 'Mutual Fund',
    imageUrl: 'https://images.unsplash.com/photo-1504384764587-65818e5f5659',
    author: 'John Smith',
    date: '2023-06-07',
    readTime: 5,
    content: 'Mutual funds are investment vehicles that pool money from multiple investors to purchase a diversified portfolio of stocks, bonds, or other securities. They are managed by professional fund managers who make investment decisions on behalf of the investors. The main advantage of mutual funds is that they offer diversification, which helps to spread risk across multiple investments.\n\nWhen you invest in a mutual fund, you buy units or shares of the fund. The value of these units fluctuates based on the performance of the underlying assets in the fund\'s portfolio. Mutual funds can be categorized into different types based on their investment objectives:\n\n1. Equity Funds: Invest primarily in stocks\n2. Debt Funds: Invest in bonds and other fixed income securities\n3. Hybrid Funds: Invest in both equity and debt instruments\n4. Index Funds: Track a specific market index\n5. Sector Funds: Focus on specific sectors like technology or healthcare\n\nBefore investing in a mutual fund, it\'s important to consider factors such as:\n- Your investment goals and risk tolerance\n- The fund\'s historical performance\n- The fund manager\'s experience\n- The expense ratio and other fees\n- The fund\'s investment strategy\n\nMutual funds are considered a good option for beginners because they offer professional management and diversification, which can help reduce risk. However, like any investment, they come with risks and it\'s important to do thorough research and consult with a financial advisor before making investment decisions.',
    beginner: true
  },
  {
    id: '2',
    title: 'How to Start Investing in Stocks',
    description: 'Beginner-friendly guide to stock market investing with practical tips.',
    category: 'Stock',
    imageUrl: 'https://images.unsplash.com/photo-1504384764587-65818e5f5659',
    author: 'Sarah Johnson',
    date: '2023-06-06',
    readTime: 7,
    content: 'Stock market investing can be intimidating for beginners, but with the right knowledge and approach, it can be a rewarding way to grow your wealth. Here\'s a comprehensive guide to get you started:\n\n1. Understand the Basics:\n- Stocks represent ownership in a company\n- When you buy stocks, you become a shareholder\n- Stock prices fluctuate based on supply and demand\n\n2. Key Concepts:\n- Market Capitalization: Total value of a company\'s outstanding shares\n- Dividends: Payments made to shareholders\n- Stock Splits: When a company divides its existing shares into multiple shares\n\n3. Getting Started:\n- Open a Brokerage Account: Choose a reputable broker\n- Start Small: Begin with a small amount of money\n- Diversify: Don\'t put all your money in one stock\n\n4. Important Tips:\n- Research Companies: Understand their business model and financial health\n- Stay Patient: Investing is a long-term game\n- Avoid Emotional Decisions: Don\'t let fear or greed drive your investment choices\n\n5. Common Mistakes to Avoid:\n- Chasing Hot Tips: Be wary of unsolicited investment advice\n- Overtrading: Frequent buying and selling can erode profits\n- Ignoring Fees: Be aware of transaction costs\n\nRemember, stock market investing requires education, patience, and discipline. Always consult with a financial advisor before making significant investment decisions.',
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
    content: 'Advanced insurance planning involves sophisticated strategies to optimize coverage and minimize costs. This guide covers topics such as:\n\n1. Risk Assessment:\n- Comprehensive risk analysis\n- Identifying coverage gaps\n- Evaluating insurance needs\n\n2. Policy Optimization:\n- Multi-policy discounts\n- Coverage bundling\n- Premium optimization\n\n3. Advanced Riders:\n- Inflation protection\n- Critical illness coverage\n- Disability income\n\n4. Estate Planning:\n- Life insurance trusts\n- Wealth transfer strategies\n- Tax optimization\n\nThis content is intended for experienced investors and financial professionals. Consult with a qualified insurance advisor for personalized advice.',
    beginner: false
  }
];

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams();
  const article = articles.find(article => article.id === id);

  if (!article) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Article not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ExpoImage
        source={{ uri: article.imageUrl }}
        style={styles.heroImage}
      />
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{article.title}</Text>
        
        <View style={styles.metaContainer}>
          <Text style={styles.category}>{article.category}</Text>
          <Text style={styles.author}>{article.author}</Text>
          <Text style={styles.date}>{article.date}</Text>
          <Text style={styles.readTime}>{article.readTime} min read</Text>
        </View>

        <Text style={styles.description}>{article.description}</Text>
        
        <Text style={styles.content}>{article.content}</Text>
      </View>
    </ScrollView>
  );
}

interface ArticleDetailStyles {
  container: ViewStyle;
  heroImage: ImageStyle;
  contentContainer: ViewStyle;
  title: TextStyle;
  metaContainer: ViewStyle;
  category: TextStyle;
  author: TextStyle;
  date: TextStyle;
  readTime: TextStyle;
  description: TextStyle;
  content: TextStyle;
  errorText: TextStyle;
}

const styles = StyleSheet.create<ArticleDetailStyles>({
  errorText: {
    fontSize: 18,
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  heroImage: {
    width: '100%' as const,
    height: 300 as const,
    resizeMode: 'cover' as const,
  },
  contentContainer: {
    padding: 20 as const,
    backgroundColor: '#ffffff' as const,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 4,
  },
  title: {
    fontSize: 24 as const,
    fontWeight: 'bold' as const,
    color: '#1a1a1a' as const,
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 20,
  },
  category: {
    fontSize: 14 as const,
    fontWeight: '600' as const,
    color: '#4CAF50',
    marginRight: 16,
  },
  author: {
    fontSize: 14 as const,
    color: '#666666' as const,
    marginRight: 16,
  },
  date: {
    fontSize: 14 as const,
    color: '#666666' as const,
    marginRight: 16,
  },
  readTime: {
    fontSize: 14 as const,
    color: '#666666' as const,
  },
  description: {
    fontSize: 16 as const,
    color: '#333333' as const,
    marginBottom: 20,
  },
  content: {
    fontSize: 16 as const,
    lineHeight: 24 as const,
    color: '#333333' as const,
  },
});
