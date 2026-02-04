import { Link } from "react-router-dom";
import { ArrowRight, Star, Truck, Shield, Smartphone, Laptop, Watch, Headphones, Heart, Activity, Zap, Leaf, CheckCircle, Users, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LazyImage from "@/components/LazyImage";
import ProductCard from "@/components/ProductCard";
import Recommendations from "@/components/Recommendations";

export default function Index() {
  const categories = [
    {
      id: 1,
      name: "Smartphones",
      image: "bg-gradient-to-br from-blue-50 to-indigo-100",
      icon: <Smartphone className="w-8 h-8 text-blue-600" />,
      category: "tech",
      count: "50+ Products"
    },
    {
      id: 2,
      name: "Laptops",
      image: "bg-gradient-to-br from-slate-50 to-gray-100",
      icon: <Laptop className="w-8 h-8 text-gray-600" />,
      category: "tech",
      count: "30+ Products"
    },
    {
      id: 3,
      name: "Wearables",
      image: "bg-gradient-to-br from-purple-50 to-pink-100",
      icon: <Watch className="w-8 h-8 text-purple-600" />,
      category: "tech",
      count: "25+ Products"
    },
    {
      id: 4,
      name: "Audio",
      image: "bg-gradient-to-br from-orange-50 to-red-100",
      icon: <Headphones className="w-8 h-8 text-orange-600" />,
      category: "tech",
      count: "40+ Products"
    },
    {
      id: 5,
      name: "Fitness",
      image: "bg-gradient-to-br from-green-50 to-emerald-100",
      icon: <Activity className="w-8 h-8 text-green-600" />,
      category: "wellness",
      count: "60+ Products"
    },
    {
      id: 6,
      name: "Health",
      image: "bg-gradient-to-br from-teal-50 to-cyan-100",
      icon: <Heart className="w-8 h-8 text-teal-600" />,
      category: "wellness",
      count: "35+ Products"
    },
    {
      id: 7,
      name: "Energy",
      image: "bg-gradient-to-br from-yellow-50 to-amber-100",
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      category: "wellness",
      count: "20+ Products"
    },
    {
      id: 8,
      name: "Natural",
      image: "bg-gradient-to-br from-lime-50 to-green-100",
      icon: <Leaf className="w-8 h-8 text-lime-600" />,
      category: "wellness",
      count: "45+ Products"
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: "$999",
      originalPrice: "$1099",
      image: "bg-gradient-to-br from-blue-100 to-purple-100",
      category: "Tech",
      rating: 4.8,
      reviewCount: 2847,
      badge: "Best Seller",
      has360: true,
      hasVideo: true,
      topReview: "Amazing camera quality and performance!"
    },
    {
      id: 2,
      name: "Fitness Tracker Pro",
      price: "$199",
      originalPrice: "$249",
      image: "bg-gradient-to-br from-green-100 to-emerald-100",
      category: "Wellness",
      rating: 4.6,
      reviewCount: 1203,
      badge: "New Arrival",
      has360: false,
      hasVideo: true,
      topReview: "Perfect for tracking my daily workouts."
    },
    {
      id: 3,
      name: "Wireless Earbuds",
      price: "$149",
      originalPrice: "$199",
      image: "bg-gradient-to-br from-gray-100 to-slate-100",
      category: "Tech",
      rating: 4.7,
      reviewCount: 892,
      badge: "Popular",
      has360: true,
      hasVideo: false,
      topReview: "Great sound quality and battery life."
    },
    {
      id: 4,
      name: "Organic Protein",
      price: "$49",
      originalPrice: "$59",
      image: "bg-gradient-to-br from-orange-100 to-yellow-100",
      category: "Wellness",
      rating: 4.5,
      reviewCount: 567,
      badge: "Recommended",
      has360: false,
      hasVideo: false,
      topReview: "Tastes great and mixes well!"
    }
  ];

  const bestSellers = [
    {
      id: 5,
      name: "MacBook Air M3",
      price: "$1299",
      originalPrice: "$1399",
      image: "bg-gradient-to-br from-gray-50 to-blue-100",
      category: "Tech",
      rating: 4.9,
      reviewCount: 1456,
      badge: "#1 Seller",
      has360: true,
      hasVideo: true,
      topReview: "Best laptop I've ever owned!"
    },
    {
      id: 6,
      name: "Smart Yoga Mat",
      price: "$129",
      originalPrice: "$159",
      image: "bg-gradient-to-br from-purple-50 to-pink-100",
      category: "Wellness",
      rating: 4.4,
      reviewCount: 743,
      badge: "Top Rated",
      has360: false,
      hasVideo: true,
      topReview: "Love the guided sessions feature."
    },
    {
      id: 7,
      name: "Gaming Headset Pro",
      price: "$179",
      originalPrice: "$229",
      image: "bg-gradient-to-br from-red-100 to-orange-100",
      category: "Tech",
      rating: 4.6,
      reviewCount: 934,
      badge: "Gamer's Choice",
      has360: true,
      hasVideo: true,
      topReview: "Crystal clear audio for gaming."
    }
  ];

  const newArrivals = [
    {
      id: 8,
      name: "Smart Water Bottle",
      price: "$89",
      originalPrice: "$109",
      image: "bg-gradient-to-br from-cyan-100 to-blue-100",
      category: "Wellness",
      rating: 4.3,
      reviewCount: 234,
      badge: "Just Launched",
      has360: false,
      hasVideo: true,
      topReview: "Keeps me hydrated all day!"
    },
    {
      id: 9,
      name: "VR Headset Elite",
      price: "$599",
      originalPrice: "$699",
      image: "bg-gradient-to-br from-indigo-100 to-purple-100",
      category: "Tech",
      rating: 4.7,
      reviewCount: 456,
      badge: "New",
      has360: true,
      hasVideo: true,
      topReview: "Incredible immersive experience!"
    },
    {
      id: 10,
      name: "Recovery Massage Gun",
      price: "$249",
      originalPrice: "$299",
      image: "bg-gradient-to-br from-green-100 to-teal-100",
      category: "Wellness",
      rating: 4.5,
      reviewCount: 321,
      badge: "New",
      has360: false,
      hasVideo: true,
      topReview: "Perfect for post-workout recovery."
    }
  ];

  const personalizedRecs = [
    {
      id: 11,
      name: "Smart Home Hub",
      price: "$199",
      originalPrice: "$249",
      image: "bg-gradient-to-br from-blue-100 to-indigo-100",
      category: "Tech",
      rating: 4.6,
      reviewCount: 678,
      badge: "For You",
      has360: true,
      hasVideo: false,
      topReview: "Makes my home so much smarter!"
    },
    {
      id: 12,
      name: "Meditation Cushion",
      price: "$79",
      originalPrice: "$99",
      image: "bg-gradient-to-br from-green-100 to-lime-100",
      category: "Wellness",
      rating: 4.4,
      reviewCount: 445,
      badge: "Recommended",
      has360: false,
      hasVideo: false,
      topReview: "So comfortable for long sessions."
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      text: "Trendaryo's tech selection is incredible. Found the perfect laptop and fitness tracker combo!",
      rating: 5,
      avatar: "👩💻"
    },
    {
      id: 2,
      name: "Marcus Williams",
      text: "The wellness products actually work. My health routine has never been better.",
      rating: 5,
      avatar: "👨⚕️"
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      text: "Love how they combine cutting-edge tech with natural wellness. Perfect balance.",
      rating: 5,
      avatar: "👩🎨"
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main content with proper semantic structure */}
      <main id="main-content" role="main" tabIndex={-1}>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Main Heading */}
            <div className="mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                  Trendaryo
                </span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 mb-4">
                Effortless Excellence
              </p>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Where cutting-edge technology meets holistic wellness. Discover products that enhance your digital life and nurture your well-being.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up">
              <Link
                to="/shop?category=tech"
                className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                <Smartphone className="w-4 h-4 md:w-5 md:h-5" />
                Explore Technology
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
              <Link
                to="/shop?category=wellness"
                className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                <Heart className="w-4 h-4 md:w-5 md:h-5" />
                Discover Wellness
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </div>

            {/* Seasonal Promotions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 animate-scale-in">
              <Link 
                to="/shop?category=tech&sale=winter"
                className="group relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <div className="relative z-10">
                  <div className="text-2xl md:text-3xl font-bold mb-2">Winter Tech Sale</div>
                  <div className="text-lg md:text-xl mb-2">Up to 40% Off</div>
                  <div className="text-sm md:text-base opacity-90">Latest gadgets & devices</div>
                </div>
                <div className="absolute top-4 right-4 text-4xl md:text-6xl opacity-20">❄️</div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-700/20 group-hover:from-blue-700/30 group-hover:to-purple-800/30 transition-all duration-300"></div>
              </Link>
              
              <Link 
                to="/shop?category=wellness&sale=newyear"
                className="group relative bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-6 md:p-8 text-white overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <div className="relative z-10">
                  <div className="text-2xl md:text-3xl font-bold mb-2">New Year Wellness</div>
                  <div className="text-lg md:text-xl mb-2">30% Off Fitness</div>
                  <div className="text-sm md:text-base opacity-90">Start your health journey</div>
                </div>
                <div className="absolute top-4 right-4 text-4xl md:text-6xl opacity-20">🌟</div>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-teal-700/20 group-hover:from-green-700/30 group-hover:to-teal-800/30 transition-all duration-300"></div>
              </Link>
            </div>

            {/* Featured Product Carousel */}
            <div className="mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 animate-fade-in">Featured This Week</h3>
              <div className="relative">
                <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                  {featuredProducts.map((product, index) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="group flex-shrink-0 w-64 md:w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden snap-center animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`${product.image} aspect-square flex items-center justify-center relative`}>
                        <div className="text-4xl md:text-6xl opacity-60">📱</div>
                        <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {product.badge}
                        </span>
                        <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-semibold">{product.rating}</span>
                        </div>
                      </div>
                      <div className="p-4 md:p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                            {product.category}
                          </span>
                        </div>
                        <h4 className="font-bold text-lg md:text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xl md:text-2xl font-bold text-gray-900">{product.price}</span>
                          <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                {/* Scroll indicators */}
                <div className="flex justify-center mt-4 gap-2">
                  {featuredProducts.map((_, index) => (
                    <div key={index} className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto animate-scale-in">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-blue-600 mb-1">25K+</div>
                <div className="text-xs md:text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-green-600 mb-1">1000+</div>
                <div className="text-xs md:text-sm text-gray-600">Products</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-purple-600 mb-1">4.9★</div>
                <div className="text-xs md:text-sm text-gray-600">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-orange-600 mb-1">150+</div>
                <div className="text-xs md:text-sm text-gray-600">Brands</div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-20 left-4 md:left-10 w-16 md:w-20 h-16 md:h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-8 md:right-20 w-12 md:w-16 h-12 md:h-16 bg-green-200 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-8 md:left-20 w-8 md:w-12 h-8 md:h-12 bg-purple-200 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-slide-up">
              Handpicked items that perfectly blend innovation with wellness
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">🏆 Bestsellers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-slide-up">
              Our most popular products loved by thousands of customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSellers.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                className="border-2 border-yellow-100 hover:border-yellow-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">✨ New Arrivals</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-slide-up">
              Latest innovations in tech and wellness just for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newArrivals.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                className="border-2 border-green-100 hover:border-green-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Personalized Recommendations */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">🎯 Just For You</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-slide-up">
              Personalized recommendations based on your interests
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {personalizedRecs.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                className="border-2 border-purple-100 hover:border-purple-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Trusted by thousands worldwide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex gap-1 mb-4">
                  {Array(testimonial.rating).fill(0).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personalized Recommendations */}
      <Recommendations 
        title="Just For You" 
        limit={4} 
        className="bg-gradient-to-br from-purple-50 to-pink-50" 
      />

      {/* Features */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Free Shipping</h3>
              <p className="text-gray-300">On all orders over $50. Fast and reliable delivery worldwide.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">30-Day Returns</h3>
              <p className="text-gray-300">Hassle-free returns if you change your mind. No questions asked.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Guaranteed</h3>
              <p className="text-gray-300">Every product inspected for perfection. Premium quality assured.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Experience Excellence?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Join thousands who've discovered the perfect balance of technology and wellness
          </p>
          <MagneticButton
            as="Link"
            to="/shop"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 shadow-2xl text-lg"
          >
            Start Shopping
            <ArrowRight className="w-6 h-6" />
          </MagneticButton>
        </div>
      </section>

      </main>

      <Footer />
    </div>
  );
}