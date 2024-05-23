const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (req, res) => {
    try {
        const newPostData = {
            title: req.body.title,
            description: req.body.description,
            owner: req.user._id,
            images: req.files ? req.files.map(file => {
                return {
                    url: file.path,
                    public_id: file.filename,
                }
            }) : [],
        };

        const post = await Post.create(newPostData);
        const user = await User.findById(req.user._id);

        user.posts.push(post._id);
        user.save();

        res.status(201).json({
            success: true,
            post,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to delete this post",
            });
        }
        await Post.deleteOne({ _id: req.params.id });
        const user = await User.findById(req.user._id);
        user.posts.pull(post._id);
        await user.save();

        res.status(200).json({
            success: true,
            message: "Post deleted",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('owner', 'name');
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        res.status(200).json({
            success: true,
            post,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('owner', 'name');
        res.status(200).json({
            success: true,
            posts,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this post",
            });
        }

        post.title = req.body.title;
        post.description = req.body.description;
        post.longitude = req.body.longitude;
        post.latitude = req.body.latitude;
        post.location = {
            type: "Point",
            coordinates: [req.body.longitude, req.body.latitude],
        };
        post.visitor_count = req.body.visitor_count;

        await post.save();

        res.status(200).json({
            success: true,
            message: "Post updated",
        });
    }
    catch (error)  {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}