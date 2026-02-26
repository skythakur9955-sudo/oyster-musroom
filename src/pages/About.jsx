import React from 'react';
import { Leaf, Users, Award, Heart, Target, TrendingUp, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { label: 'Happy Customers', value: '5,000+', icon: <Users /> },
    { label: 'Organic Farms', value: '3', icon: <Leaf /> },
    { label: 'Years Experience', value: '8+', icon: <Award /> },
    { label: 'Mushroom Varieties', value: '12+', icon: <TrendingUp /> }
  ];

  const values = [
    {
      title: '100% Organic',
      description: 'We never use pesticides or chemicals. Our mushrooms are grown naturally in controlled environments.',
      icon: <Leaf className="w-8 h-8" />
    },
    {
      title: 'Farm to Fork',
      description: 'Harvested fresh and delivered within 24 hours to ensure maximum freshness and nutrition.',
      icon: <Target className="w-8 h-8" />
    },
    {
      title: 'Sustainable Practices',
      description: 'We use eco-friendly packaging and sustainable farming methods to protect our planet.',
      icon: <Heart className="w-8 h-8" />
    }
  ];

  const team = [
    {
      name: 'Naveen Patwal',
      role: 'Founder & CEO',
      bio: 'Mushroom expert with 15+ years of experience. His vision is to increase mushroom consumption in India.',
      image: '/images/team/naveen.jpg'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Farming',
      bio: 'Agricultural scientist specializing in organic mushroom cultivation techniques.',
      image: '/images/team/priya.jpg'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Quality Control',
      bio: 'Ensures every mushroom meets our premium quality standards before delivery.',
      image: '/images/team/rajesh.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-emerald-700 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Our Mission: 
                <span className="block text-3xl md:text-4xl text-green-100 mt-2">
                  100g to 1kg per capita
                </span>
              </h1>
              <p className="text-xl text-green-100 leading-relaxed">
                We're on a mission to revolutionize mushroom consumption in India, 
                making premium quality oyster mushrooms accessible to every household.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-green-600">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
                <Award className="w-4 h-4" />
                <span className="font-semibold">OUR STORY</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                From a Small Farm to 
                <span className="block text-green-600">India's Favorite Mushroom Brand</span>
              </h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  Planet Mushroom started in 2016 with a simple idea: bring fresh, organic, 
                  and premium quality mushrooms to Indian households. What began as a small 
                  farm in the outskirts of Mumbai has now grown into a trusted brand loved 
                  by thousands of customers across the country.
                </p>
                <p>
                  Our founder, Naveen Patwal, recognized the gap in the Indian mushroom 
                  market. While the world was embracing gourmet mushrooms, India was still 
                  consuming less than 100g per capita annually. He saw an opportunity to 
                  not just build a business, but to transform the eating habits of a nation.
                </p>
                <p>
                  Today, we're proud to be at the forefront of India's mushroom revolution, 
                  growing over 12 varieties of premium mushrooms using sustainable, organic 
                  practices. Our goal is simple: make quality mushrooms accessible to everyone.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/about/farm.jpg"
                  alt="Our Mushroom Farm"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-2xl font-bold text-green-700 mb-2">Since 2016</div>
                    <p className="text-gray-700">8+ years of organic mushroom farming excellence</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Drives Us
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our values shape everything we do, from how we grow our mushrooms 
              to how we serve our customers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-green-600">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Passionate individuals working together to bring you the best mushrooms in India.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-green-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join the Mushroom Revolution
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Experience the freshness and quality of our premium oyster mushrooms.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 bg-white text-green-700 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
            >
              <span>Shop Our Mushrooms</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;