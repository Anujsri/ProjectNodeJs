const mongoose = require('mongoose');

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

	author :
	      {
	      	type : String,
	      	required : true
	      }
	 
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

// Add Blog
module.exports.createBlog = (newBlog, callback)=>{
	bcrypt.genSalt(10, (err, salt) =>{
	    bcrypt.hash(newUser.title, salt,(err, hash) =>{
	        newBlog.title = title;
	        newBlog.save(callback);
	    });
	});
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
