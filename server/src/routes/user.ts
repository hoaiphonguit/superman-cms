import * as express from 'express';
import { verifyToken } from '../middleware/auth';
import User from '../model/user';

const router = express.Router();

/**
 * @route GET /api/user/list
 * @desc Get user list
 * @access Private
 */
router.get('/list', verifyToken, async (req, res) => {
    try {
        const list = await User.find({ deleted: 0 }).select([
            '-password',
            '-deleted',
        ]);

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
    const { username, name, phone, baned } = req.body;
    if (!username || !name) {
        return res.status(400).json({
            success: false,
            message: 'Missing username and/or name',
        });
    }
    try {
        let updateUser = {
            name,
            phone,
            baned,
        };

        const userUpdateCondition = { _id: req.params.id, username };

        updateUser = await User.findOneAndUpdate(
            userUpdateCondition,
            updateUser,
            { new: true }
        );

        // User not authorised to update post or post not found
        if (!updateUser) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.json({
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
        const userUpdateCondition = { _id: req.params.id };
        const updateUser = { deleted: true };
        const updatedUser = await User.findOneAndUpdate(
            userUpdateCondition,
            updateUser,
            { new: true }
        );

        // User not authorised to update post or post not found
        if (!updatedUser) {
            return res.status(401).json({
                success: false,
                message: 'User not found or user not authorised',
            });
        }

        return res.json({
            success: true,
            message: 'User deleted successfully',
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

export default router;
