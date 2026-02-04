import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: string;
    originalPrice?: string;
    image: string;
    category: string;
    rating: number;
    reviewCount?: number;
    badge?: string;
    has360?: boolean;
    hasVideo?: boolean;
    topReview?: string;
    icon?: React.ReactNode;
    type?: string;
  };
  index?: number;
  className?: string;
}

export default function ProductCard({ product, index = 0, className = "" }: ProductCardProps) {
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Only apply effect within 200px radius
      if (distance < 200) {
        const strength = Math.max(0, 1 - distance / 200);
        const maxMove = 8;
        setTransform({
          x: (deltaX / distance) * strength * maxMove,
          y: (deltaY / distance) * strength * maxMove
        });
      } else {
        setTransform({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setTransform({ x: 0, y: 0 });
    };

    document.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden animate-fade-in ${className}`}
      style={{ 
        animationDelay: `${index * 100}ms`,
        transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.x || transform.y ? 1.02 : 1})`
      }}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className={`${product.image} aspect-square flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300`}>
          {product.icon ? (
            product.icon
          ) : (
            <div className="text-6xl opacity-60 transition-opacity duration-300 group-hover:opacity-80">📱</div>
          )}
          
          {product.badge && (
            <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold z-10 ${
              product.badge.includes('Seller') || product.badge.includes('#1') ? 'bg-yellow-500 text-white' :
              product.badge.includes('New') || product.badge.includes('Just') ? 'bg-green-500 text-white' :
              product.badge.includes('For You') || product.badge.includes('Recommended') ? 'bg-purple-500 text-white' :
              'bg-red-500 text-white'
            }`}>
              {product.badge}
            </span>
          )}
          
          <div className="absolute top-4 right-4 flex flex-col gap-1">
            {product.has360 && (
              <div className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                360°
              </div>
            )}
            {product.hasVideo && (
              <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                ▶ Video
              </div>
            )}
            {!product.has360 && !product.hasVideo && product.rating && (
              <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-semibold">{product.rating}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              product.type === 'tech' || product.category === 'Tech' ? 'bg-blue-50 text-blue-600' :
              product.type === 'wellness' || product.category === 'Wellness' ? 'bg-green-50 text-green-600' :
              'bg-gray-50 text-gray-600'
            }`}>
              {product.category}
            </span>
          </div>
          
          <h3 className={`font-bold text-xl text-gray-900 mb-2 transition-colors ${
            product.type === 'tech' || product.category === 'Tech' ? 'group-hover:text-blue-600' :
            product.type === 'wellness' || product.category === 'Wellness' ? 'group-hover:text-green-600' :
            'group-hover:text-purple-600'
          }`}>
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-gray-900">{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
            )}
          </div>
          
          {(product.reviewCount || product.topReview) && (
            <div className="border-t pt-3">
              {product.reviewCount && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">({product.reviewCount} reviews)</span>
                </div>
              )}
              {product.topReview && (
                <p className="text-xs text-gray-600 italic line-clamp-2">
                  "{product.topReview}"
                </p>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}