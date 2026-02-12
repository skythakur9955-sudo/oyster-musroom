import React from 'react';
import { ShoppingBag, Leaf, Clock, Truck, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import img2 from './images/oyster-image2.png';
import pakriImg1 from './images/pakriImg2.jpeg'
import pakriImg2 from './images/pakriImg3.jpeg'
const products = [
  {
    id: 1,
    name: 'Fresh Pearl Oyster',
    category: 'Most Popular',
    description: 'Tender texture with mild flavor',
    price: 180,
    originalPrice: 220,
    weight: '250g',
    serves: '2-3 people',
    rating: 4.8,
    reviews: 89,
    image: img2,
    tags: ['Fresh', 'Best Seller'],
    features: ['24h Fresh', 'Organic Certified']
  },
  {
    id: 2,
    name: 'Pink Oyster Mushroom',
    category: 'Exotic Variety',
    description: 'Vibrant color, robust flavor',
    price: 320,
    originalPrice: 380,
    weight: '200g',
    serves: '2 people',
    rating: 4.9,
    reviews: 45,
    image: pakriImg1,
    tags: ['Exotic', 'Limited Stock'],
    features: ['Rare Variety', 'Gourmet Grade']
  },
  {
    id: 3,
    name: 'Golden Oyster Pack',
    category: 'Premium',
    description: 'Sweet aroma, delicate texture',
    price: 280,
    weight: '300g',
    serves: '3-4 people',
    rating: 4.7,
    reviews: 67,
    image: pakriImg2,
    tags: ['Premium', 'Bundle'],
    features: ['Mixed Harvest', 'Family Pack']
  },

];

const ProductGrid = ({ addToCart }) => {
  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
            <Leaf className="w-4 h-4" />
            <span className="font-semibold">100% ORGANIC GROWN</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Premium Oyster Collection
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our curated selection of premium oyster mushrooms, each with unique flavors and textures.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Tags */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-gradient-to-r from-green-600 to-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Features Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">24h Fresh</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Truck className="w-4 h-4" />
                        <span className="text-sm">Free Delivery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.map((feature, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center bg-green-50 rounded-xl p-3">
                    <div className="text-sm text-gray-600">Weight</div>
                    <div className="font-bold text-gray-900">{product.weight}</div>
                  </div>
                  <div className="text-center bg-green-50 rounded-xl p-3">
                    <div className="text-sm text-gray-600">Serves</div>
                    <div className="font-bold text-gray-900">{product.serves}</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.floor(product.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">₹{product.price}</div>
                    {product.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">₹{product.originalPrice}</div>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="group flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-200 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-xl font-semibold text-lg transition-colors">
            View All Products (12+ Varieties)
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGrid;