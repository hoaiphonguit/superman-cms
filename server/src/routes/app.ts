import * as express from 'express';
import { verifyToken } from '../middleware/auth';
import Navigation from '../model/navigation';

const router = express.Router();

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

export default router;
