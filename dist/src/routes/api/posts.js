"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const express_validator_1 = require("express-validator");
const Post_1 = __importDefault(require("../../models/Post"));
const User_1 = __importDefault(require("../../models/User"));
exports.posts_router = express_1.Router();
// @route   POST api/posts
// @desc    Create a post
// @access  Private
exports.posts_router.post('/', auth_1.default, [express_validator_1.check('text', 'Text is required').not().isEmpty()], async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User_1.default.findById(req.user.id).select('-password');
        const newPost = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
        };
        const post = new Post_1.default(newPost);
        await post.save();
        res.json(post);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});
// @route   GET api/posts
// @desc    Get all posts
// @access  Private
exports.posts_router.get('/', auth_1.default, async (req, res) => {
    try {
        const posts = await Post_1.default.find().sort({ _id: 1 });
        res.json(posts);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});
// @route   Get api/posts/:post_id
// @desc    Get a post
// @access  Private
exports.posts_router.get('/:post_id', auth_1.default, async (req, res) => {
    try {
        const post = await Post_1.default.findById(req.params.post_id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    }
    catch (error) {
        console.error(error.message);
        if (error.name == 'CastError') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('server error');
    }
});
// @route   DELETE api/posts/:post_id
// @desc    Get a post
// @access  Private
exports.posts_router.delete('/:post_id', auth_1.default, async (req, res) => {
    try {
        const post = await Post_1.default.findById(req.params.post_id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await post.remove();
        res.json({ msg: 'Post removed' });
    }
    catch (error) {
        console.error(error.message);
        if (error.name == 'CastError') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('server error');
    }
});
// @route   PUT api/posts/likes/:post_id
// @desc    Like a post
// @access  Private
exports.posts_router.put('/likes/:post_id', auth_1.default, async (req, res) => {
    try {
        const post = await Post_1.default.findById(req.params.post_id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        //Check if user already liked a post
        if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' });
        }
        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);
    }
    catch (error) {
        console.error(error.message);
        if (error.name == 'CastError') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('server error');
    }
});
// @route   PUT api/posts/unlikes/:post_id
// @desc    UnLike a post
// @access  Private
exports.posts_router.put('/unlikes/:post_id', auth_1.default, async (req, res) => {
    try {
        const post = await Post_1.default.findById(req.params.post_id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        //Check if user already liked a post
        if (post.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post has not been liked' });
        }
        const updatedPost = await Post_1.default.findOneAndUpdate({ _id: req.params.post_id }, { $pull: { likes: { user: req.user.id } } }, { new: true });
        res.json(updatedPost.likes);
    }
    catch (error) {
        console.error(error.message);
        if (error.name == 'CastError') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('server error');
    }
});
// @route   PUT api/posts/comments
// @desc    Create a post
// @access  Private
exports.posts_router.post('/comments/:post_id', auth_1.default, [express_validator_1.check('text', 'Text is required').not().isEmpty()], async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User_1.default.findById(req.user.id).select('-password');
        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
        };
        const post = await Post_1.default.findById(req.params.post_id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        post.comments.unshift(newComment);
        await post.save();
        res.json(post);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});
// @route   DELETE api/posts/:post_id
// @desc    Get a post
// @access  Private
exports.posts_router.delete('/comments/:post_id/:comment_id', auth_1.default, async (req, res) => {
    try {
        const post = await Post_1.default.findById(req.params.post_id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        const comment = post.comments.find((comment) => { var _a; return ((_a = comment._id) === null || _a === void 0 ? void 0 : _a.toString()) === req.params.comment_id; });
        if (!comment) {
            return res.status(404).json({ msg: 'Comment Doesnt exist' });
        }
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        const updatedPost = await Post_1.default.findOneAndUpdate({ _id: req.params.post_id }, { $pull: { comments: { _id: req.params.comment_id } } }, { new: true });
        res.json(updatedPost.comments);
    }
    catch (error) {
        console.error(error.message);
        if (error.name == 'CastError') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('server error');
    }
});
