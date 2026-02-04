import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, ChevronDown, Search, Smartphone, Laptop, Watch, Headphones, Heart, Activity, Zap, Leaf } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import CarTrolleyAnimation from "./CarTrolleyAnimation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTechMenu, setShowTechMenu] = useState(false);
  const [showWellnessMenu, setShowWellnessMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for sticky effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const techCategories = [
    { name: "Smartphones", icon: <Smartphone className="w-4 h-4" />, path: "/shop?category=smartphones" },
    { name: "Laptops", icon: <Laptop className="w-4 h-4" />, path: "/shop?category=laptops" },
    { name: "Wearables", icon: <Watch className="w-4 h-4" />, path: "/shop?category=wearables" },
    { name: "Audio", icon: <Headphones className="w-4 h-4" />, path: "/shop?category=audio" },
  ];

  const wellnessCategories = [
    { name: "Fitness", icon: <Activity className="w-4 h-4" />, path: "/shop?category=fitness" },
    { name: "Health", icon: <Heart className="w-4 h-4" />, path: "/shop?category=health" },
    { name: "Energy", icon: <Zap className="w-4 h-4" />, path: "/shop?category=energy" },
    { name: "Natural", icon: <Leaf className="w-4 h-4" />, path: "/shop?category=natural" },
  ];

  // Search suggestions
  const searchSuggestions = [
    "iPhone 15 Pro", "MacBook Air", "Apple Watch", "AirPods Pro",
    "Fitness Tracker", "Protein Powder", "Yoga Mat", "Vitamins",
    "Gaming Laptop", "Wireless Earbuds", "Smart Home", "Health Monitor"
  ];

  const filteredSuggestions = searchSuggestions.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery.length > 0
  );

  const handleSearchFocus = () => setShowSuggestions(true);
  const handleSearchBlur = () => setTimeout(() => setShowSuggestions(false), 200);

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground transition-all duration-300",
        isScrolled ? "shadow-lg bg-primary/95 backdrop-blur-sm" : ""
      )}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-2xl font-bold hover:opacity-90 transition-opacity flex-shrink-0"
          >
            Trendaryo
          </Link>

          {/* Desktop Navigation with Search */}
          <div className="hidden lg:flex items-center gap-6 flex-1 max-w-4xl mx-8">
            {/* Navigation Links */}
            <nav className="flex items-center gap-6">
              <Link
                to="/"
                className="text-sm font-medium text-orange-400 hover:text-orange-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 rounded px-2 py-1"
              >
                Home
              </Link>
              
              {/* Shop Tech Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setShowTechMenu(true)}
                onMouseLeave={() => setShowTechMenu(false)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-orange-400 hover:text-orange-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 rounded px-2 py-1" aria-expanded={showTechMenu} aria-haspopup="true">
                  Shop Tech
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showTechMenu && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-4 z-50 animate-fade-in">
                    <div className="px-4 pb-3 border-b border-gray-100">
                      <h3 className="font-semibold text-blue-600 text-sm">Technology</h3>
                      <p className="text-xs text-gray-500 mt-1">Smart devices & gadgets</p>
                    </div>
                    <div className="py-2">
                      {techCategories.map((category) => (
                        <Link
                          key={category.name}
                          to={category.path}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                        >
                          {category.icon}
                          {category.name}
                        </Link>
                      ))}
                    </div>
                    <div className="px-4 pt-3 border-t border-gray-100">
                      <Link
                        to="/shop?category=tech"
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        View All Tech →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Shop Wellness Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setShowWellnessMenu(true)}
                onMouseLeave={() => setShowWellnessMenu(false)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-orange-400 hover:text-orange-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 rounded px-2 py-1" aria-expanded={showWellnessMenu} aria-haspopup="true">
                  Shop Wellness
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showWellnessMenu && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-4 z-50 animate-fade-in">
                    <div className="px-4 pb-3 border-b border-gray-100">
                      <h3 className="font-semibold text-green-600 text-sm">Wellness</h3>
                      <p className="text-xs text-gray-500 mt-1">Health & fitness essentials</p>
                    </div>
                    <div className="py-2">
                      {wellnessCategories.map((category) => (
                        <Link
                          key={category.name}
                          to={category.path}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                        >
                          {category.icon}
                          {category.name}
                        </Link>
                      ))}
                    </div>
                    <div className="px-4 pt-3 border-t border-gray-100">
                      <Link
                        to="/shop?category=wellness"
                        className="text-xs text-green-600 hover:text-green-700 font-medium"
                      >
                        View All Wellness →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/about"
                className="text-sm font-medium text-orange-400 hover:text-orange-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 rounded px-2 py-1"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium text-orange-400 hover:text-orange-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 rounded px-2 py-1"
              >
                Contact
              </Link>
            </nav>

            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                />
              </div>
              
              {/* Search Suggestions */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 max-h-60 overflow-y-auto">
                  {filteredSuggestions.slice(0, 6).map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setShowSuggestions(false);
                      }}
                    >
                      <Search className="inline w-3 h-3 mr-2 text-gray-400" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sticky CTA Button + Cart */}
          <div className={cn(
            "hidden lg:flex items-center gap-4 transition-all duration-300",
            isScrolled ? "scale-95" : ""
          )}>
            <Link
              to="/account"
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 text-sm transform hover:scale-105 shadow-md"
            >
              Sign In
            </Link>
            <Link
              to="/cart"
              className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors duration-200 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">0</span>
            </Link>
          </div>

          {/* Mobile Menu Button + Cart */}
          <div className="lg:hidden flex items-center gap-4">
            <Link
              to="/cart"
              className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors duration-200 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">0</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors duration-200"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-primary-foreground/20 bg-primary">
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <nav className="flex flex-col gap-3">
                <Link
                  to="/"
                  className="text-sm font-medium py-2 text-orange-400 hover:text-orange-300 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                
                {/* Mobile Tech Menu */}
                <div className="border-l-2 border-orange-400 pl-4">
                  <p className="text-sm font-semibold text-orange-300 mb-2">Shop Tech</p>
                  {techCategories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.path}
                      className="flex items-center gap-2 text-sm py-1 text-orange-200 hover:text-orange-100 transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      {category.icon}
                      {category.name}
                    </Link>
                  ))}
                </div>
                
                {/* Mobile Wellness Menu */}
                <div className="border-l-2 border-orange-400 pl-4">
                  <p className="text-sm font-semibold text-orange-300 mb-2">Shop Wellness</p>
                  {wellnessCategories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.path}
                      className="flex items-center gap-2 text-sm py-1 text-orange-200 hover:text-orange-100 transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      {category.icon}
                      {category.name}
                    </Link>
                  ))}
                </div>
                
                <Link
                  to="/about"
                  className="text-sm font-medium py-2 text-orange-400 hover:text-orange-300 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-sm font-medium py-2 text-orange-400 hover:text-orange-300 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  to="/account"
                  className="text-sm font-medium py-2 text-orange-400 hover:text-orange-300 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Account
                </Link>
                <Link
                  to="/account"
                  className="w-full block px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 text-sm mt-4 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Animation Bar */}
      <CarTrolleyAnimation />
    </>
  );
}