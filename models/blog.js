const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
// Blog Schema
const blogSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	content:{
		type: String,
		required: true
	},

	authorid  : ObjectId
	 
});

const Blog = module.exports = mongoose.model('Blog', blogSchema);

// Get Blog
module.exports.getBlogs = (callback, limit) => {
	Blog.find(callback).limit(limit);
}

// Get Blog
module.exports.getBlogById = (id, callback) => {
	Blog.findById(id, callback);
}

// Update Blog
module.exports.updateBlog = (id, blog, options, callback) => {
	var query = {_id: id};
	var update = {
		title: blog.title,
		content: blog.content,
		 
	}
	Blog.findOneAndUpdate(query, update, options, callback);
}

// Delete Blog
module.exports.removeBlog = (id, callback) => {
	var query = {_id: id};
	Blog.remove(query, callback);
}
