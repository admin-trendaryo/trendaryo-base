import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PersonalizationSettings from "@/components/PersonalizationSettings";
import { User, Package, Heart, LogOut, Edit2, Settings } from "lucide-react";

export default function Account() {
  const [activeTab, setActiveTab] = useState<
    "orders" | "profile" | "wishlist"
  >("orders");
  const [isEditing, setIsEditing] = useState(false);

  const orders = [
    {
      id: "LX-ABC123XYZ",
      date: "Nov 15, 2024",
      total: "$323.40",
      status: "Delivered",
      items: 2,
    },
    {
      id: "LX-DEF456UVW",
      date: "Nov 8, 2024",
      total: "$156.75",
      status: "Delivered",
      items: 1,
    },
    {
      id: "LX-GHI789RST",
      date: "Oct 28, 2024",
      total: "$89.99",
      status: "Delivered",
      items: 1,
    },
  ];

  const wishlist = [
    { id: 1, name: "Cashmere Sweater", price: "$160", image: "🧶" },
    { id: 2, name: "Leather Accessories", price: "$120", image: "👜" },
    { id: 3, name: "Designer Heels", price: "$280", image: "👠" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-32 pb-32 md:pt-40 md:pb-40">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-foreground mb-4">My Account</h1>
            <p className="text-lg text-gray-600">
              Welcome back! Manage your orders and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-4 pb-6 border-b border-gray-200 mb-6">
                  <div className="w-12 h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">John Doe</p>
                    <p className="text-sm text-gray-600">john@example.com</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                      activeTab === "orders"
                        ? "bg-secondary text-secondary-foreground"
                        : "hover:bg-gray-200 text-foreground"
                    }`}
                  >
                    <Package className="w-5 h-5" />
                    Orders
                  </button>
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                      activeTab === "profile"
                        ? "bg-secondary text-secondary-foreground"
                        : "hover:bg-gray-200 text-foreground"
                    }`}
                  >
                    <User className="w-5 h-5" />
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab("wishlist")}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                      activeTab === "wishlist"
                        ? "bg-secondary text-secondary-foreground"
                        : "hover:bg-gray-200 text-foreground"
                    }`}
                  >
                    <Heart className="w-5 h-5" />
                    Wishlist
                  </button>
                  <button
                    onClick={() => setActiveTab("personalization")}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                      activeTab === "personalization"
                        ? "bg-secondary text-secondary-foreground"
                        : "hover:bg-gray-200 text-foreground"
                    }`}
                  >
                    <Settings className="w-5 h-5" />
                    Personalization
                  </button>
                  <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-100 transition-colors text-destructive flex items-center gap-3">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                    Order History
                  </h2>

                  {orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                            <div>
                              <p className="font-semibold text-foreground">
                                Order {order.id}
                              </p>
                              <p className="text-sm text-gray-600">{order.date}</p>
                            </div>
                            <div className="flex items-center gap-6">
                              <div>
                                <p className="text-sm text-gray-600">
                                  {order.items} item
                                  {order.items > 1 ? "s" : ""}
                                </p>
                                <p className="font-semibold text-foreground">
                                  {order.total}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                                  {order.status}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Link
                            to={`/order-confirmation`}
                            className="text-secondary hover:opacity-80 transition-opacity text-sm font-semibold"
                          >
                            View Details →
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">No orders yet</p>
                      <Link
                        to="/shop"
                        className="text-secondary hover:opacity-80 transition-opacity font-semibold"
                      >
                        Start Shopping →
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-2xl font-bold text-foreground">
                      Profile Information
                    </h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-2 text-secondary hover:opacity-80 transition-opacity font-semibold"
                    >
                      <Edit2 className="w-4 h-4" />
                      {isEditing ? "Done" : "Edit"}
                    </button>
                  </div>

                  {isEditing ? (
                    <form className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            defaultValue="John"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            defaultValue="Doe"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue="john@example.com"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          defaultValue="+1 (555) 123-4567"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary"
                        />
                      </div>

                      <div>
                        <h3 className="font-serif font-bold text-foreground mb-4">
                          Default Address
                        </h3>
                        <div className="space-y-4">
                          <input
                            type="text"
                            defaultValue="123 Main Street"
                            placeholder="Address"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary"
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              defaultValue="New York"
                              placeholder="City"
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary"
                            />
                            <input
                              type="text"
                              defaultValue="NY"
                              placeholder="State"
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary"
                            />
                          </div>
                          <input
                            type="text"
                            defaultValue="10001"
                            placeholder="Zip Code"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Save Changes
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-8">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Full Name</p>
                        <p className="font-semibold text-foreground">John Doe</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-2">Email</p>
                        <p className="font-semibold text-foreground">
                          john@example.com
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-2">Phone</p>
                        <p className="font-semibold text-foreground">
                          +1 (555) 123-4567
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-4">
                          Default Address
                        </p>
                        <p className="text-foreground leading-relaxed">
                          123 Main Street<br />
                          New York, NY 10001<br />
                          United States
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Personalization Tab */}
              {activeTab === "personalization" && (
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                    Personalization Settings
                  </h2>
                  <PersonalizationSettings />
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                    Wishlist
                  </h2>

                  {wishlist.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {wishlist.map((item) => (
                        <Link
                          key={item.id}
                          to={`/product/${item.id}`}
                          className="group"
                        >
                          <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-5xl">
                              {item.image}
                            </div>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                              className="absolute top-3 right-3 p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                              <Heart className="w-5 h-5 fill-destructive text-destructive" />
                            </button>
                          </div>
                          <h3 className="font-serif font-bold text-foreground group-hover:text-secondary transition-colors mb-2">
                            {item.name}
                          </h3>
                          <p className="font-semibold text-foreground">
                            {item.price}
                          </p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">No items in wishlist</p>
                      <Link
                        to="/shop"
                        className="text-secondary hover:opacity-80 transition-opacity font-semibold"
                      >
                        Continue Shopping →
                      </Link>
                    </div>
                  )}
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
