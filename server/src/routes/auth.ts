import * as argon2 from 'argon2';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/auth';
import User from '../model/user';

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register user
 * @access Public
 */
router.post('/register', async (req, res) => {
    const { username, password, name, phone } = req.body;

    if (!username || !password || !name) {
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
        const newUser = new User({
            username,
            password: hashedPassword,
            name,
            phone,
        });
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
        const userUpdateCondition = { _id: req['userId'], deleted: false };
        const updateUser = { lastModified: new Date().getTime() };

        console.log(userUpdateCondition, updateUser);
        const user = await User.findOneAndUpdate(
            userUpdateCondition,
            updateUser,
            { new: false }
        ).select('-password');
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

export default router;
