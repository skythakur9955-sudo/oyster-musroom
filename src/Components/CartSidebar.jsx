import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartSidebar = ({ isOpen, onClose, items, updateQuantity, removeFromCart }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ShoppingBag className="w-6 h-6 text-green-600" />
                    <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                    <span className="bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded-full">
                      {items.length} items
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Empty State */}
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 text-center mb-8">
                    Add some delicious oyster mushrooms to get started!
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-200 transition-all"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="text-lg font-bold text-gray-900">
                                ₹{item.price}
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-1">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-1 hover:bg-gray-100 rounded"
                                  >
                                    <Minus className="w-4 h-4 text-gray-600" />
                                  </button>
                                  <span className="font-semibold w-8 text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 hover:bg-gray-100 rounded"
                                  >
                                    <Plus className="w-4 h-4 text-gray-600" />
                                  </button>
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="border-t border-gray-100 p-6">
                    {/* Order Minimum Alert */}
                    {subtotal < 300 && (
                      <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div className="text-amber-800 font-semibold">
                            Add ₹{300 - subtotal} more for free delivery
                          </div>
                          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                            <span className="text-amber-800 font-bold">!</span>
                          </div>
                        </div>
                        <div className="mt-2 h-2 bg-amber-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                            style={{ width: `${(subtotal / 300) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Summary */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold">₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className={shipping === 0 ? 'text-green-600 font-semibold' : 'font-semibold'}>
                          {shipping === 0 ? 'FREE' : `₹${shipping}`}
                        </span>
                      </div>
                      {shipping > 0 && subtotal < 500 && (
                        <div className="text-sm text-gray-500">
                          Free shipping on orders above ₹500
                        </div>
                      )}
                      <div className="border-t border-gray-200 pt-3 mt-3">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span>₹{total}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                          subtotal >= 300
                            ? 'bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:shadow-lg hover:shadow-green-200'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={subtotal < 300}
                      >
                        {subtotal >= 300 ? (
                          <div className="flex items-center justify-center">
                            <span>Proceed to Checkout</span>
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </div>
                        ) : (
                          `Minimum Order ₹300`
                        )}
                      </button>
                      
                      <button
                        onClick={onClose}
                        className="w-full border-2 border-green-600 text-green-600 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-colors"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;