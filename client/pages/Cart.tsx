import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Trash2, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Essential Linen Shirt",
      price: 98,
      quantity: 1,
      size: "M",
      color: "Natural",
      image: "👕",
    },
    {
      id: 2,
      name: "Premium Denim",
      price: 98,
      quantity: 2,
      size: "L",
      color: "Navy",
      image: "👖",
    },
  ]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = Math.round(subtotal * 0.1 * 100) / 100;
  const total = subtotal + shipping + tax;

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-32 pb-32 md:pt-40 md:pb-40">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-foreground mb-6">Shopping Cart</h1>
            <p className="text-lg text-gray-600">
              Review your items before checkout
            </p>
          </div>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-6 pb-6 border-b border-gray-200"
                    >
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-4xl">{item.image}</span>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <Link
                          to={`/product/${item.id}`}
                          className="font-serif text-lg font-bold text-foreground hover:text-secondary transition-colors mb-2 block"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-600 mb-3">
                          {item.color} • Size {item.size}
                        </p>
                        <p className="font-semibold text-foreground">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity and Remove */}
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-destructive"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors flex items-center justify-center"
                          >
                            −
                          </button>
                          <span className="w-6 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue Shopping */}
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-secondary hover:opacity-80 transition-opacity mt-8 font-semibold"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-8 h-fit sticky top-32">
                <h3 className="font-serif font-bold text-lg text-foreground mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-secondary font-semibold">
                          FREE
                        </span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-bold text-foreground mb-6">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Link
                  to="/checkout"
                  className="block w-full py-4 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-center mb-3"
                >
                  Proceed to Checkout
                </Link>

                {subtotal < 50 && (
                  <p className="text-xs text-gray-600 text-center">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🛒</div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Your Cart is Empty
              </h2>
              <p className="text-gray-600 mb-8">
                Start adding items to begin your shopping journey
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
