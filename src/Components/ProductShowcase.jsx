import React from 'react';
import { Star, Award, Zap, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import osImg from './images/pakriImg1.jpeg'

const ProductShowcase = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 md:p-12 overflow-hidden relative"
        >
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full translate-y-24 -translate-x-24" />

          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full mb-6">
                <Award className="w-4 h-4" />
                <span className="font-semibold">PRODUCT OF THE WEEK</span>
              </div>

              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                King Oyster Mushroom
                <span className="block text-3xl text-amber-600 mt-2">Special Reserve Batch</span>
              </h2>

              <p className="text-gray-600 text-lg mb-8 max-w-2xl">
                Our premium King Oyster mushrooms are hand-picked from the finest harvest. 
                With meaty texture and rich umami flavor, perfect for gourmet dishes and health enthusiasts.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">High Protein</div>
                    <div className="text-sm text-gray-500">3.3g per 100g</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Fresh for 7 Days</div>
                    <div className="text-sm text-gray-500">In refrigerator</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-5xl font-bold text-gray-900">₹450</div>
                  <div className="text-gray-500 line-through">₹550</div>
                </div>

                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 font-semibold text-gray-700">4.9 (128 reviews)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-amber-200 transition-all">
                  Add to Cart • ₹450
                </button>
                <button className="border-2 border-amber-500 text-amber-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-amber-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={osImg}
                  alt="King Oyster Mushroom"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Stock Indicator */}
                {/* <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                  <div className="text-sm text-gray-600 mb-1">Available Stock</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 w-3/4" />
                    </div>
                    <span className="font-bold text-gray-900">24/32</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;