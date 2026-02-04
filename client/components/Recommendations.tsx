import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Sparkles, RefreshCw } from 'lucide-react';
import { usePersonalization, Product } from './PersonalizationProvider';
import { createRecommendationEngine } from '../services/RecommendationEngine';
import LazyImage from './LazyImage';

interface RecommendationsProps {
  title?: string;
  limit?: number;
  className?: string;
  showRefresh?: boolean;
}

export default function Recommendations({ 
  title = "Recommended for You", 
  limit = 4, 
  className = "",
  showRefresh = true 
}: RecommendationsProps) {
  const { 
    settings, 
    browsingHistory, 
    isPersonalizationEnabled 
  } = usePersonalization();
  
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recommendationEngine = createRecommendationEngine();

  const loadRecommendations = async () => {
    if (!isPersonalizationEnabled || !settings.showRecommendations) {
      setRecommendations([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const recs = await recommendationEngine.getRecommendations(browsingHistory, limit);
      setRecommendations(recs);
    } catch (err) {
      setError('Failed to load recommendations');
      console.error('Recommendation error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecommendations();
  }, [isPersonalizationEnabled, settings.showRecommendations, browsingHistory.length]);

  // Don't render if personalization is disabled
  if (!isPersonalizationEnabled || !settings.showRecommendations) {
    return null;
  }

  // Don't render if no recommendations and not loading
  if (!loading && recommendations.length === 0 && !error) {
    return null;
  }

  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
          </div>
          
          {showRefresh && !loading && (
            <button
              onClick={loadRecommendations}
              className="flex items-center gap-2 px-4 py-2 text-sm text-purple-600 hover:text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
              aria-label="Refresh recommendations"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(limit).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-t-xl"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={loadRecommendations}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Recommendations Grid */}
        {!loading && !error && recommendations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((product, index) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 transform hover:scale-105 overflow-hidden animate-fade-in focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                style={{ animationDelay: `${index * 100}ms` }}
                aria-label={`View ${product.name} - ${product.price}`}
              >
                <div className={`${product.image} aspect-square flex items-center justify-center relative`}>
                  <LazyImage
                    alt={`${product.name} - Recommended ${product.category} product`}
                    className="w-full h-full"
                    placeholder={product.image}
                  />
                  
                  {/* Recommendation Badge */}
                  <div className="absolute top-3 left-3 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    For You
                  </div>
                  
                  {/* Rating */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{product.rating}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="mb-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      product.type === 'tech' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {product.category}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">{product.price}</span>
                    <span className="text-xs text-purple-600 font-medium">Recommended</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State with Browsing Prompt */}
        {!loading && !error && recommendations.length === 0 && browsingHistory.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Start Exploring to Get Recommendations</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Browse our products to receive personalized recommendations based on your interests.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/shop?category=tech"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Explore Tech
              </Link>
              <Link
                to="/shop?category=wellness"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Explore Wellness
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}