const moongose = require('mongoose');

const postSchema = new moongose.Schema({
    title: String,
    description: String,
    slug: String,
    images: [
        {
            url: String,
            public_id: String,
        },
    ],
    visitor_count:{
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

postSchema.pre('save', async function (next) {
    if (!this.isModified('title')) {
        next();
    }
    this.location = {
        type: 'Point',
        coordinates: [this.longitude, this.latitude]
    }
   let slug = this.title.split(' ').join('-');
    const slugRegEx = new RegExp(`^(${slug})((-[0-9]*$)?)$`, 'i');

    const postsWithSlug = await this.constructor.find({ slug: slugRegEx });

    if (postsWithSlug.length) {
        slug = `${slug}-${postsWithSlug.length + 1}`;
    }

    this.slug = slug;

});

module.exports = moongose.model('Post', postSchema);