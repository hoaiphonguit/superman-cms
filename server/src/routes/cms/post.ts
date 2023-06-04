import * as express from 'express';
import { verifyToken } from 'src/middleware/auth';
import Post from 'src/model/post';
import { validUrl } from 'src/utils/string';
import { getImageUrl } from 'src/utils/url';
import _ from 'lodash';
import { redisClient } from 'src/server';
const router = express.Router();
const CACHE_KEY = 'POST';

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

        await redisClient.connect();

        await redisClient.set(
            `${CACHE_KEY}_${newPost._id}`,
            JSON.stringify(newPost)
        );

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
    } finally {
        await redisClient.disconnect();
    }
});

/**
 * @route GET /api/post/list
 * @desc Get post list
 * @access Private
 */
router.get('/allList', verifyToken, async (_req, res) => {
    try {
        const list = await Post.find({
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
 * @route GET /api/post/list
 * @desc Get post list
 * @access Private
 */
router.get('/myList', verifyToken, async (req, res) => {
    try {
        const list = await Post.find({
            author: req['userId'],
            deleted: false,
        }).populate('author');

        console.log('userId', req['userId']);

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

        await redisClient.connect();

        const cachePost =
            (await redisClient.get(`${CACHE_KEY}_${req.params.id}`)) || '';
        console.log('cachePost', cachePost, `${CACHE_KEY}_${req.params.id}`);

        if (!_.isEmpty(cachePost)) {
            return res.status(200).json({
                success: true,
                post: JSON.parse(cachePost),
            });
        } else {
            let post = await Post.findOne(postCondition).lean();

            // User not authorised to update post or post not found
            if (_.isEmpty(post)) {
                return res.status(401).json({
                    success: false,
                    message: 'Post not found or user not authorised',
                });
            }

            post = {
                ...post,
                thumbUrl: getImageUrl(post.thumbUrl),
            };

            await redisClient.set(
                `${CACHE_KEY}_${req.params.id}`,
                JSON.stringify(post)
            );

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
        await redisClient.disconnect();
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

        await redisClient.connect();
        await redisClient.set(
            `${CACHE_KEY}_${req.params.id}`,
            JSON.stringify(updatePost)
        );

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
    } finally {
        await redisClient.disconnect();
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

        await redisClient.connect();
        await redisClient.del(`${CACHE_KEY}_${req.params.id}`);

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
    } finally {
        await redisClient.disconnect();
    }
});

export default router;
