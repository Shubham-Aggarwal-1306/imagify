const express = require('express');
const { createPost, deletePost,  getPost, getPosts, updatePost } = require('../controllers/post');
const { isAuthenticated } = require('../middlewares/auth');
const multerMiddleware = require('../middlewares/multerMiddleware');

const router = express.Router();


router.route("/post/upload").post(isAuthenticated, multerMiddleware.array('images', 4), createPost);
router.route("/post/:id")
    .put(isAuthenticated, updatePost)
    .delete(isAuthenticated, deletePost)
    .get(isAuthenticated, getPost);
router.get("/post", getPosts);


module.exports = router;