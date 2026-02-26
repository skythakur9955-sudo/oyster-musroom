import React, { createContext, useState, useContext, useEffect } from 'react';

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

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedOrders = localStorage.getItem('orders');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
    
    setLoading(false);
  }, []);

  // Register function
  const register = async (userData) => {
    try {
      // Here you would typically make an API call to your backend
      // For demo, we'll simulate a successful registration
      
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = existingUsers.some(u => u.email === userData.email);
      
      if (userExists) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        address: userData.address || '',
        city: userData.city || '',
        pincode: userData.pincode || '',
        avatar: '/images/default-avatar.jpg',
        createdAt: new Date().toISOString(),
        preferences: {
          emailNotifications: true,
          smsNotifications: false,
          newsletter: true
        }
      };

      // Save to localStorage (in real app, this would be a database)
      existingUsers.push({ ...newUser, password: userData.password }); // In real app, hash password!
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      // Log the user in
      const { password, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      // Simulate API call
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Update profile
  const updateProfile = async (updatedData) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex(u => u.id === user.id);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      // Update user data
      const updatedUser = { ...users[userIndex], ...updatedData };
      users[userIndex] = updatedUser;
      
      // Save to localStorage
      localStorage.setItem('users', JSON.stringify(users));
      
      const { password: _, ...userWithoutPassword } = updatedUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Add order
  const addOrder = (order) => {
    const newOrders = [...orders, { ...order, id: Date.now().toString(), date: new Date().toISOString() }];
    setOrders(newOrders);
    localStorage.setItem('orders', JSON.stringify(newOrders));
  };

  const value = {
    user,
    loading,
    orders,
    register,
    login,
    logout,
    updateProfile,
    addOrder,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};