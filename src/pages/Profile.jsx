import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Heart,
  Settings,
  LogOut,
  Edit2,
  Save,
  X,
  Camera,
  Clock,
  Truck,
  Star,
  Award,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const { user, logout, updateProfile, orders } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    pincode: user?.pincode || ''
  });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'orders', label: 'Orders', icon: <Package className="w-5 h-5" /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
  ];

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = async () => {
    try {
      const result = await updateProfile(editData);
      if (result.success) {
        setIsEditing(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setSaveError(result.error);
        setTimeout(() => setSaveError(''), 3000);
      }
    } catch (error) {
      setSaveError('Failed to update profile');
      setTimeout(() => setSaveError(''), 3000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Not Logged In</h2>
          <p className="text-gray-600 mb-6">Please login to view your profile</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>

        {/* Success/Error Messages */}
        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-green-100 border border-green-200 rounded-xl flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Save className="w-4 h-4 text-white" />
              </div>
              <p className="text-green-800">Profile updated successfully!</p>
            </motion.div>
          )}

          {saveError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-red-100 border border-red-200 rounded-xl flex items-center space-x-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-800">{saveError}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
              {/* Profile Summary */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-6 text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden mx-auto">
                    <img
                      src={user.avatar || '/images/default-avatar.jpg'}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <h2 className="mt-4 text-xl font-bold text-white">{user.name}</h2>
                <p className="text-green-100 text-sm">{user.email}</p>
              </div>

              {/* Navigation Tabs */}
              <div className="p-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                      activeTab === tab.id
                        ? 'bg-green-50 text-green-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}

                {/* Logout Button */}
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all mt-4"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>

              {/* Stats */}
              <div className="border-t border-gray-100 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
                    <div className="text-xs text-gray-500">Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">4.9</div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Profile Information</h3>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveProfile}
                          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setEditData({
                              name: user.name,
                              email: user.email,
                              phone: user.phone,
                              address: user.address,
                              city: user.city,
                              pincode: user.pincode
                            });
                          }}
                          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Personal Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={editData.name}
                            onChange={handleEditChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                            <User className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-900">{user.name}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={editData.email}
                            onChange={handleEditChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-900">{user.email}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={editData.phone}
                            onChange={handleEditChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                            <Phone className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-900">{user.phone || 'Not provided'}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          value={editData.address}
                          onChange={handleEditChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                          <MapPin className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-900">{user.address || 'Not provided'}</span>
                        </div>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="city"
                            value={editData.city}
                            onChange={handleEditChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-xl">
                            <span className="text-gray-900">{user.city || 'Not provided'}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pincode
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="pincode"
                            value={editData.pincode}
                            onChange={handleEditChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-xl">
                            <span className="text-gray-900">{user.pincode || 'Not provided'}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Member Since */}
                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-600">Member since</span>
                        </div>
                        <span className="font-semibold text-gray-900">
                          {new Date(user.createdAt || Date.now()).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h3>

                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h4>
                      <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
                      <button
                        onClick={() => navigate('/shop')}
                        className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                      >
                        Browse Products
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
                        >
                          <div className="flex flex-wrap items-center justify-between mb-4">
                            <div>
                              <span className="text-sm text-gray-500">Order #{order.id}</span>
                              <span className="mx-2 text-gray-300">|</span>
                              <span className="text-sm text-gray-500">
                                {new Date(order.date).toLocaleDateString()}
                              </span>
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                              {order.status || 'Delivered'}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-semibold text-gray-900">₹{order.total}</span>
                              <span className="text-sm text-gray-500 ml-2">
                                {order.items?.length || 0} items
                              </span>
                            </div>
                            <button className="text-green-600 hover:text-green-700 font-semibold text-sm">
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <motion.div
                  key="wishlist"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h3>
                  
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Your wishlist is empty</h4>
                    <p className="text-gray-600 mb-6">Save your favorite items here</p>
                    <button
                      onClick={() => navigate('/shop')}
                      className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Explore Products
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h3>

                  <div className="space-y-6">
                    {/* Notification Preferences */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Notification Preferences</h4>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <span className="text-gray-700">Email Notifications</span>
                          <input type="checkbox" defaultChecked className="toggle-checkbox" />
                        </label>
                        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <span className="text-gray-700">SMS Notifications</span>
                          <input type="checkbox" className="toggle-checkbox" />
                        </label>
                        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <span className="text-gray-700">Newsletter</span>
                          <input type="checkbox" defaultChecked className="toggle-checkbox" />
                        </label>
                      </div>
                    </div>

                    {/* Privacy Settings */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Privacy</h4>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <span className="text-gray-700">Make profile private</span>
                          <input type="checkbox" className="toggle-checkbox" />
                        </label>
                        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <span className="text-gray-700">Show order history</span>
                          <input type="checkbox" defaultChecked className="toggle-checkbox" />
                        </label>
                      </div>
                    </div>

                    {/* Change Password */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Change Password</h4>
                      <div className="space-y-4">
                        <input
                          type="password"
                          placeholder="Current Password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <input
                          type="password"
                          placeholder="New Password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <input
                          type="password"
                          placeholder="Confirm New Password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
                          Update Password
                        </button>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="font-semibold text-red-600 mb-4">Danger Zone</h4>
                      <button className="bg-red-50 text-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-red-100 transition-colors border border-red-200">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowLogoutConfirm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-8 z-50 max-w-md w-full mx-4"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LogOut className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Logout Confirmation</h3>
                <p className="text-gray-600 mb-8">Are you sure you want to logout?</p>
                <div className="flex space-x-4">
                  <button
                    onClick={handleLogout}
                    className="flex-1 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                  >
                    Yes, Logout
                  </button>
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;