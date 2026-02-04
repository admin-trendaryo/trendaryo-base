import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Share2, Check, Star, Smartphone, Laptop, Watch, Headphones, Activity, Zap, Shield, Truck } from "lucide-react";
import { useState } from "react";

export default function Product() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("128GB");
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  // Sample product data - in real app this would come from API based on ID
  const products = {
    "1": {
      name: "iPhone 15 Pro",
      price: 999,
      originalPrice: 1099,
      rating: 4.8,
      reviews: 2847,
      category: "Smartphones",
      type: "tech",
      description: "The most advanced iPhone ever, featuring the powerful A17 Pro chip, titanium design, and revolutionary camera system. Experience effortless excellence in every interaction.",
      features: [
        "A17 Pro chip with 6-core GPU",
        "Pro camera system with 48MP main",
        "Titanium design - lighter and stronger",
        "Action Button for quick shortcuts",
        "USB-C connectivity",
        "Up to 29 hours video playback"
      ],
      variants: ["128GB", "256GB", "512GB", "1TB"],
      colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
      icon: <Smartphone className="w-12 h-12 text-blue-600" />,
      image: "bg-gradient-to-br from-blue-100 to-indigo-100",
      inStock: true,
      shipping: "Free shipping",
      warranty: "1 year Apple warranty"
    },
    "5": {
      name: "Fitness Tracker Pro",
      price: 199,
      originalPrice: 249,
      rating: 4.5,
      reviews: 1203,
      category: "Fitness",
      type: "wellness",
      description: "Advanced fitness tracking with heart rate monitoring, sleep analysis, and 50+ workout modes. Your personal wellness companion for effortless health optimization.",
      features: [
        "24/7 heart rate monitoring",
        "Advanced sleep tracking",
        "50+ workout modes",
        "7-day battery life",
        "Water resistant to 50m",
        "Built-in GPS"
      ],
      variants: ["Small", "Medium", "Large"],
      colors: ["Black", "Navy", "Rose Gold", "Silver"],
      icon: <Activity className="w-12 h-12 text-green-600" />,
      image: "bg-gradient-to-br from-green-100 to-emerald-100",
      inStock: true,
      shipping: "Free shipping",
      warranty: "2 year manufacturer warranty"
    }
  };

  const product = products[id] || products["1"];

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const relatedProducts = [
    { id: 2, name: "MacBook Air M3", price: "$1299", category: "Laptops", icon: <Laptop className="w-8 h-8 text-gray-600" />, image: "bg-gradient-to-br from-gray-100 to-slate-100" },
    { id: 3, name: "Apple Watch Ultra", price: "$799", category: "Wearables", icon: <Watch className="w-8 h-8 text-purple-600" />, image: "bg-gradient-to-br from-purple-100 to-pink-100" },
    { id: 4, name: "AirPods Pro 2", price: "$249", category: "Audio", icon: <Headphones className="w-8 h-8 text-orange-600" />, image: "bg-gradient-to-br from-orange-100 to-red-100" },
    { id: 7, name: "Energy Boost Supplement", price: "$39", category: "Energy", icon: <Zap className="w-8 h-8 text-yellow-600" />, image: "bg-gradient-to-br from-yellow-100 to-amber-100" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-32 pb-32 md:pt-40 md:pb-40">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-12 text-sm text-gray-600">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-foreground transition-colors">
              Shop
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="animate-fade-in">
              <div className={`${product.image} aspect-square rounded-xl mb-6 overflow-hidden shadow-lg flex items-center justify-center`}>
                {product.icon}
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`${product.image} aspect-square rounded-lg cursor-pointer hover:ring-2 ring-secondary transition-all opacity-70 hover:opacity-100 flex items-center justify-center`}
                  >
                    {product.icon}
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="animate-slide-up">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                      product.type === 'tech' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {product.type === 'tech' ? 'Technology' : 'Wellness'}
                    </span>
                    <h1 className="text-foreground">{product.name}</h1>
                  </div>
                  <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors group">
                    <Heart className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors" />
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-foreground">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-semibold">
                      Save ${product.originalPrice - product.price}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-1">
                    {Array(5).fill(0).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews.toLocaleString()} reviews)
                  </span>
                </div>

                {product.inStock && (
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 font-medium">In Stock</span>
                  </div>
                )}
              </div>

              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-foreground mb-4">
                  Color
                </label>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className="px-4 py-2 border border-gray-200 rounded-lg hover:border-secondary transition-colors text-sm hover:bg-gray-50"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Variant Selection */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-semibold text-foreground">
                    {product.type === 'tech' ? 'Storage' : 'Size'}
                  </label>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant}
                      onClick={() => setSelectedVariant(variant)}
                      className={`py-3 px-4 rounded-lg border transition-all font-medium ${
                        selectedVariant === variant
                          ? "border-secondary bg-secondary/10 text-secondary"
                          : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="space-y-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    addedToCart
                      ? "bg-green-500 text-white"
                      : product.type === 'tech'
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                      : "bg-gradient-to-r from-green-600 to-teal-600 text-white hover:from-green-700 hover:to-teal-700"
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Cart
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </button>

                <button className="w-full py-3 border-2 border-gray-200 rounded-xl text-foreground font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share Product
                </button>
              </div>

              {/* Product Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">{product.shipping}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">{product.warranty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium">30-day returns</span>
                </div>
              </div>

              {/* Product Tabs */}
              <div className="border-t border-gray-200 pt-8">
                <div className="flex gap-6 mb-6 border-b border-gray-200">
                  {[
                    { id: 'description', label: 'Description' },
                    { id: 'features', label: 'Features' },
                    { id: 'reviews', label: 'Reviews' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-3 px-1 font-medium transition-colors border-b-2 ${
                        activeTab === tab.id
                          ? 'border-secondary text-secondary'
                          : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="min-h-[200px]">
                  {activeTab === 'description' && (
                    <div className="animate-fade-in">
                      <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
                      <p className="text-gray-600">Experience the perfect blend of innovation and quality with this carefully selected product from our {product.type} collection.</p>
                    </div>
                  )}
                  
                  {activeTab === 'features' && (
                    <div className="animate-fade-in">
                      <ul className="space-y-3">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {activeTab === 'reviews' && (
                    <div className="animate-fade-in">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {Array(5).fill(0).map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="font-semibold">{product.rating}</span>
                        </div>
                        <span className="text-gray-600">Based on {product.reviews.toLocaleString()} reviews</span>
                      </div>
                      <p className="text-gray-600">Customer reviews and detailed ratings will be displayed here.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-20 pt-12 border-t border-gray-200">
            <h2 className="text-foreground mb-8 text-center">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((item, index) => (
                <Link 
                  key={item.id} 
                  to={`/product/${item.id}`} 
                  className="group transform transition-all duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`${item.image} aspect-square rounded-xl mb-4 overflow-hidden group-hover:shadow-xl transition-shadow duration-300 flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-secondary transition-colors mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2 capitalize">{item.category}</p>
                    <p className="text-xl font-bold text-foreground">{item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
