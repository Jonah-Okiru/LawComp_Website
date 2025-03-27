import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

/**
 * Footer component with company information, links, and contact details
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <img 
                src="/images/logo.jpeg" 
                alt="LawComp Computers" 
                className="h-8 w-auto mr-2"
              />
              LawComp Computers
            </h3>
            <p className="text-gray-400 mb-4">
              Your trusted partner for quality tech products in Kenya. We offer the best deals on laptops, accessories, and more.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition">Home</a></li>
              <li><a href="/products" className="text-gray-400 hover:text-white transition">Products</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white transition">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition">Contact</a></li>
              <li><a href="/blog" className="text-gray-400 hover:text-white transition">Blog</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="/faq" className="text-gray-400 hover:text-white transition">FAQ</a></li>
              <li><a href="/shipping" className="text-gray-400 hover:text-white transition">Shipping Policy</a></li>
              <li><a href="/returns" className="text-gray-400 hover:text-white transition">Return Policy</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">123 Tech Street, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-gray-400 mr-3" />
                <a href="tel:+254712345678" className="text-gray-400 hover:text-white transition">+254 712 345 678</a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-gray-400 mr-3" />
                <a href="mailto:info@lawcomp.com" className="text-gray-400 hover:text-white transition">info@lawcomp.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} LawComp Computers. All rights reserved.</p>
          <p className="mt-1 text-sm">Proudly Kenyan</p>
        </div>
      </div>
    </footer>
  );
};