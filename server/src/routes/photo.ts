import * as express from 'express';
import { verifyToken } from '../middleware/auth';
import Photo from '../model/photo';
import { validUrl } from '../utils/string';
import * as multer from 'multer';
const router = express.Router();
const upload = multer({ dest: './public/data/uploads/' });

/**
 * @route POST /api/post/create
 * @desc Create post
 * @access Private
 */
router.post('/images', verifyToken, upload.single('images'), async (req, res) => {
    const { title, description, status, url = '' } = req.body;
    console.log(req, req.body);

    // if (!title || !description) {
    //     return res.status(400).json({
    //         success: false,
    //         message: 'Missing Title and/or Description',
    //     });
    // }

    // try {
    //     const newPost = new Post({
    //         title,
    //         description,
    //         status: status || 0,
    //         url: validUrl(url),
    //         author: req['userId'],
    //     });

    //     await newPost.save();

    //     return res.json({
    //         success: true,
    //         message: 'Post created successfully',
    //         post: newPost,
    //     });
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         success: false,
    //         message: 'Internal server error',
    //     });
    // }
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
