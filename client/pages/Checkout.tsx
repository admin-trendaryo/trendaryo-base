import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";
import { Lock, ArrowRight, CreditCard, Smartphone, Bitcoin, User, UserCheck, Zap } from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"login" | "shipping" | "payment" | "review">("login");
  const [checkoutType, setCheckoutType] = useState<"guest" | "user" | "oneclick">("guest");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "applepay" | "crypto">("card");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
      const userData = JSON.parse(user);
      setSavedAddresses(userData.addresses || []);
      if (userData.addresses?.length > 0) {
        setStep('review');
        setCheckoutType('oneclick');
      } else {
        setStep('shipping');
        setCheckoutType('user');
      }
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOneClickCheckout = async () => {
    setProcessing(true);
    // Simulate API call
    setTimeout(() => {
      navigate("/order-confirmation");
    }, 1500);
  };

  const handleGuestCheckout = () => {
    setCheckoutType('guest');
    setStep('shipping');
  };

  const handleUserLogin = () => {
    // Simulate login
    setIsLoggedIn(true);
    setCheckoutType('user');
    setStep('shipping');
  };

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.address && formData.city && formData.state && formData.zip) {
      setStep("payment");
    }
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      navigate("/order-confirmation");
    }, 2000);
  };

  const handlePaymentMethodSelect = (method: typeof paymentMethod) => {
    setPaymentMethod(method);
    if (method === 'paypal' || method === 'applepay' || method === 'crypto') {
      // Skip to review for external payment methods
      setStep('review');
    }
  };

  const subtotal = 196;
  const shipping = 0;
  const tax = 19.6;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-32 pb-32 md:pt-40 md:pb-40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Forms */}
            <div className="lg:col-span-2">
              {/* Progress Steps */}
              <div className="mb-8 md:mb-16">
                <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-2">
                  {[{step: 'login', label: 'Account', num: 1}, {step: 'shipping', label: 'Shipping', num: 2}, {step: 'payment', label: 'Payment', num: 3}, {step: 'review', label: 'Review', num: 4}].map((s, i) => (
                    <div key={s.step} className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                      <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold transition-all ${
                        step === s.step ? "bg-orange-500 text-white" : 
                        ['login', 'shipping', 'payment', 'review'].indexOf(step) > i ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                      }`}>
                        {s.num}
                      </div>
                      <span className="text-xs md:text-sm font-semibold whitespace-nowrap">{s.label}</span>
                      {i < 3 && <div className="w-4 md:w-8 h-0.5 bg-gray-200" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Login/Account Step */}
              {step === "login" && (
                <div className="space-y-6">
                  <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-6">
                    How would you like to checkout?
                  </h2>
                  
                  {/* One-Click Checkout (if logged in with saved info) */}
                  {isLoggedIn && savedAddresses.length > 0 && (
                    <div className="p-4 md:p-6 border-2 border-orange-200 rounded-lg bg-orange-50">
                      <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-6 h-6 text-orange-600" />
                        <h3 className="font-semibold text-lg">Express Checkout</h3>
                      </div>
                      <p className="text-gray-600 mb-4">Use your saved information for instant checkout</p>
                      <MagneticButton
                        onClick={handleOneClickCheckout}
                        disabled={processing}
                        className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:opacity-50"
                      >
                        {processing ? 'Processing...' : 'Complete Order Now - $215.60'}
                      </MagneticButton>
                    </div>
                  )}
                  
                  {/* User Checkout */}
                  <div className="p-4 md:p-6 border rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <UserCheck className="w-6 h-6 text-blue-600" />
                      <h3 className="font-semibold text-lg">Sign In</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Access saved addresses and faster checkout</p>
                    <MagneticButton
                      onClick={handleUserLogin}
                      className="w-full py-3 border border-blue-500 text-blue-600 font-semibold rounded-lg hover:bg-blue-50"
                    >
                      Sign In to Your Account
                    </MagneticButton>
                  </div>
                  
                  {/* Guest Checkout */}
                  <div className="p-4 md:p-6 border rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <User className="w-6 h-6 text-gray-600" />
                      <h3 className="font-semibold text-lg">Guest Checkout</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Checkout without creating an account</p>
                    <MagneticButton
                      onClick={handleGuestCheckout}
                      className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900"
                    >
                      Continue as Guest
                    </MagneticButton>
                  </div>
                </div>
              )}

              {/* Shipping Form */}
              {step === "shipping" && (
                <form onSubmit={handleSubmitShipping}>
                  <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-6">
                    Shipping Address
                  </h2>

                  {/* Email */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                      required
                    />
                  </div>

                  {/* Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                      required
                    />
                  </div>

                  {/* City, State, Zip */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="New York"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="NY"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      placeholder="10001"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                      required
                    />
                  </div>

                  {/* Country */}
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>

                  <MagneticButton
                    type="submit"
                    className="w-full py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 flex items-center justify-center gap-2"
                  >
                    Continue to Payment
                    <ArrowRight className="w-5 h-5" />
                  </MagneticButton>
                </form>
              )}

              {/* Payment Form */}
              {step === "payment" && (
                <div>
                  <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-6">
                    Payment Method
                  </h2>
                  
                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <button
                      type="button"
                      onClick={() => handlePaymentMethodSelect('card')}
                      className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                        paymentMethod === 'card' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <CreditCard className="w-6 h-6" />
                      <span className="font-semibold">Credit Card</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => handlePaymentMethodSelect('paypal')}
                      className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                        paymentMethod === 'paypal' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">P</div>
                      <span className="font-semibold">PayPal</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => handlePaymentMethodSelect('applepay')}
                      className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                        paymentMethod === 'applepay' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Smartphone className="w-6 h-6" />
                      <span className="font-semibold">Apple Pay</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => handlePaymentMethodSelect('crypto')}
                      className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                        paymentMethod === 'crypto' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Bitcoin className="w-6 h-6" />
                      <span className="font-semibold">Crypto</span>
                    </button>
                  </div>
                  
                  {paymentMethod === 'card' && (
                    <form onSubmit={handleSubmitPayment}>

                      <div className="mb-6 p-4 bg-blue-50 rounded-lg flex gap-3">
                        <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-900">
                          Your payment information is secure and encrypted.
                        </p>
                      </div>

                      {/* Cardholder Name */}
                      <div className="mb-6">
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                          required
                        />
                      </div>

                      {/* Card Number */}
                      <div className="mb-6">
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="4242 4242 4242 4242"
                          maxLength="19"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          Use 4242 4242 4242 4242 for testing
                        </p>
                      </div>

                      {/* Expiry and CVC */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            maxLength="5"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            CVC
                          </label>
                          <input
                            type="text"
                            name="cardCVC"
                            value={formData.cardCVC}
                            onChange={handleInputChange}
                            placeholder="123"
                            maxLength="4"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-4">
                        <button
                          type="button"
                          onClick={() => setStep("shipping")}
                          className="flex-1 py-4 border border-gray-200 text-foreground font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Back
                        </button>
                        <MagneticButton
                          type="submit"
                          disabled={processing}
                          className="flex-1 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:opacity-50"
                        >
                          {processing ? 'Processing...' : 'Complete Order'}
                        </MagneticButton>
                      </div>
                    </form>
                  )}
                  
                  {/* External Payment Methods */}
                  {paymentMethod !== 'card' && (
                    <div className="text-center py-8">
                      <div className="mb-6">
                        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                          paymentMethod === 'paypal' ? 'bg-blue-100' :
                          paymentMethod === 'applepay' ? 'bg-gray-100' :
                          'bg-orange-100'
                        }`}>
                          {paymentMethod === 'paypal' && <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">P</div>}
                          {paymentMethod === 'applepay' && <Smartphone className="w-8 h-8 text-gray-600" />}
                          {paymentMethod === 'crypto' && <Bitcoin className="w-8 h-8 text-orange-600" />}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          {paymentMethod === 'paypal' && 'PayPal Checkout'}
                          {paymentMethod === 'applepay' && 'Apple Pay'}
                          {paymentMethod === 'crypto' && 'Cryptocurrency Payment'}
                        </h3>
                        <p className="text-gray-600">
                          You'll be redirected to complete your payment securely.
                        </p>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-4">
                        <button
                          onClick={() => setPaymentMethod('card')}
                          className="flex-1 py-4 border border-gray-200 text-foreground font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Back to Payment Methods
                        </button>
                        <MagneticButton
                          onClick={handleSubmitPayment}
                          disabled={processing}
                          className="flex-1 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:opacity-50"
                        >
                          {processing ? 'Redirecting...' : `Continue with ${paymentMethod === 'paypal' ? 'PayPal' : paymentMethod === 'applepay' ? 'Apple Pay' : 'Crypto'}`}
                        </MagneticButton>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Review Step */}
              {step === "review" && checkoutType === "oneclick" && (
                <div>
                  <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-6">
                    Review Your Order
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">Shipping Address</h3>
                      <p className="text-gray-600">John Doe<br />123 Main Street<br />New York, NY 10001</p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">Payment Method</h3>
                      <p className="text-gray-600">•••• •••• •••• 4242</p>
                    </div>
                    
                    <MagneticButton
                      onClick={handleOneClickCheckout}
                      disabled={processing}
                      className="w-full py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:opacity-50 text-lg"
                    >
                      {processing ? 'Processing Payment...' : 'Complete Order - $215.60'}
                    </MagneticButton>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-8 h-fit sticky top-32 order-first lg:order-last">
              <h3 className="font-serif font-bold text-lg text-foreground mb-6">
                Order Summary
              </h3>

              {/* Sample Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Essential Linen Shirt × 1</span>
                  <span className="font-semibold">$98.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Premium Denim × 2</span>
                  <span className="font-semibold">$98.00</span>
                </div>
              </div>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-orange-500 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold text-foreground">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}