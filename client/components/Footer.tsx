import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Trendaryo</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Effortless excellence in every piece. Curated for modern living.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide">
              Shop
            </h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li>
                <Link
                  to="/shop"
                  className="hover:text-primary-foreground transition-colors duration-200"
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-primary-foreground transition-colors duration-200"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-primary-foreground transition-colors duration-200"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  to="/account"
                  className="hover:text-primary-foreground transition-colors duration-200"
                >
                  My Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary-foreground transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary-foreground transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-foreground transition-colors duration-200"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-foreground transition-colors duration-200"
                >
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide">
              Newsletter
            </h4>
            <p className="text-primary-foreground/70 text-sm mb-4">
              Subscribe for exclusive offers and new launches.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 px-4 py-2 rounded-md text-primary text-sm placeholder-gray-400"
              />
              <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-opacity duration-200">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-primary-foreground/60 text-sm">
              © {currentYear} Trendaryo. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex gap-6">
              <a
                href="#"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
