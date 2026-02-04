import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Download, Package } from "lucide-react";

export default function OrderConfirmation() {
  const orderId = "LX-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-32 pb-32 md:pt-40 md:pb-40">
        <div className="container mx-auto px-4">
          {/* Success Message */}
          <div className="max-w-2xl mx-auto text-center mb-20">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-foreground mb-4">Order Confirmed!</h1>
            <p className="text-lg text-gray-600 mb-2">
              Thank you for your purchase.
            </p>
            <p className="text-gray-500 mb-8">
              A confirmation email has been sent to your inbox with all the details.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-600 mb-2">Order Number</p>
              <p className="font-serif text-2xl font-bold text-foreground mb-4">
                {orderId}
              </p>
              <p className="text-sm text-gray-600">{orderDate}</p>
            </div>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Items */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                Order Items
              </h2>

              <div className="space-y-6">
                {/* Item 1 */}
                <div className="flex gap-6 pb-6 border-b border-gray-200">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">👕</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif font-bold text-foreground mb-2">
                      Essential Linen Shirt
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Natural • Size M
                    </p>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Quantity: 1</span>
                      <span className="font-semibold text-foreground">
                        $98.00
                      </span>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex gap-6 pb-6 border-b border-gray-200">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">👖</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif font-bold text-foreground mb-2">
                      Premium Denim
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">Navy • Size L</p>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Quantity: 2</span>
                      <span className="font-semibold text-foreground">
                        $196.00
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-6">
              {/* Shipping */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Shipping Address
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  John Doe<br />
                  123 Main Street<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>

              {/* Billing */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Billing Address
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Same as shipping
                </p>
              </div>

              {/* Totals */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">$294.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-secondary">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">$29.40</span>
                  </div>
                </div>
                <div className="flex justify-between text-lg font-bold text-foreground">
                  <span>Total</span>
                  <span>$323.40</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Section */}
          <div className="bg-blue-50 rounded-lg p-8 mb-12">
            <div className="flex gap-4 mb-6">
              <Package className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  Track Your Order
                </h3>
                <p className="text-sm text-blue-800">
                  You'll receive a shipping confirmation email with tracking information
                  within 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4 mb-16">
            <Link
              to="/account"
              className="flex-1 py-4 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-center"
            >
              View Order History
            </Link>
            <button className="flex-1 py-4 border border-gray-200 text-foreground font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Invoice
            </button>
            <Link
              to="/shop"
              className="flex-1 py-4 border border-foreground text-foreground font-semibold rounded-lg hover:bg-foreground hover:text-white transition-colors text-center"
            >
              Continue Shopping
            </Link>
          </div>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
              Questions?
            </h3>
            <div className="space-y-4">
              <div className="pb-4 border-b border-gray-200">
                <h4 className="font-semibold text-foreground mb-2">
                  How long will delivery take?
                </h4>
                <p className="text-gray-600 text-sm">
                  Standard shipping typically arrives within 5-7 business days. You'll
                  receive tracking information once your order ships.
                </p>
              </div>
              <div className="pb-4 border-b border-gray-200">
                <h4 className="font-semibold text-foreground mb-2">
                  Can I modify my order?
                </h4>
                <p className="text-gray-600 text-sm">
                  If your order hasn't shipped yet, contact us within 2 hours of
                  purchase to make changes.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  What's your return policy?
                </h4>
                <p className="text-gray-600 text-sm">
                  We offer 30-day returns on all items in original condition. Contact
                  support for a prepaid return label.
                </p>
              </div>
            </div>

            <Link
              to="/contact"
              className="block mt-6 text-center text-secondary hover:opacity-80 transition-opacity font-semibold"
            >
              Contact Support →
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
