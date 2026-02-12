import React from "react";
import { ArrowRight, Leaf, Truck, Shield } from "lucide-react";
import { motion } from "framer-motion";
import img1 from "./images/oyster-banner.png";

const Hero = () => {
  const features = [
    { icon: <Leaf className="w-5 h-5" />, text: "100% Organic" },
    { icon: <Truck className="w-5 h-5" />, text: "Free Delivery" },
    { icon: <Shield className="w-5 h-5" />, text: "Quality Guarantee" },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-600/5" />

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">
                Freshly Harvested Today
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Taste the{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                Earth's Finest
              </span>{" "}
              Oyster Mushrooms
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Premium quality oyster mushrooms grown organically in controlled
              environments. Delivered fresh to your doorstep within 24 hours of
              harvest.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2 bg-white px-4 py-3 rounded-xl shadow-sm border border-green-100"
                >
                  <div className="text-green-600">{feature.icon}</div>
                  <span className="font-medium text-gray-700">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-green-200 transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-colors">
                View Recipes
              </button>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={img1}
                alt="Fresh Oyster Mushrooms"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              {/* Floating Stats */}
              <div className="absolute bottom-8 left-8 right-8 flex justify-between">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-green-700">24h</div>
                  <div className="text-sm text-gray-600">Harvest to Door</div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-green-700">100%</div>
                  <div className="text-sm text-gray-600">Organic</div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-green-700">4.9★</div>
                  <div className="text-sm text-gray-600">Customer Rating</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
