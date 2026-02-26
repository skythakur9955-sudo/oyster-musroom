import React from "react";
import { ArrowRight, Leaf, Truck, Shield, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import img1 from "./images/oyster-banner.png";

const Hero = () => {
  const features = [
    { icon: <Leaf className="w-5 h-5" />, text: "100% Organic", gradient: "from-green-400 to-emerald-500" },
    { icon: <Truck className="w-5 h-5" />, text: "Free Delivery", gradient: "from-blue-400 to-cyan-500" },
    { icon: <Shield className="w-5 h-5" />, text: "Quality Guarantee", gradient: "from-purple-400 to-pink-500" },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-600/5 animate-gradient-xy" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-200/20 via-transparent to-transparent" />
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-400/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              transition: {
                duration: Math.random() * 15 + 15,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full mb-6 border border-green-200/50"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
              />
              <span className="text-sm font-medium bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                Freshly Harvested Today
              </span>
              <Sparkles className="w-4 h-4 text-green-500" />
            </motion.div>

            {/* Main Heading - Same Size */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Taste the{" "}
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-x">
                Earth's Finest
              </span>{" "}
              <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Oyster Mushrooms
              </span>
            </motion.h1>

            {/* Description - Same Style */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl"
            >
              Premium quality oyster mushrooms grown organically in controlled
              environments.{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-semibold">
                Delivered fresh to your doorstep
              </span>{" "}
              within 24 hours of harvest.
            </motion.p>

            {/* Feature Cards with Gradient Effects - Same Size */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -3 }}
                  className={`flex items-center space-x-2 bg-gradient-to-r ${feature.gradient} p-[1px] rounded-xl shadow-md`}
                >
                  <div className="flex items-center space-x-2 bg-white px-4 py-3 rounded-xl">
                    <div className={`text-transparent bg-gradient-to-r ${feature.gradient} bg-clip-text`}>
                      {feature.icon}
                    </div>
                    <span className="font-medium text-gray-700">
                      {feature.text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons - Same Size */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/shop"
                className="group relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-green-200/50 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Shop Now
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.div>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-teal-600 via-green-600 to-emerald-600"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </Link>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden border border-gray-200"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100" />
                <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300">
                  Learn More
                </span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Image - Same Size */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Gradient Orbs - Subtle */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-full blur-2xl" />

            {/* Main Image Container - Same Size */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 mix-blend-overlay z-10" />
              
              <img
                src={img1}
                alt="Fresh Oyster Mushrooms"
                className="w-full h-[500px] object-cover"
              />

              {/* Floating Stats - Same Position */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-8 left-8 right-8 flex justify-between z-20"
              >
                {[
                  { value: "24h", label: "Harvest to Door", gradient: "from-green-400 to-emerald-500" },
                  { value: "100%", label: "Organic", gradient: "from-blue-400 to-cyan-500" },
                  { value: "4.9★", label: "Customer Rating", gradient: "from-purple-400 to-pink-500" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3 }}
                    className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20"
                  >
                    <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;