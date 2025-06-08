import { useState, useEffect } from 'react';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useApi = <T>(endpoint: string): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Simulate API call with dummy data
        const dummyData = await new Promise<T>((resolve) => {
          setTimeout(() => {
            if (endpoint === '/portfolio') {
              resolve({
                stocks: [
                  { symbol: 'AAPL', quantity: 10, price: 180.50 },
                  { symbol: 'GOOGL', quantity: 5, price: 2700.00 },
                ],
                totalValue: 15305.00,
              } as T);
            } else if (endpoint === '/transactions') {
              resolve({
                transactions: [
                  { id: 1, type: 'BUY', symbol: 'AAPL', quantity: 10, date: '2025-06-01' },
                  { id: 2, type: 'SELL', symbol: 'GOOGL', quantity: 5, date: '2025-06-02' },
                ],
              } as T);
            } else if (endpoint === '/feed') {
              resolve([
                {
                  id: '1',
                  title: 'Understanding Mutual Funds for Beginners',
                  description: 'Learn the basics of mutual funds and how to start investing',
                  category: 'Mutual Fund',
                  imageUrl: 'https://via.placeholder.com/400x200',
                  author: 'John Doe',
                  date: '2025-06-01',
                  readTime: '5 min read'
                },
                {
                  id: '2',
                  title: 'Stock Market Basics',
                  description: 'A comprehensive guide to stock market investing',
                  category: 'Stock',
                  imageUrl: 'https://via.placeholder.com/400x200',
                  author: 'Jane Smith',
                  date: '2025-06-02',
                  readTime: '6 min read'
                },
                {
                  id: '3',
                  title: 'Insurance Planning 101',
                  description: 'How to choose the right insurance policy for you',
                  category: 'Insurance',
                  imageUrl: 'https://via.placeholder.com/400x200',
                },
                {
                  id: '4',
                  title: 'Latest Banking Frauds to Watch Out For',
                  description: 'Common fraud schemes and how to protect yourself',
                  category: 'Latest Frauds',
                  imageUrl: 'https://via.placeholder.com/400x200',
                },
                {
                  id: '5',
                  title: 'RD & FD: Which is Better?',
                  description: 'Comparing Recurring Deposits and Fixed Deposits',
                  category: 'RD & FD',
                  imageUrl: 'https://via.placeholder.com/400x200',
                },
                {
                  id: '6',
                  title: 'Crypto Investing for Beginners',
                  description: 'Getting started with cryptocurrency investments',
                  category: 'Crypto',
                  imageUrl: 'https://via.placeholder.com/400x200',
                },
                {
                  id: '7',
                  title: 'Tax Planning for 2025',
                  description: 'Maximize your tax savings this year',
                  category: 'Tax',
                  imageUrl: 'https://via.placeholder.com/400x200',
                },
              ] as T);
            }
          }, 1000);
        });
        setData(dummyData);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};
