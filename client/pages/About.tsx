import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Globe, Zap, Smartphone, Activity, Target, Users, Award, Lightbulb } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-32 pb-32 md:pt-40 md:pb-40">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-foreground mb-8 animate-fade-in">
              About Trendaryo
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed animate-slide-up">
              Where cutting-edge technology meets holistic wellness. We believe effortless excellence 
              should enhance both your digital life and physical well-being, creating harmony in modern living.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20 md:py-28 mb-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-in-left">
                <h2 className="font-serif text-4xl font-bold text-foreground mb-8">
                  Our Mission
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    Trendaryo was born from a simple observation: technology and wellness 
                    shouldn't be separate worlds. We curate products that seamlessly blend 
                    innovation with well-being, making it effortless to live your best life.
                  </p>
                  <p>
                    Every product in our collection is carefully selected for its ability to 
                    enhance your daily routine, whether it's a smart device that simplifies 
                    your workflow or a wellness product that supports your health journey.
                  </p>
                  <p>
                    We partner with leading brands and emerging innovators who share our 
                    commitment to quality, sustainability, and user-centric design.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 animate-slide-in-right">
                <div className="bg-blue-100 rounded-xl p-6 text-center">
                  <Smartphone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-blue-800 mb-2">Smart Technology</h3>
                  <p className="text-sm text-blue-600">Devices that enhance productivity</p>
                </div>
                <div className="bg-green-100 rounded-xl p-6 text-center">
                  <Activity className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-green-800 mb-2">Wellness Focus</h3>
                  <p className="text-sm text-green-600">Products for optimal health</p>
                </div>
                <div className="bg-purple-100 rounded-xl p-6 text-center">
                  <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-purple-800 mb-2">Curated Quality</h3>
                  <p className="text-sm text-purple-600">Handpicked for excellence</p>
                </div>
                <div className="bg-orange-100 rounded-xl p-6 text-center">
                  <Lightbulb className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-orange-800 mb-2">Innovation</h3>
                  <p className="text-sm text-orange-600">Latest trends and breakthroughs</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="container mx-auto px-4 mb-24 py-20 md:py-28">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-16 text-center animate-fade-in">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Innovation */}
            <div className="text-center group hover-lift animate-scale-in stagger-1">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow">
                <Zap className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                Innovation First
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We seek out the latest breakthroughs in technology and wellness, 
                bringing you products that represent the cutting edge of their fields.
              </p>
            </div>

            {/* Quality */}
            <div className="text-center group hover-lift animate-scale-in stagger-2">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow">
                <Award className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                Uncompromising Quality
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Every product undergoes rigorous testing and evaluation. We only offer 
                items that meet our high standards for performance and durability.
              </p>
            </div>

            {/* Wellness */}
            <div className="text-center group hover-lift animate-scale-in stagger-3">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow">
                <Heart className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                Holistic Wellness
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We believe true wellness encompasses physical, mental, and digital health. 
                Our products support all aspects of your well-being.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-gray-50 py-20 md:py-28 mb-24">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-16 text-center">
              Meet Our Team
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {/* Team Member 1 */}
              <div className="text-center bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow animate-fade-in stagger-1">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl">
                  👩💻
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                  Sarah Chen
                </h3>
                <p className="text-blue-600 font-semibold mb-4">Founder & Tech Curator</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Former Silicon Valley product manager with 10+ years experience in 
                  consumer technology and wellness innovation.
                </p>
              </div>

              {/* Team Member 2 */}
              <div className="text-center bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow animate-fade-in stagger-2">
                <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-teal-100 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl">
                  👨⚕️
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                  Dr. Marcus Williams
                </h3>
                <p className="text-green-600 font-semibold mb-4">Wellness Director</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Licensed nutritionist and fitness expert specializing in integrative 
                  health and evidence-based wellness solutions.
                </p>
              </div>

              {/* Team Member 3 */}
              <div className="text-center bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow animate-fade-in stagger-3">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl">
                  👩🎨
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                  Elena Rodriguez
                </h3>
                <p className="text-purple-600 font-semibold mb-4">Design & UX Lead</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Award-winning designer focused on creating intuitive experiences 
                  that bridge technology and human needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="container mx-auto px-4 mb-24 py-20 md:py-28">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white rounded-2xl p-12 md:p-16 animate-fade-in">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">
              Our Growing Impact
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="animate-scale-in stagger-1">
                <p className="text-4xl font-bold mb-2">25K+</p>
                <p className="text-white/90 text-sm">
                  Happy Customers
                </p>
              </div>
              <div className="animate-scale-in stagger-2">
                <p className="text-4xl font-bold mb-2">1000+</p>
                <p className="text-white/90 text-sm">
                  Products Curated
                </p>
              </div>
              <div className="animate-scale-in stagger-3">
                <p className="text-4xl font-bold mb-2">150+</p>
                <p className="text-white/90 text-sm">
                  Brand Partners
                </p>
              </div>
              <div className="animate-scale-in stagger-4">
                <p className="text-4xl font-bold mb-2">4.9★</p>
                <p className="text-white/90 text-sm">
                  Customer Rating
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6 animate-fade-in">
              Ready to Experience Effortless Excellence?
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed animate-slide-up">
              Join thousands who've discovered the perfect balance of technology and wellness. 
              Explore our curated collection and transform your daily routine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
              <Link
                to="/shop?category=tech"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore Technology
              </Link>
              <Link
                to="/shop?category=wellness"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Discover Wellness
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}