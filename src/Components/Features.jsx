import React from 'react';
import { Sprout, Truck, Shield, Recycle, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: <Sprout className="w-6 h-6" />,
      title: 'Organic Farming',
      description: 'Grown in controlled environments without pesticides or chemicals.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: '24-Hour Delivery',
      description: 'Harvested fresh daily and delivered to your doorstep within 24 hours.',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Quality Guarantee',
      description: 'Every batch tested for quality and nutritional value.',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: <Recycle className="w-6 h-6" />,
      title: 'Sustainable Packaging',
      description: 'Eco-friendly, biodegradable packaging for a greener planet.',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Freshness Promise',
      description: 'Guaranteed freshness or your money back.',
      color: 'from-red-500 to-rose-600'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Certified Premium',
      description: 'Certified organic and premium quality by food authorities.',
      color: 'from-indigo-500 to-blue-600'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Mushrooms?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We're committed to delivering the highest quality oyster mushrooms with transparency and care.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 mb-6">
                {feature.description}
              </p>

              <div className="h-1 w-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full group-hover:bg-gradient-to-r group-hover:from-green-500 group-hover:to-emerald-600 transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 text-white"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">5000+</div>
              <div className="text-green-100">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">24h</div>
              <div className="text-green-100">Harvest to Door</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">4.9★</div>
              <div className="text-green-100">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">12+</div>
              <div className="text-green-100">Mushroom Varieties</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;