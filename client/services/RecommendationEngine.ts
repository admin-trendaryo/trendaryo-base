import { Product, BrowsingHistoryItem } from '../components/PersonalizationProvider';

export interface RecommendationEngine {
  getRecommendations(history: BrowsingHistoryItem[], limit?: number): Promise<Product[]>;
  getPersonalizedProducts(userId?: string, category?: string): Promise<Product[]>;
  trackInteraction(productId: number, action: 'view' | 'click' | 'purchase'): Promise<void>;
}

// Mock recommendation engine - replace with real implementation
export class MockRecommendationEngine implements RecommendationEngine {
  private mockProducts: Product[] = [
    {
      id: 201,
      name: 'Smart Home Hub Pro',
      price: '$199',
      category: 'Smart Home',
      type: 'tech',
      rating: 4.6,
      image: 'bg-gradient-to-br from-blue-100 to-indigo-100'
    },
    {
      id: 202,
      name: 'Fitness Band Elite',
      price: '$149',
      category: 'Fitness',
      type: 'wellness',
      rating: 4.4,
      image: 'bg-gradient-to-br from-green-100 to-emerald-100'
    },
    {
      id: 203,
      name: 'Wireless Earbuds Max',
      price: '$179',
      category: 'Audio',
      type: 'tech',
      rating: 4.8,
      image: 'bg-gradient-to-br from-purple-100 to-pink-100'
    },
    {
      id: 204,
      name: 'Meditation Cushion Pro',
      price: '$69',
      category: 'Wellness',
      type: 'wellness',
      rating: 4.3,
      image: 'bg-gradient-to-br from-teal-100 to-cyan-100'
    }
  ];

  async getRecommendations(history: BrowsingHistoryItem[], limit = 4): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    if (history.length === 0) {
      return this.mockProducts.slice(0, limit);
    }

    // Analyze browsing patterns
    const categoryCount = history.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const preferredType = Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)[0]?.[0] as 'tech' | 'wellness';

    // Filter and sort recommendations
    const filtered = this.mockProducts
      .filter(product => product.type === preferredType)
      .sort((a, b) => b.rating - a.rating);

    return filtered.slice(0, limit);
  }

  async getPersonalizedProducts(userId?: string, category?: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    let filtered = this.mockProducts;
    if (category) {
      filtered = filtered.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }
    
    return filtered.slice(0, 6);
  }

  async trackInteraction(productId: number, action: 'view' | 'click' | 'purchase'): Promise<void> {
    console.log(`Tracked ${action} for product ${productId}`);
  }
}

// Factory function to create the appropriate engine
export function createRecommendationEngine(): RecommendationEngine {
  return new MockRecommendationEngine();
}