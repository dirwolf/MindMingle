import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import {User} from '../models/user.js';


 

// Generate JWT Token


 

const generateToken = (userId) => {

    return jwt.sign(

        { id: userId },

        process.env.JWT_SECRET || 'your-secret-key',

        { expiresIn: '24h' }

    );

};


 

// Register User

const register = async (req, res) => {

    try {

        const { username, email, password, tags } = req.body;

        // Validation

        if (!username || !email || !password) {

            return res.status(400).json({

                success: false,

                message: 'All fields are required'

            });

        }

        if (password.length < 6) {

            return res.status(400).json({

                success: false,

                message: 'Password must be at least 6 characters long'

            });


 

        }

        // Check if user already exists

        const existingUser = await User.findOne({

            $or: [{ email }, { username }]

        });


 

        if (existingUser) {

            return res.status(400).json({

                success: false,

                message: existingUser.email === email

                    ? 'Email already registered'

                    : 'Username already taken'

            });

        }

        // Hash password

        const saltRounds = 12;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        console.log('Register request tags:', tags);

        // Create user

        const user = new User({

            username,

            email,

            password: hashedPassword,

            tags: Array.isArray(tags) ? tags : []

        });


 

        await user.save();

        console.log('Saved user tags:', user.tags);

        res.status(201).json({

            success: true,

            message: 'User registered successfully',

            user: {

                id: user._id,

                username: user.username,

                email: user.email,

                tags: user.tags || []

            }

        });

    } catch (error) {

        console.error('Registration error:', error);

        if (error.code === 11000) {

            return res.status(400).json({

                success: false,

                message: 'Email or username already exists'

            });

        }

        res.status(500).json({

            success: false,

            message: 'Registration failed'

        });

    }

};

// Login User

const login = async (req, res) => {

    try {

        const { email, password } = req.body;


 

        // Validation

        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message: 'Email and password are required'

            });

        }


 

        // Find user

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(401).json({

                success: false,

                message: 'Invalid credentials'

            });

        }

        // Check password


 

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {

            return res.status(401).json({

                success: false,

                message: 'Invalid credentials'

            });

        }

        // Generate token

        const token = generateToken(user._id);

        res.json({

            success: true,

            message: 'Login successful',

            token,

            user: {

                id: user._id,

                username: user.username,

                email: user.email,

                tags: user.tags || []

            }

        });

    } catch (error) {

        console.error('Login error:', error);

        res.status(500).json({

            success: false,

            message: 'Login failed'

        });

    }

};


 

// Get Current User


 

const getCurrentUser = async (req, res) => {

    try {

        res.json({

            success: true,

            user: {

                id: req.user._id,

                username: req.user.username,

                email: req.user.email,

                tags: req.user.tags || []

            }

        });

    } catch (error) {

        console.error('Get current user error:', error);

        res.status(500).json({

            success: false,

            message: 'Failed to get user data'

        });

    }

};


 

export {

    register,

    login,

    getCurrentUser

};




 

