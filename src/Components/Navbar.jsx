import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, Search, User, Package, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoS from "./images/sakshamLogo.jpeg";

const Navbar = ({ cartItems, onCartClick }) => {
  // ✅ 1. सारे Hooks सबसे पहले - COMPONENT के अंदर TOP LEVEL पर
  const { user, logout } = useAuth();              // ✅ यहाँ सही है
  const navigate = useNavigate();                   // ✅ यहाँ सही है
  const location = useLocation();                    // ✅ यहाँ सही है
  
  // ✅ 2. useState Hooks भी यहीं पर
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false); // ✅ यहाँ सही है

  // ✅ 3. Regular variables (non-hooks) - ये safe हैं
  const cartCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Recipes", path: "/recipes" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 backdrop-blur-xl border-b border-white/20 shadow-lg"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/20 via-green-200/20 to-teal-200/20 animate-gradient-x" />

      <div className="container mx-auto px-4 py-3 relative">
        <div className="flex items-center justify-between">
          {/* Logo - Link to Home with Enhanced Animation */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <img
                  src={logoS}
                  alt="Pakri Mushroom Logo"
                  className="relative w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                />
              </div>

              <div>
                <h1 className="text-2xl font-black">
                  <span className="bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    PAKRI MUSHROOM
                  </span>
                </h1>
                <p className="text-xs bg-gradient-to-r from-gray-600 to-gray-500 bg-clip-text text-transparent font-medium">
                  Premium Oyster Mushrooms
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation with Glass Effect */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-4 py-2 font-medium transition-all duration-300 ${
                  isActivePath(item.path)
                    ? "text-white"
                    : "text-gray-700 hover:text-green-600"
                }`}
              >
                {isActivePath(item.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-md"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Right Side Actions with Modern Design */}
          <div className="flex items-center space-x-3">
            {/* Search Bar - Modern Version */}
            <motion.div
              animate={{ width: isSearchFocused ? 240 : 180 }}
              className="hidden md:block relative"
            >
              <input
                type="text"
                placeholder="Search mushrooms..."
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full px-4 py-2 pl-10 rounded-full bg-white/70 backdrop-blur-sm border border-green-200 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-300/50 transition-all text-sm"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-green-500" />
            </motion.div>

            {/* User Menu / Login Button */}
            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 hover:shadow-lg transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-green-700 font-bold shadow-md">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40"
                        onClick={() => setShowUserMenu(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl z-50 border border-gray-100"
                      >
                        <div className="p-2">
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-semibold text-gray-900">
                              {user.name || 'User'}
                            </p>
                            <p className="text-xs text-gray-500">{user.email || ''}</p>
                          </div>
                          <Link
                            to="/profile"
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg w-full"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <User className="w-4 h-4" />
                            <span>My Profile</span>
                          </Link>
                          <Link
                            to="/profile?tab=orders"
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg w-full"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Package className="w-4 h-4" />
                            <span>My Orders</span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-xl hover:shadow-lg transition-all"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Cart Button with Enhanced Animation */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCartClick}
              className="relative p-2 rounded-full bg-gradient-to-r from-orange-400 to-red-400 text-white shadow-md hover:shadow-lg transition-shadow"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Button with Gradient */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu with Glass Effect */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden mt-4 rounded-2xl bg-white/90 backdrop-blur-lg border border-white/20 shadow-xl overflow-hidden"
          >
            <div className="p-2 space-y-1">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to={item.path}
                    className={`block py-3 px-4 rounded-xl font-medium transition-all ${
                      isActivePath(item.path)
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-green-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Search */}
              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="Search mushrooms..."
                  className="w-full px-4 py-3 pl-10 rounded-xl bg-white border border-green-200 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-300/50"
                />
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-green-500" />
              </div>

              {/* Mobile Login/Profile Link */}
              {!user && (
                <Link
                  to="/login"
                  className="block py-3 px-4 rounded-xl font-medium text-gray-700 hover:bg-green-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;