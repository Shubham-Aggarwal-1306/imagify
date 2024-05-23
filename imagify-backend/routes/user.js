const express = require('express');
const { createUser, loginUser, updatePassword, updateProfile, deleteUser, logoutUser, myProfile, getUserProfile, getAllUsers, forgetPassword, resetPassword } = require('../controllers/user');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").get(isAuthenticated,logoutUser);
router.route("/update/password").put(isAuthenticated,updatePassword);
router.route("/update/profile").put(isAuthenticated,updateProfile);
router.route("/me").get(isAuthenticated, myProfile);
router.route("/user/:id").get(isAuthenticated, getUserProfile);
router.route("/users").get(isAuthenticated, getAllUsers);
router.route("/delete/me").delete(isAuthenticated,deleteUser);
router.route("/forgot/password").post(isAuthenticated, forgetPassword);
router.route("/password/reset/:token").put(isAuthenticated, resetPassword);

module.exports = router;