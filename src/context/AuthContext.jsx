import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const loadUserData = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      const storedOrders = localStorage.getItem('orders');
      
      if (token && storedUser) {
        // Verify token with backend
        try {
          const response = await api.get('/auth/me');
          if (response.data.success) {
            setUser(response.data.user);
          } else {
            // Token invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
      
      setLoading(false);
    };

    loadUserData();
  }, []);

  // Register function - Backend se connect
  const register = async (userData) => {
    try {
      setError(null);
      
      // API call to your backend
      const response = await api.post('/auth/register', {
        name: userData.name,        // username के रूप में backend में जाएगा
        email: userData.email,
        password: userData.password,
        phone: userData.phone || '',
        address: userData.address || '',
        city: userData.city || '',
        pincode: userData.pincode || ''
      });

      if (response.data.success) {
        // Save token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Save user to users list in localStorage (optional, for compatibility)
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const newUser = {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          phone: response.data.user.phone || '',
          address: response.data.user.address || '',
          city: response.data.user.city || '',
          pincode: response.data.user.pincode || '',
          avatar: '/images/default-avatar.jpg',
          createdAt: new Date().toISOString(),
          preferences: {
            emailNotifications: true,
            smsNotifications: false,
            newsletter: true
          }
        };
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Login function - Backend se connect
  const login = async (email, password) => {
    try {
      setError(null);
      
      // API call to your backend
      const response = await api.post('/auth/login', {
        email,
        password
      });

      if (response.data.success) {
        // Save token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Optional: Clear orders on logout
    // setOrders([]);
    // localStorage.removeItem('orders');
  };

  // Update profile - Backend se connect
  const updateProfile = async (updatedData) => {
    try {
      setError(null);
      
      // Prepare data for backend
      const profileData = {
        name: updatedData.name,
        phone: updatedData.phone || '',
        address: updatedData.address || '',
        city: updatedData.city || '',
        pincode: updatedData.pincode || ''
      };

      // API call to update profile
      const response = await api.put('/auth/profile', profileData);

      if (response.data.success) {
        // Update user in state
        const updatedUser = response.data.user;
        setUser(updatedUser);
        
        // Update in localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Update in users list (local storage)
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === updatedUser.id);
        if (userIndex !== -1) {
          users[userIndex] = {
            ...users[userIndex],
            name: updatedUser.username,
            phone: updatedUser.phone,
            address: updatedUser.address,
            city: updatedUser.city,
            pincode: updatedUser.pincode
          };
          localStorage.setItem('users', JSON.stringify(users));
        }
        
        return { success: true, user: updatedUser };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Profile update failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Add order (local only)
  const addOrder = (order) => {
    const newOrders = [...orders, { 
      ...order, 
      id: Date.now().toString(), 
      date: new Date().toISOString(),
      userId: user?.id 
    }];
    setOrders(newOrders);
    localStorage.setItem('orders', JSON.stringify(newOrders));
  };

  // Get user orders from backend
  const fetchUserOrders = async () => {
    try {
      const response = await api.get('/orders/user');
      if (response.data.success) {
        setOrders(response.data.orders);
        localStorage.setItem('orders', JSON.stringify(response.data.orders));
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const value = {
    user,
    loading,
    orders,
    error,
    register,
    login,
    logout,
    updateProfile,
    addOrder,
    fetchUserOrders,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};