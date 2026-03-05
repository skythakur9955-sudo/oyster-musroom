const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../moudles/db');

// Register user - UPDATED with all fields
const register = async (req, res) => {
    try {
        const { name, email, password, phone, address, city, pincode } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide name, email and password' 
            });
        }

        // Check if user exists
        const [existing] = await db.query(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existing.length > 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'User already exists with this email' 
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user with all fields
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, phone, address, city, pincode) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, email, hashedPassword, phone || null, address || null, city || null, pincode || null]
        );

        // Get the created user
        const [newUser] = await db.query(
            'SELECT id, name, email, phone, address, city, pincode, created_at FROM users WHERE id = ?',
            [result.insertId]
        );

        // Create token
        const token = jwt.sign(
            { 
                id: newUser[0].id, 
                name: newUser[0].name, 
                email: newUser[0].email 
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: newUser[0]
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error registering user' 
        });
    }
};

// Login user - UPDATED to return all fields
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide email and password' 
            });
        }

        // Check if user exists - select all fields
        const [users] = await db.query(
            'SELECT id, name, email, password, phone, address, city, pincode, created_at FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }

        const user = users[0];

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }

        // Remove password from user object
        const { password: _, ...userWithoutPassword } = user;

        // Create token
        const token = jwt.sign(
            { 
                id: user.id, 
                name: user.name, 
                email: user.email 
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error logging in' 
        });
    }
};

// Get current user - UPDATED to return all fields
const getCurrentUser = async (req, res) => {
    try {
        const [users] = await db.query(
            'SELECT id, name, email, phone, address, city, pincode, created_at FROM users WHERE id = ?',
            [req.user.id]
        );

        if (users.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        res.status(200).json({
            success: true,
            user: users[0]
        });

    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching user' 
        });
    }
};

// Update profile - NEW function
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, phone, address, city, pincode } = req.body;

        // Update user profile
        const [result] = await db.query(
            'UPDATE users SET name = ?, phone = ?, address = ?, city = ?, pincode = ? WHERE id = ?',
            [name, phone || null, address || null, city || null, pincode || null, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        // Get updated user
        const [users] = await db.query(
            'SELECT id, name, email, phone, address, city, pincode, created_at FROM users WHERE id = ?',
            [userId]
        );

        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: users[0]
        });

    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error updating profile' 
        });
    }
};

module.exports = {
    register,
    login,
    getCurrentUser,
    updateProfile
};