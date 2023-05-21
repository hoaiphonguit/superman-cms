import * as express from 'express';
import * as fs from 'fs';
import * as multer from 'multer';
import { verifyToken } from '../middleware/auth';
import Photo from '../model/photo';
import User from '../model/user';
import { getImagePath, getImageUrl } from '../utils/url';
const router = express.Router();

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
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
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage }).single('image');

/**
 * @route POST /api/post/create
 * @desc Create post
 * @access Private
 */
router.post('/images', verifyToken, async (req: any, res) => {
    upload(req, res, async (err) => {
        const { file } = req;
        if (err instanceof multer.MulterError) {
            res.status(500).json({
                success: false,
                err: err.code,
                message: err.message,
            });
        } else if (err) {
            console.log('err', err);
            res.status(500).json({
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
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    });
});

/**
 * @route GET /api/post/list
 * @desc Get post list
 * @access Private
 */
// router.get('/list', verifyToken, async (req, res) => {
//     try {
//         const list = await Post.find({
//             authorId: req['userId'],
//             deleted: false,
//         }).populate('author');

//         return res.json({
//             success: true,
//             list,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: 'Internal server error',
//         });
//     }
// });

// /**
//  * @route GET /api/post/:id
//  * @desc Get post
//  * @access Private
//  */
// router.get('/:id', verifyToken, async (req, res) => {
//     try {
//         const postUpdateCondition = {
//             _id: req.params.id,
//             author: req['userId'],
//         };

//         const post = await Post.findOne(postUpdateCondition);

//         // User not authorised to update post or post not found
//         if (!post) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Post not found or user not authorised',
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             post,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: 'Internal server error',
//         });
//     }
// });

// /**
//  * @route PUT /api/post
//  * @desc Update post
//  * @access Private
//  */
// router.put('/:id', verifyToken, async (req, res) => {
//     const { title, description, status, url } = req.body;
//     if (!title || !description || status == undefined) {
//         return res.status(400).json({
//             success: false,
//             message: 'Missing Title and/or Description',
//         });
//     }
//     try {
//         let updatePost = {
//             title,
//             description,
//             status: status,
//             url: validUrl(url) || '',
//             modifiedDate: new Date().getTime(),
//         };

//         const postUpdateCondition = {
//             _id: req.params.id,
//             author: req['userId'],
//         };

//         updatePost = await Post.findOneAndUpdate(
//             postUpdateCondition,
//             updatePost,
//             { new: true }
//         );

//         // User not authorised to update post or post not found
//         if (!updatePost) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Post not found or user not authorised',
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: 'Post update successfully',
//             post: updatePost,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: 'Internal server error',
//         });
//     }
// });

// /**
//  * @route DELETE /api/post/delete
//  * @desc Delete post
//  * @access Private
//  */
// router.delete('/:id', verifyToken, async (req, res) => {
//     try {
//         const postDeleteCondtion = {
//             _id: req.params.id,
//             author: req['userId'],
//         };
//         const deletedPost = await Post.findOneAndUpdate(
//             postDeleteCondtion,
//             { deleted: true },
//             { new: true }
//         );

//         // User not authorised to update post or post not found
//         if (!deletedPost) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Post not found or user not authorised',
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: 'Post delete successfully',
//             post: deletedPost,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: 'Internal server error',
//         });
//     }
// });

export default router;
