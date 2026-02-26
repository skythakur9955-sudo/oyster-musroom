import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ChefHat, Heart, Search, Filter, Star, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const recipes = [
  {
    id: 1,
    title: 'Garlic Butter Oyster Mushrooms',
    description: 'Simple yet elegant stir-fried oyster mushrooms in rich garlic butter sauce.',
    image: '/images/recipes/garlic-butter.jpg',
    prepTime: '15 mins',
    cookTime: '10 mins',
    servings: 2,
    difficulty: 'Easy',
    rating: 4.8,
    reviews: 124,
    category: 'Quick Meals',
    tags: ['Quick', 'Vegetarian', 'Gluten-Free'],
    chef: 'Chef Priya'
  },
  {
    id: 2,
    title: 'Creamy Mushroom Pasta',
    description: 'Luxurious pasta with oyster mushrooms in a creamy parmesan sauce.',
    image: '/images/recipes/mushroom-pasta.jpg',
    prepTime: '20 mins',
    cookTime: '15 mins',
    servings: 4,
    difficulty: 'Medium',
    rating: 4.9,
    reviews: 89,
    category: 'Main Course',
    tags: ['Italian', 'Creamy', 'Comfort Food'],
    chef: 'Chef Rajesh'
  },
  {
    id: 3,
    title: 'Oyster Mushroom Stir Fry',
    description: 'Asian-style stir fry with oyster mushrooms, bell peppers, and soy sauce.',
    image: '/images/recipes/stir-fry.jpg',
    prepTime: '15 mins',
    cookTime: '8 mins',
    servings: 3,
    difficulty: 'Easy',
    rating: 4.7,
    reviews: 156,
    category: 'Asian',
    tags: ['Quick', 'Healthy', 'Low-Carb'],
    chef: 'Chef Anjali'
  },
  {
    id: 4,
    title: 'Mushroom Risotto',
    description: 'Creamy Italian risotto with sautéed oyster mushrooms and parmesan.',
    image: '/images/recipes/risotto.jpg',
    prepTime: '10 mins',
    cookTime: '25 mins',
    servings: 4,
    difficulty: 'Medium',
    rating: 4.9,
    reviews: 203,
    category: 'Main Course',
    tags: ['Italian', 'Creamy', 'Restaurant-Style'],
    chef: 'Chef Vikram'
  },
  {
    id: 5,
    title: 'Stuffed Mushroom Caps',
    description: 'Oyster mushroom caps stuffed with herbed cream cheese and breadcrumbs.',
    image: '/images/recipes/stuffed.jpg',
    prepTime: '25 mins',
    cookTime: '20 mins',
    servings: 6,
    difficulty: 'Medium',
    rating: 4.8,
    reviews: 67,
    category: 'Appetizer',
    tags: ['Party Food', 'Vegetarian', 'Baked'],
    chef: 'Chef Priya'
  },
  {
    id: 6,
    title: 'Mushroom Soup',
    description: 'Velvety smooth cream of oyster mushroom soup with herbs.',
    image: '/images/recipes/soup.jpg',
    prepTime: '10 mins',
    cookTime: '20 mins',
    servings: 4,
    difficulty: 'Easy',
    rating: 4.6,
    reviews: 98,
    category: 'Soups',
    tags: ['Comfort Food', 'Healthy', 'Winter'],
    chef: 'Chef Anjali'
  },
  {
    id: 7,
    title: 'Mushroom Pizza',
    description: 'Wood-fired pizza with oyster mushrooms, caramelized onions, and arugula.',
    image: '/images/recipes/pizza.jpg',
    prepTime: '30 mins',
    cookTime: '15 mins',
    servings: 2,
    difficulty: 'Advanced',
    rating: 4.9,
    reviews: 145,
    category: 'Main Course',
    tags: ['Italian', 'Gourmet', 'Homemade'],
    chef: 'Chef Rajesh'
  },
  {
    id: 8,
    title: 'Spicy Mushroom Curry',
    description: 'Indian-style mushroom curry with aromatic spices and coconut milk.',
    image: '/images/recipes/curry.jpg',
    prepTime: '15 mins',
    cookTime: '25 mins',
    servings: 4,
    difficulty: 'Medium',
    rating: 4.8,
    reviews: 178,
    category: 'Indian',
    tags: ['Spicy', 'Curry', 'Comfort Food'],
    chef: 'Chef Vikram'
  }
];

const categories = ['All', 'Quick Meals', 'Main Course', 'Appetizer', 'Soups', 'Asian', 'Indian', 'Italian'];
const difficulties = ['All', 'Easy', 'Medium', 'Advanced'];

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [savedRecipes, setSavedRecipes] = useState([]);

  const toggleSaveRecipe = (recipeId) => {
    setSavedRecipes(prev =>
      prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const filteredRecipes = recipes
    .filter(recipe => {
      if (selectedCategory !== 'All' && recipe.category !== selectedCategory) {
        return false;
      }
      if (selectedDifficulty !== 'All' && recipe.difficulty !== selectedDifficulty) {
        return false;
      }
      if (searchQuery) {
        return recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
               recipe.chef.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'time':
          return parseInt(a.cookTime) - parseInt(b.cookTime);
        case 'popular':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-500 to-orange-600 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full translate-y-32 -translate-x-32"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
                <BookOpen className="w-4 h-4" />
                <span className="font-semibold">OYSTER MUSHROOM RECIPES</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Cook with 
                <span className="block text-4xl md:text-5xl text-amber-100 mt-2">
                  Love & Mushrooms
                </span>
              </h1>
              <p className="text-xl text-amber-100 leading-relaxed">
                Discover delicious recipes featuring our premium oyster mushrooms. 
                From quick stir-fries to gourmet creations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
              >
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="time">Quickest First</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-8">
            <div className="text-gray-600">
              Showing <span className="font-bold text-gray-900">{filteredRecipes.length}</span> recipes
            </div>
          </div>

          {/* Recipe Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button
                    onClick={() => toggleSaveRecipe(recipe.id)}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        savedRecipes.includes(recipe.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-amber-600 font-semibold">
                      {recipe.category}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="ml-1 text-sm font-semibold text-gray-900">
                        {recipe.rating}
                      </span>
                      <span className="ml-1 text-sm text-gray-500">
                        ({recipe.reviews})
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                    {recipe.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {recipe.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {recipe.cookTime}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-1" />
                        {recipe.servings} serves
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      by {recipe.chef}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {recipe.tags.length > 2 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        +{recipe.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Featured Recipe */}
          <div className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full mb-6">
                  <ChefHat className="w-4 h-4" />
                  <span className="font-semibold">CHEF'S SPECIAL</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Oyster Mushroom Tacos
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  Spicy pulled oyster mushrooms with fresh salsa, avocado crema, 
                  and pickled onions in warm corn tortillas.
                </p>
                <div className="flex items-center space-x-6 mb-8">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-amber-600 mr-2" />
                    <span className="text-gray-700">25 minutes</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-amber-600 mr-2" />
                    <span className="text-gray-700">Serves 4</span>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                  View Full Recipe
                </button>
              </div>
              <div className="relative">
                <img
                  src="/images/recipes/tacos.jpg"
                  alt="Mushroom Tacos"
                  className="rounded-2xl shadow-2xl w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Recipes;