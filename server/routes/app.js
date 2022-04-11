const express = require('express');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();
const Navigation = require('../model/navigation');
const { validUrl } = require('../utils/string');

/**
 * @route GET /api/appConfig
 * @desc Get app navigations
 * @access Private
 */
router.get('/', verifyToken, async (req, res) => {
    try {
        const list = await Navigation.find();

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

module.exports = router;
