const User = require('../models/User');
const Post = require('../models/Post');
const { sendEmail } = require("../middlewares/sendMail")
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        user = await User.create({
            name,
            email,
            password
        });

        const token = user.generateToken();
        const options = {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: false,
        };

        res.status(200).cookie('token', token, options).json({
            success: true,
            user,
            token,
            expiresIn: options.expires,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter email and password",
            });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password",
            });
        }

        const token = user.generateToken();
        const options = {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: false,
        };
        res.status(200).cookie('token', token, options).json({
            success: true,
            user,
            token,
            expiresIn: options.expires,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.logoutUser = async (req, res) => {
    res.status(200).setHeader('Set-Cookie', 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT;').json({
        success: true,
        message: "Logged out",
    });
}

exports.updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('+password');

        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please enter old and new password",
            });
        }

        const isMatched = await user.comparePassword(oldPassword);

        if (!isMatched) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect",
            });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        const { name, email } = req.body;

        if (name) {
            user.name = name;
        }

        if (email) {
            user.email = email;
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);
        const posts = user.posts;
        const followers = user.followers;
        const following = user.following;

        for (const element of followers) {
            const follower = await User.findById(element);
            const index = follower.following.indexOf(user._id);
            follower.following.splice(index, 1);
            await follower.save();
        }
        for (const element of following) {
            const followee = await User.findById(element);
            const index = followee.followers.indexOf(user._id);
            followee.followers.splice(index, 1);
            await followee.save();
        }
        await user.remove();
        await Post.deleteMany({ _id: { $in: posts } });

        res.status(200).cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        }).json({
            success: true,
            message: "Profile Deleted.",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.myProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("posts");

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("posts");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        return res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.followUser = async (req, res) => {
    try {

        const userToFollow = await User.findById(req.params.id);
        const user = await User.findById(req.user._id);

        if (!userToFollow) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (userToFollow._id.toString() === user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "You cannot follow yourself",
            });
        }

        if (user.following.includes(userToFollow._id)) {
            const index = user.following.indexOf(userToFollow._id);
            user.following.splice(index, 1);

            const index2 = userToFollow.followers.indexOf(user._id);
            userToFollow.followers.splice(index2, 1);

            await user.save();
            await userToFollow.save();

            return res.status(200).json({
                success: true,
                message: "Unfollowed user",
            });
        }

        user.following.push(userToFollow._id);
        userToFollow.followers.push(user._id);

        await user.save();
        await userToFollow.save();

        res.status(200).json({
            success: true,
            message: "Followed user",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.forgetPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const resetToken = user.getResetPasswordToken();

        await user.save();

        const resetUrl = `${req.protocol}://${req.get("host")}/api/vi1/password/reset/${resetToken}`;

        const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

        try {
            await sendEmail({ email: user.email, subject: "Password Reset Token", message });
            res.status(200).json({
                success: true,
                message: `Email sent to: ${user.email}`,
            });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt : Date.now()}
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Token invaild or Expired."
            })
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        user.save();

        return res.status(200).json({
            success: true,
            message: "Password Reset Successful"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}