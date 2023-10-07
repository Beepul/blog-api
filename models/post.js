const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: false
		},
		description: {
			type: String,
			required: false
		},
        username:{
            type: String
        },
		thumbnail: {
			type: String,
            default: ""
		},
		email: {
			type: String,
            default: ""
		},
		category: {
			type: Array,
			required: false
		}
	},
	{ timestamps: true }
);

const Post = mongoose.model('post', PostSchema);
module.exports = Post;
