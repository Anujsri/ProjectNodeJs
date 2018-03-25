const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Blog Schema
const blogSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	content:{
		type: String,
		required: true
	}
	 
});

const Blog = module.exports = mongoose.model('Blog', blogSchema);

// Get Blogs
module.exports.getBlogs = (callback, limit) => {
	Blog.find(callback).limit(limit);
}

// Get Blogs
module.exports.getBlogById = (id, callback) => {
	Blog.findById(id, callback);
}

// Add Blogs
module.exports.addBlog = (blog, callback) => {
	Blog.create(blog, callback);
}

// Update Blogs
module.exports.updateBlog = (id, blog, options, callback) => {
	var query = {_id: id};
	var update = {
		title: blog.title,
		genre: blog.content
		 
	}
	Blog.findOneAndUpdate(query, update, options, callback);
}

// Delete Blogs
module.exports.removeBlog = (id, callback) => {
	var query = {_id: id};
	Blog.remove(query, callback);
}
