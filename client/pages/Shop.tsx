import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import MagneticButton from "@/components/MagneticButton";
import { Filter, ChevronDown, Star, Smartphone, Laptop, Watch, Headphones, Heart, Activity, Zap, Leaf } from "lucide-react";
import { useState, useEffect } from "react";

export default function Shop() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  // Sample products with tech and wellness categories
  const products = [
    { 
      id: 1, 
      name: "iPhone 15 Pro", 
      price: "$999", 
      category: "Tech", 
      type: "tech",
      rating: 4.8,
      image: "bg-gradient-to-br from-blue-100 to-indigo-100",
      icon: <Smartphone className="w-8 h-8 text-blue-600" />
    },
    { 
      id: 2, 
      name: "MacBook Air M3", 
      price: "$1299", 
      category: "Tech", 
      type: "tech",
      rating: 4.9,
      image: "bg-gradient-to-br from-gray-100 to-slate-100",
      icon: <Laptop className="w-8 h-8 text-gray-600" />
    },
    { 
      id: 3, 
      name: "Apple Watch Ultra", 
      price: "$799", 
      category: "Tech", 
      type: "tech",
      rating: 4.7,
      image: "bg-gradient-to-br from-purple-100 to-pink-100",
      icon: <Watch className="w-8 h-8 text-purple-600" />
    },
    { 
      id: 4, 
      name: "AirPods Pro 2", 
      price: "$249", 
      category: "Tech", 
      type: "tech",
      rating: 4.6,
      image: "bg-gradient-to-br from-orange-100 to-red-100",
      icon: <Headphones className="w-8 h-8 text-orange-600" />
    },
    { 
      id: 5, 
      name: "Fitness Tracker Pro", 
      price: "$199", 
      category: "Wellness", 
      type: "wellness",
      rating: 4.5,
      image: "bg-gradient-to-br from-green-100 to-emerald-100",
      icon: <Activity className="w-8 h-8 text-green-600" />
    },
    { 
      id: 6, 
      name: "Heart Rate Monitor", 
      price: "$89", 
      category: "Wellness", 
      type: "wellness",
      rating: 4.4,
      image: "bg-gradient-to-br from-teal-100 to-cyan-100",
      icon: <Heart className="w-8 h-8 text-teal-600" />
    },
    { 
      id: 7, 
      name: "Energy Boost Supplement", 
      price: "$39", 
      category: "Wellness", 
      type: "wellness",
      rating: 4.3,
      image: "bg-gradient-to-br from-yellow-100 to-amber-100",
      icon: <Zap className="w-8 h-8 text-yellow-600" />
    },
    { 
      id: 8, 
      name: "Organic Protein Powder", 
      price: "$49", 
      category: "Wellness", 
      type: "wellness",
      rating: 4.6,
      image: "bg-gradient-to-br from-lime-100 to-green-100",
      icon: <Leaf className="w-8 h-8 text-lime-600" />
    },
    { 
      id: 9, 
      name: "Gaming Laptop RTX", 
      price: "$1899", 
      category: "Tech", 
      type: "tech",
      rating: 4.8,
      image: "bg-gradient-to-br from-red-100 to-pink-100",
      icon: <Laptop className="w-8 h-8 text-red-600" />
    },
    { 
      id: 10, 
      name: "Yoga Mat Premium", 
      price: "$79", 
      category: "Wellness", 
      type: "wellness",
      rating: 4.7,
      image: "bg-gradient-to-br from-purple-100 to-indigo-100",
      icon: <Activity className="w-8 h-8 text-purple-600" />
    },
    { 
      id: 11, 
      name: "Wireless Earbuds", 
      price: "$149", 
      category: "Tech", 
      type: "tech",
      rating: 4.5,
      image: "bg-gradient-to-br from-blue-100 to-cyan-100",
      icon: <Headphones className="w-8 h-8 text-blue-600" />
    },
    { 
      id: 12, 
      name: "Meditation Cushion", 
      price: "$59", 
      category: "Wellness", 
      type: "wellness",
      rating: 4.4,
      image: "bg-gradient-to-br from-green-100 to-teal-100",
      icon: <Leaf className="w-8 h-8 text-green-600" />
    }
  ];

  // Filter products based on URL parameter
  const filteredProducts = categoryParam 
    ? products.filter(product => 
        product.category === categoryParam || 
        product.type === categoryParam
      )
    : products;

  const getPageTitle = () => {
    if (categoryParam === 'tech') return 'Technology Products';
    if (categoryParam === 'wellness') return 'Wellness Products';
    if (categoryParam) return `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} Products`;
    return 'All Products';
  };

  const getPageDescription = () => {
    if (categoryParam === 'tech') return 'Cutting-edge technology for modern living';
    if (categoryParam === 'wellness') return 'Premium wellness products for optimal health';
    if (categoryParam) return `Discover our ${categoryParam} collection`;
    return 'Discover our complete collection of tech and wellness products';
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-32 pb-32 md:pt-40 md:pb-40">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="text-foreground mb-6 animate-fade-in">{getPageTitle()}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-slide-up">
              {getPageDescription()}
            </p>
            {categoryParam && (
              <div className="mt-6">
                <Link 
                  to="/shop" 
                  className="text-secondary hover:text-secondary/80 text-sm font-medium"
                >
                  ← View All Products
                </Link>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className={`lg:block ${showFilters ? "block" : "hidden"}`}>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-serif font-bold mb-6 text-foreground">
                  Filters
                </h3>

                {/* Price Filter */}
                <div className="mb-8">
                  <button className="w-full flex items-center justify-between mb-4">
                    <span className="font-semibold text-sm text-foreground">
                      Price
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-600">Under $50</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-600">$50 - $100</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-600">$100 - $200</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-600">$200+</span>
                    </label>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-8">
                  <button className="w-full flex items-center justify-between mb-4">
                    <span className="font-semibold text-sm text-foreground">
                      Category
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-600">Technology</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-600">Wellness</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-600">Smartphones</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-600">Fitness</span>
                    </label>
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <button className="w-full flex items-center justify-between mb-4">
                    <span className="font-semibold text-sm text-foreground">
                      Brand
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-600">Apple</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-600">Samsung</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-600">Fitbit</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-600">Organic Plus</span>
                    </label>
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <button className="w-full flex items-center justify-between mb-4">
                    <span className="font-semibold text-sm text-foreground">
                      Rating
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="space-y-3">
                    {[5, 4, 3, 2].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <div className="flex items-center gap-1">
                          {Array(rating).fill(0).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                          {Array(5 - rating).fill(0).map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-gray-300" />
                          ))}
                          <span className="text-sm text-gray-600 ml-1">& up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="lg:col-span-3">
              {/* Sort Bar */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 text-sm font-medium text-foreground hover:text-secondary transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                <select className="text-sm border border-gray-200 rounded-lg px-4 py-2 text-gray-700 hover:border-gray-300 transition-colors">
                  <option>Sort by: Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Best Sellers</option>
                </select>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg mb-4">No products found in this category.</p>
                  <Link 
                    to="/shop" 
                    className="text-secondary hover:text-secondary/80 font-medium"
                  >
                    View All Products →
                  </Link>
                </div>
              )}

              {/* Load More */}
              {filteredProducts.length >= 8 && (
                <div className="mt-12 text-center">
                  <MagneticButton className="btn-tech">
                    Load More Products
                  </MagneticButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
