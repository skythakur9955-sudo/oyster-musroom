import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Star, 
  Heart, 
  Truck, 
  Shield, 
  RefreshCw,
  Clock,
  Leaf,
  Award,
  ChevronRight,
  Minus,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';

const productData = {
  1: {
    id: 1,
    name: 'Fresh Pearl Oyster',
    category: 'Fresh Oyster',
    description: 'Our premium Pearl Oyster mushrooms are known for their delicate texture and mild, sweet flavor. Harvested at peak freshness, these mushrooms are perfect for stir-fries, soups, and light pasta dishes.',
    longDescription: 'Pearl Oyster mushrooms (Pleurotus ostreatus) are one of the most popular edible mushrooms worldwide. Grown in our controlled environment facility, these mushrooms develop their characteristic pearl-white caps and tender stems. They are an excellent source of protein, fiber, and essential nutrients including B vitamins and minerals.',
    price: 180,
    originalPrice: 220,
    weight: '250g',
    serves: '2-3 people',
    rating: 4.8,
    reviews: 89,
    images: [
      '/images/products/fresh-oyster-1.jpg',
      '/images/products/fresh-oyster-2.jpg',
      '/images/products/fresh-oyster-3.jpg'
    ],
    tags: ['Best Seller', 'Organic', 'Fresh'],
    inStock: true,
    stockCount: 45,
    nutritionFacts: [
      { label: 'Calories', value: '33 kcal' },
      { label: 'Protein', value: '3.3g' },
      { label: 'Carbohydrates', value: '6.1g' },
      { label: 'Fiber', value: '2.3g' },
      { label: 'Fat', value: '0.4g' }
    ],
    features: [
      '24-Hour Freshness Guarantee',
      'Certified Organic',
      'Free from pesticides',
      'Sustainable farming',
      'Eco-friendly packaging'
    ],
    storage: 'Store in refrigerator at 2-4°C. Consume within 7 days for best quality.',
    shelfLife: '7-10 days refrigerated'
  },
  // Add more product details similarly
};

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  const product = productData[id] || productData[1];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-green-600">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/shop" className="text-gray-600 hover:text-green-600">Shop</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Product Main Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left - Product Images */}
          <div>
            <div className="relative mb-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
                  <span className="bg-white text-gray-800 px-6 py-3 rounded-xl font-bold text-lg">
                    Currently Out of Stock
                  </span>
                </div>
              )}
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-green-600 shadow-md' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex items-center mr-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="ml-3 text-xl text-gray-500 line-through">
                      ₹{product.originalPrice}
                    </span>
                    <span className="ml-3 bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded-full">
                      Save ₹{product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>
              <div className="mt-2 text-green-600 font-semibold">
                Inclusive of all taxes
              </div>
            </div>

            {/* Short Description */}
            <p className="text-gray-600 text-lg mb-8">
              {product.description}
            </p>

            {/* Quick Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">24h Delivery</div>
                  <div className="text-sm text-gray-600">Farm to door</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Quality Assured</div>
                  <div className="text-sm text-gray-600">Freshness guarantee</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Easy Returns</div>
                  <div className="text-sm text-gray-600">7-day return</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Eco Pack</div>
                  <div className="text-sm text-gray-600">Biodegradable</div>
                </div>
              </div>
            </div>

            {/* Stock Status */}
            {product.inStock && (
              <div className="flex items-center mb-8">
                <div className="flex items-center text-green-600 mr-4">
                  <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse mr-2"></div>
                  <span className="font-semibold">In Stock</span>
                </div>
                <span className="text-gray-600">
                  ({product.stockCount} units available)
                </span>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-gray-900">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="w-16 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount || 10, quantity + 1))}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">({product.weight})</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => addToCart({ ...product, quantity })}
                  disabled={!product.inStock}
                  className={`flex-1 flex items-center justify-center space-x-3 px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                    product.inStock
                      ? 'bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:shadow-lg hover:shadow-green-200'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button className="px-8 py-4 border-2 border-green-600 text-green-600 rounded-xl font-bold text-lg hover:bg-green-50 transition-colors">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Delivery Promise */}
            <div className="bg-green-50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Award className="w-6 h-6 text-green-600" />
                <span className="font-bold text-gray-900">Our Delivery Promise</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">Order before 2 PM for next day delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">Free shipping over ₹500</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="border-t border-gray-200 pt-12">
          <div className="flex border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-3 font-semibold text-lg relative ${
                activeTab === 'description'
                  ? 'text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Description
              {activeTab === 'description' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-600"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`px-6 py-3 font-semibold text-lg relative ${
                activeTab === 'nutrition'
                  ? 'text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Nutrition Facts
              {activeTab === 'nutrition' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-600"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('storage')}
              className={`px-6 py-3 font-semibold text-lg relative ${
                activeTab === 'storage'
                  ? 'text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Storage & Handling
              {activeTab === 'storage' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-600"
                />
              )}
            </button>
          </div>

          <div className="max-w-3xl">
            {activeTab === 'description' && (
              <div className="space-y-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {product.longDescription}
                </p>
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">Key Features:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Nutrition Facts (per 100g)</h4>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="space-y-3">
                    {product.nutritionFacts.map((fact, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                        <span className="text-gray-700">{fact.label}</span>
                        <span className="font-semibold text-gray-900">{fact.value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    *Values are approximate and may vary slightly based on growing conditions
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'storage' && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Storage Instructions</h4>
                  <p className="text-gray-700">{product.storage}</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Shelf Life</h4>
                  <p className="text-gray-700">{product.shelfLife}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;