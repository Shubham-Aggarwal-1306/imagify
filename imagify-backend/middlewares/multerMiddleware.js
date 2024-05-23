// Import multer cloudinary and multer storage cloudinary
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Config cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

// Config multer storage cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'swapshop',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.filename,
    },
});

// Export multer
module.exports = multer({ storage: storage });
