import React, { useState } from 'react';
import { Send, Gift, Shield, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const offers = [
    { icon: <Gift className="w-5 h-5" />, text: 'First order discount' },
    { icon: <Truck className="w-5 h-5" />, text: 'Free delivery offers' },
    { icon: <Shield className="w-5 h-5" />, text: 'Exclusive recipes' },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 md:p-12 overflow-hidden relative"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Join the Mushroom Club
              </h2>
              <p className="text-green-100 text-lg mb-8 max-w-xl">
                Subscribe to our newsletter and get exclusive offers, new product announcements, and mushroom recipes delivered to your inbox.
              </p>

              <div className="space-y-4 mb-8">
                {offers.map((offer, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="text-white">{offer.icon}</div>
                    <span className="text-green-100">{offer.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Form */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Welcome to the Club! 🎉
                  </h3>
                  <p className="text-gray-600">
                    Check your email for a special welcome discount.
                  </p>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Get 15% Off Your First Order
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Interests
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded text-green-600" defaultChecked />
                          <span className="text-gray-700">Cooking Recipes</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded text-green-600" defaultChecked />
                          <span className="text-gray-700">Health Tips</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded text-green-600" />
                          <span className="text-gray-700">New Products</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded text-green-600" />
                          <span className="text-gray-700">Special Offers</span>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-green-200 transition-all flex items-center justify-center space-x-2"
                    >
                      <span>Subscribe & Get Discount</span>
                      <Send className="w-5 h-5" />
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;