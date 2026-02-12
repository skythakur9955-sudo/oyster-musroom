import React, { useState } from "react";
import { ShoppingCart, Menu, X, Search, User } from "lucide-react";
import { motion } from "framer-motion";
import logoS from "./images/sakshamLogo.jpeg";



const Navbar = ({ cartItems, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Shop", href: "#products" },
    { name: "About", href: "#" },
    
   
    { name: "Recipes", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-100">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2">

          
           <img src={logoS} alt="Saksham Logo"
            className="w-10 h-10 rounded-full object-cover" />




            <div>


              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
               PAKRI MUSHROOM
              </h1>
              <p className="text-xs text-gray-500">Premium Oyster Mushrooms</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-green-600 transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-full bg-green-50 hover:bg-green-100 transition-colors">
              <Search className="w-4 h-4 text-green-600" />
              <span className="text-gray-600">Search</span>
            </button>

            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <User className="w-5 h-5 text-gray-600" />
            </button>

            <button
              onClick={onCartClick}
              className="relative p-2 rounded-full hover:bg-green-50 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-green-600" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="lg:hidden mt-4 border-t border-gray-100 pt-4"
          >
            <div className="space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-2 px-4 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
