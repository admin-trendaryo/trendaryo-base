import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-32 pb-32 md:pt-40 md:pb-40">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-20">
            <h1 className="text-foreground mb-6">Get in Touch</h1>
            <p className="text-lg text-gray-600">
              Have questions? We'd love to hear from you. Our team typically responds 
              within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-10">
              {/* Email */}
              <div>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-serif font-bold text-foreground mb-2">Email</h3>
                <a
                  href="mailto:hello@trendaryo.com"
                  className="text-secondary hover:opacity-80 transition-opacity"
                >
                  hello@trendaryo.com
                </a>
                <p className="text-sm text-gray-600 mt-2">
                  We'll respond within 24 hours
                </p>
              </div>

              {/* Phone */}
              <div>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-serif font-bold text-foreground mb-2">Phone</h3>
                <a
                  href="tel:+18005551234"
                  className="text-secondary hover:opacity-80 transition-opacity"
                >
                  +1 (800) 555-1234
                </a>
                <p className="text-sm text-gray-600 mt-2">
                  Mon-Fri, 9am-6pm EST
                </p>
              </div>

              {/* Address */}
              <div>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-serif font-bold text-foreground mb-2">
                  Address
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  123 Fashion District<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>

              {/* Hours */}
              <div>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-serif font-bold text-foreground mb-2">Hours</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Mon-Fri: 9am - 6pm EST</p>
                  <p>Sat: 10am - 4pm EST</p>
                  <p>Sun: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary transition-colors"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary transition-colors"
                    required
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary transition-colors"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="shipping">Shipping & Delivery</option>
                    <option value="returns">Returns & Exchanges</option>
                    <option value="product">Product Question</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary transition-colors resize-none"
                    required
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitted}
                  className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                    submitted
                      ? "bg-green-500 text-white"
                      : "bg-secondary text-secondary-foreground hover:opacity-90"
                  }`}
                >
                  {submitted ? (
                    <>
                      <span>✓</span> Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              <p className="text-sm text-gray-600 text-center mt-6">
                We'll get back to you as soon as possible.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-50 rounded-lg p-16">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="max-w-2xl mx-auto space-y-8">
              {/* FAQ Item 1 */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  How long does shipping take?
                </h3>
                <p className="text-gray-600 text-sm">
                  Standard shipping typically takes 5-7 business days. You'll receive 
                  a tracking number once your order ships.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  What's your return policy?
                </h3>
                <p className="text-gray-600 text-sm">
                  We offer 30-day returns on all items in original condition. Return 
                  shipping is free for orders over $100.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Do you ship internationally?
                </h3>
                <p className="text-gray-600 text-sm">
                  Yes! We ship to most countries worldwide. International shipping rates 
                  will be calculated at checkout.
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  How can I track my order?
                </h3>
                <p className="text-gray-600 text-sm">
                  You'll receive a shipping confirmation email with a tracking link as 
                  soon as your order ships.
                </p>
              </div>

              {/* FAQ Item 5 */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Do you offer gift wrapping?
                </h3>
                <p className="text-gray-600 text-sm">
                  Yes! You can add gift wrapping and a personalized message at checkout 
                  for just $5.
                </p>
              </div>

              {/* FAQ Item 6 */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  How do I contact customer support?
                </h3>
                <p className="text-gray-600 text-sm">
                  You can reach us via email at hello@trendaryo.com, phone at
                  +1 (800) 555-1234, or use the contact form above.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
