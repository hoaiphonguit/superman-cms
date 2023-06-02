import * as express from 'express';
import * as fs from 'fs';
import multer, { diskStorage } from 'multer';
import { verifyToken } from 'src/middleware/auth';
import Photo from 'src/model/photo';
import User from 'src/model/user';
import { getImagePath, getImageUrl } from 'src/utils/url';
const router = express.Router();

const storage = diskStorage({
    destination: async (req, _file, cb) => {
        try {
            const userCondition = {
                _id: req['userId'],
                baned: false,
                deleted: false,
            };
            const user = await User.findOne(userCondition);
            // User not authorised to update post or post not found
            if (!user) {
                console.log('User not found or user not authorised');
                cb(new Error('User not found or user not authorised'), '');
                return;
            }
            const path = `./public/data/uploads/images/${user.username}`;
            if (!fs.existsSync(path)) {
                fs.mkdir(path, (err) => {
                    if (err) {
                        cb(err, '');
                        return;
                    }
                });
            }
            cb(null, path);
        } catch (error) {
            console.log(error);
            cb(new Error('Internal server error'), '');
        }
    },
    filename: function (_req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage }).single('image');

/**
 * @route POST /api/post/create
 * @desc Create post
 * @access Private
 */
router.post('/images', verifyToken, async (req, res) => {
    upload(req, res, async (err) => {
        const { file } = req;
        if (err instanceof multer.MulterError) {
            return res.status(500).json({
                success: false,
                err: err.code,
                message: err.message,
            });
        } else if (err) {
            console.log('err', err);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }

        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'Missing file',
            });
        }

        try {
            const imageObject = {
                name: file.filename,
                alt: file.filename,
                url: getImagePath(file.path),
                author: req['userId'],
            };
            const image = new Photo(imageObject);
            await image.save();
            return res.json({
                success: true,
                message: 'Image upload successfully',
                image: {
                    ...imageObject,
                    url: getImageUrl(imageObject.url),
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    });
});

export default router;
