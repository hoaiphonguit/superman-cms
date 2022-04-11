const express = require('express');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();
const User = require('../model/user');
const { validUrl } = require('../utils/string');

/**
 * @route GET /api/user/list
 * @desc Get user list
 * @access Private
 */
router.get('/list', verifyToken, async (req, res) => {
    try {
        const list = await User.find().select('-password');

        return res.json({
            success: true,
            list,
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
 * @route PUT /api/user
 * @desc Update user
 * @access Private
 */
router.put('/:id', verifyToken, async (req, res) => {
    const { username, password, name, phone } = req.body;
    if (!username || !password || !name) {
        return res.status(400).json({
            success: false,
            message: 'Missing username and/or password',
        });
    }
    try {
        const updateUser = {
            username,
            name,
            phone,
        };

        const userUpdateCondition = { _id: req.params.id, username };

        updatedUser = await User.findOneAndUpdate(
            userUpdateCondition,
            updateUser,
            { new: true }
        );

        // User not authorised to update post or post not found
        if (!updatedUser) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(401).json({
            success: true,
            message: 'user update successfully',
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
 * @route DELETE /api/user/delete
 * @desc Delete post
 * @access Private
 */
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const postDeleteCondtion = { _id: req.params.id, user: req.userId };
        const deletedPost = await Post.findOneAndDelete(postDeleteCondtion);

        // User not authorised to update post or post not found
        if (!deletedPost) {
            return res.status(401).json({
                success: false,
                message: 'Post not found or user not authorised',
            });
        }

        return res.status(401).json({
            success: true,
            message: 'Post delete successfully',
            post: deletedPost,
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
 * @route GET /api/user/:id
 * @desc Get user
 * @access Private
 */
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
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
