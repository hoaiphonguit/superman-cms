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
    const { title, description, status, url } = req.body;
    if (!title || !description) {
        return res
            .status(400)
            .json({
                success: false,
                message: 'Missing Title and/or Description',
            });
    }
    try {
        const updatePost = {
            title,
            description,
            status: status || 'TO_LEARN',
            url: validUrl(url) || '',
        };

        const postUpdateCondition = { _id: req.params.id, author: req.userId };

        updatedPost = await Post.findOneAndUpdate(
            postUpdateCondition,
            updatedPost,
            { new: true }
        );

        // User not authorised to update post or post not found
        if (!updatePost) {
            return res.status(401).json({
                success: false,
                message: 'Post not found or user not authorised',
            });
        }

        return res.status(401).json({
            success: true,
            message: 'Post update successfully',
            post: updatePost,
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

module.exports = router;
