import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Filter, SlidersHorizontal, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import img2 from '../Components/images/oyster-image2.png';
import pakriImg1 from '../Components/images/pakriImg2.jpeg'
import pakriImg2 from '../Components/images/pakriImg3.jpeg'
import pakriImg3 from '../Components/images/pakriImg1.jpeg'


const allProducts = [
  {
    id: 1,
    name: 'Fresh Pearl Oyster',
    category: 'Fresh',
    description: 'Tender texture with mild flavor',
    price: 180,
    originalPrice: 220,
    weight: '250g',
    serves: '2-3 people',
    rating: 4.8,
    reviews: 89,
    image: img2,
    tags: ['Best Seller', 'Organic'],
    inStock: true,
    type: 'fresh'
  },
  {
    id: 2,
    name: 'Pink Oyster Mushroom',
    category: 'Exotic',
    description: 'Vibrant color, robust flavor',
    price: 320,
    originalPrice: 380,
    weight: '200g',
    serves: '2 people',
    rating: 4.9,
    reviews: 45,
    image: pakriImg1,
    tags: ['Exotic', 'Limited'],
    inStock: true,
    type: 'exotic'
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
    inStock: true,
    type: 'premium'
  },
  {
    id: 4,
    name: 'Blue Oyster Mushroom',
    category: 'Seasonal',
    description: 'Unique blue hue, earthy tones',
    price: 350,
    originalPrice: 420,
    weight: '200g',
    serves: '2 people',
    rating: 4.9,
    reviews: 52,
    image: pakriImg3,
    tags: ['Seasonal', 'Rare'],
    inStock: false,
    type: 'exotic'
  },
  {
    id: 5,
    name: 'Oyster Mushroom Mix',
    category: 'Variety Pack',
    description: 'Assorted oyster varieties',
    price: 420,
    weight: '400g',
    serves: '4-5 people',
    rating: 4.8,
    reviews: 94,
    image: pakriImg2,
    tags: ['Assorted', 'Best Value'],
    inStock: true,
    type: 'bundle'
  },
  {
    id: 6,
    name: 'Dried Oyster Pack',
    category: 'Pantry',
    description: 'Long shelf life, intense flavor',
    price: 240,
    originalPrice: 290,
    weight: '100g',
    serves: '8-10 meals',
    rating: 4.6,
    reviews: 78,
    image: img2,
    tags: ['Dried', 'Storage'],
    inStock: true,
    type: 'dried'
  },
  {
    id: 7,
    name: 'King Oyster Mushroom',
    category: 'Premium',
    description: 'Meaty texture, umami flavor',
    price: 450,
    originalPrice: 550,
    weight: '300g',
    serves: '3-4 people',
    rating: 4.9,
    reviews: 128,
    image: '/images/products/king-oyster.jpg',
    tags: ['Premium', 'Chef Choice'],
    inStock: true,
    type: 'premium'
  },
  {
    id: 8,
    name: 'Oyster Mushroom Pickle',
    category: 'Specialty',
    description: 'Spicy, tangy, ready-to-eat',
    price: 750,
    weight: '200g',
    serves: '15+ meals',
    rating: 4.8,
    reviews: 56,
    image: '/images/pickle/mushroom-pickle.jpg',
    tags: ['Product of Day', 'Best Seller'],
    inStock: true,
    type: 'specialty'
  }
];

const categories = ['All', 'Fresh', 'Premium', 'Exotic', 'Dried', 'Bundle', 'Specialty'];
const priceRanges = [
  { label: 'Under ₹200', min: 0, max: 200 },
  { label: '₹200 - ₹300', min: 200, max: 300 },
  { label: '₹300 - ₹400', min: 300, max: 400 },
  { label: 'Above ₹400', min: 400, max: Infinity }
];

const Shop = ({ addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [showInStock, setShowInStock] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products
  const filteredProducts = allProducts.filter(product => {
    // Category filter
    if (selectedCategory !== 'All' && product.category !== selectedCategory) {
      return false;
    }
    
    // Price filter
    if (selectedPrice) {
      if (product.price < selectedPrice.min || product.price > selectedPrice.max) {
        return false;
      }
    }
    
    // Stock filter
    if (showInStock && !product.inStock) {
      return false;
    }
    
    // Search filter
    if (searchQuery) {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             product.description.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedPrice(null);
    setShowInStock(false);
    setSortBy('default');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shop Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Oyster Mushroom Shop
            </h1>
            <p className="text-green-100 text-lg max-w-2xl mx-auto">
              Discover our complete collection of premium oyster mushrooms, 
              fresh from our farm to your kitchen.
            </p>
            
            {/* Search Bar */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search mushrooms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-3 pl-12 rounded-full border-2 border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:border-white"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-full flex items-center justify-center space-x-2 bg-white px-6 py-3 rounded-xl shadow-md"
          >
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
            <span className="font-semibold">Filter & Sort Products</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-4">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <span className="text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-4">Price Range</h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.label} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPrice?.label === range.label}
                        onChange={() => setSelectedPrice(range)}
                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <span className="text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stock Filter */}
              <div className="mb-8">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={showInStock}
                    onChange={(e) => setShowInStock(e.target.checked)}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-700">In Stock Only</span>
                </label>
              </div>

              {/* Sort By */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Filter Sidebar */}
          <AnimatePresence>
            {isFilterOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                  onClick={() => setIsFilterOpen(false)}
                />
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 30 }}
                  className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl lg:hidden overflow-y-auto"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                    
                    {/* Same filter content as desktop */}
                    <div className="mb-8">
                      <h4 className="font-semibold text-gray-900 mb-4">Categories</h4>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <label key={category} className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="category"
                              checked={selectedCategory === category}
                              onChange={() => {
                                setSelectedCategory(category);
                                setIsFilterOpen(false);
                              }}
                              className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                            />
                            <span className="text-gray-700">{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h4 className="font-semibold text-gray-900 mb-4">Price Range</h4>
                      <div className="space-y-2">
                        {priceRanges.map((range) => (
                          <label key={range.label} className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="price"
                              checked={selectedPrice?.label === range.label}
                              onChange={() => {
                                setSelectedPrice(range);
                                setIsFilterOpen(false);
                              }}
                              className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                            />
                            <span className="text-gray-700">{range.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={showInStock}
                          onChange={(e) => {
                            setShowInStock(e.target.checked);
                            setIsFilterOpen(false);
                          }}
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="text-gray-700">In Stock Only</span>
                      </label>
                    </div>

                    <button
                      onClick={() => {
                        clearFilters();
                        setIsFilterOpen(false);
                      }}
                      className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
              <div className="text-gray-600 mb-4 sm:mb-0">
                Showing <span className="font-bold text-gray-900">{sortedProducts.length}</span> products
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  <span>Category: {selectedCategory}</span>
                  <button onClick={() => setSelectedCategory('All')}>
                    <X className="w-4 h-4" />
                  </button>
                </span>
              )}
              {selectedPrice && (
                <span className="inline-flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  <span>{selectedPrice.label}</span>
                  <button onClick={() => setSelectedPrice(null)}>
                    <X className="w-4 h-4" />
                  </button>
                </span>
              )}
              {showInStock && (
                <span className="inline-flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  <span>In Stock Only</span>
                  <button onClick={() => setShowInStock(false)}>
                    <X className="w-4 h-4" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  <span>Search: "{searchQuery}"</span>
                  <button onClick={() => setSearchQuery('')}>
                    <X className="w-4 h-4" />
                  </button>
                </span>
              )}
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <Link to={`/product/${product.id}`}>
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                          {product.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>

                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <Link to={`/product/${product.id}`}>
                          <h3 className="text-lg font-bold text-gray-900 hover:text-green-600 transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <span className="bg-green-50 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                          {product.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="ml-1 font-semibold text-gray-900">{product.rating}</span>
                          <span className="ml-1 text-gray-500 text-sm">({product.reviews})</span>
                        </div>
                        <div className="text-sm text-gray-600">{product.weight}</div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                          {product.originalPrice && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => product.inStock && addToCart(product)}
                          disabled={!product.inStock}
                          className={`p-3 rounded-xl transition-all ${
                            product.inStock
                              ? 'bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:shadow-lg hover:shadow-green-200'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          <ShoppingBag className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
                <button
                  onClick={clearFilters}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;