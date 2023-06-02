import * as express from 'express';
import * as redis from 'redis';
import { verifyToken } from 'src/middleware/auth';
import Post from 'src/model/post';
import { validUrl } from 'src/utils/string';
import { getImageUrl } from 'src/utils/url';
const router = express.Router();
const CACHE_KEY = 'POST';

const client = redis.createClient();

// echo redis errors to the console
client.on('error', (err) => {
    console.log('Error ' + err);
});

/**
 * @route POST /api/post/create
 * @desc Create post
 * @access Private
 */
router.post('/create', verifyToken, async (req, res) => {
    const {
        title,
        description,
        status,
        url = '',
        htmlBody,
        jsonBody,
    } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            success: false,
            message: 'Missing Title and/or Description',
        });
    }

    try {
        const newPost = new Post({
            title,
            description,
            status: status || 0,
            url: validUrl(url),
            htmlBody,
            jsonBody,
            author: req['userId'],
        });

        await newPost.save();

        return res.json({
            success: true,
            message: 'Post created successfully',
            post: newPost,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

/**
 * @route GET /api/post/list
 * @desc Get post list
 * @access Private
 */
router.get('/list', verifyToken, async (req, res) => {
    try {
        const list = await Post.find({
            authorId: req['userId'],
            deleted: false,
        }).populate('author');

        return res.json({
            success: true,
            list,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

/**
 * @route GET /api/post/:id
 * @desc Get post
 * @access Private
 */
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const postCondition = {
            _id: req.params.id,
            author: req['userId'],
        };

        await client.connect();

        const cachePost = client.get(`${CACHE_KEY}_${req.params.id}`);
        console.log('cachePost', cachePost);

        if (!cachePost) {
            return res.status(200).json({
                success: true,
                post: cachePost,
            });
        } else {
            let post = await Post.findOne(postCondition).lean();

            // User not authorised to update post or post not found
            if (!post) {
                return res.status(401).json({
                    success: false,
                    message: 'Post not found or user not authorised',
                });
            }

            post = {
                ...post,
                thumbUrl: getImageUrl(post.thumbUrl),
            };

            client.set(`${CACHE_KEY}_${req.params.id}`, post);

            return res.status(200).json({
                success: true,
                post,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    } finally {
        await client.disconnect();
    }
});

/**
 * @route PUT /api/post
 * @desc Update post
 * @access Private
 */
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, status, url, htmlBody, jsonBody } = req.body;
    if (!title || !description || status == undefined) {
        return res.status(400).json({
            success: false,
            message: 'Missing Title and/or Description',
        });
    }
    try {
        const updatePost = {
            title,
            description,
            htmlBody,
            jsonBody,
            status: status,
            url: validUrl(url) || '',
            modifiedDate: new Date().getTime(),
        };

        const postUpdateCondition = {
            _id: req.params.id,
            author: req['userId'],
        };

        const updatePostResp = await Post.findOneAndUpdate(
            postUpdateCondition,
            updatePost,
            { new: true }
        );

        // User not authorised to update post or post not found
        if (!updatePostResp) {
            return res.status(401).json({
                success: false,
                message: 'Post not found or user not authorised',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Post update successfully',
            post: updatePost,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

/**
 * @route DELETE /api/post/delete
 * @desc Delete post
 * @access Private
 */
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const postDeleteCondtion = {
            _id: req.params.id,
            author: req['userId'],
        };
        const deletedPost = await Post.findOneAndUpdate(
            postDeleteCondtion,
            { deleted: true },
            { new: true }
        );

        // User not authorised to update post or post not found
        if (!deletedPost) {
            return res.status(401).json({
                success: false,
                message: 'Post not found or user not authorised',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Post delete successfully',
            post: deletedPost,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

export default router;
