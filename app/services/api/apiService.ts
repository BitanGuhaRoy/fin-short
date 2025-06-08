import axios from 'axios';

const API_BASE_URL = 'YOUR_API_BASE_URL'; // Replace with your actual API URL

export interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
  beginner: boolean;
}

export interface ArticleResponse {
  data: Article[];
}

export interface ArticleDetailResponse {
  data: Article;
}

export const apiService = {
  async getArticles(interests: string[]): Promise<ArticleResponse> {
    try {
      const response = await axios.get(`${API_BASE_URL}/articles`, {
        params: {
          interests: interests.join(','),
          beginner: true // You can make this dynamic based on toggle state
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  },

  async getArticleDetail(articleId: string): Promise<ArticleDetailResponse> {
    try {
      const response = await axios.get(`${API_BASE_URL}/articles/${articleId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching article detail:', error);
      throw error;
    }
  }
};
