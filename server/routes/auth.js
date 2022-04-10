const express = require('express');
const router = express.Router();
const User = require('../model/user');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/auth');
require('dotenv').config({ path: './.env' });

/**
 * @route POST /api/auth/register
 * @desc Register user
 * @access Public
 */
router.post('/register', async (req, res) => {
    const { username, password, name } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Missing username and/or password',
        });
    }

    try {
        const user = await User.findOne({ username });
        if (user) {
            return res
                .status(400)
                .json({ success: false, message: 'Username aldready taken!' });
        }
        // All good
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        // Return token
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET
        );
        return res.json({
            success: true,
            message: 'User created successfully',
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

/**
 * @route POST /api/auth/login
 * @desc Login user
 * @access Public
 */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Missing username and/or password',
        });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Inccorect username or password',
            });
        }
        // Username found
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) {
            return res.status(400).json({
                success: false,
                message: 'Inccorect username or password',
            });
        }

        // All good
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET
        );
        return res.json({
            success: true,
            message: 'User logged in successfully',
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                name: user.name,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

/**
 * @route GET /api/auth
 * @desc Auth accesstoken
 * @access Public
 */
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Inccorect username or password',
            });
        }
        return res.json({
            success: true,
            message: 'User authenticated successfully',
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

module.exports = router;
