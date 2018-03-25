var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Blog = require('../models/blog');

// Register
router.get('/register', (req, res)=>{
	res.render('register');
});

// Login
router.get('/login', (req, res)=>{
	res.render('login');
});
//crate blog
router.get('/blog', (req, res)=>{
	res.render('blog');
});

 var Userid;

// Register User
router.post('/register', (req, res)=>{
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,
			email:email,
			username: username,
			password: password
		});

		User.createUser(newUser,(err, user)=>{
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('users/login');
	}
});

passport.use(new LocalStrategy(
  (username, password, done) =>{
   User.getUserByUsername(username,(err, user)=>{
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password,(err, isMatch)=>{
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser((user, done) =>{
  done(null, user.id);
});

passport.deserializeUser((id, done) =>{
  User.getUserById(id, (err, user)=> {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  (req, res)=> {
   Userid=user._id;
   console.log("User Is:"+Userid);
    res.redirect('/');

  });

router.get('/logout', (req, res)=>{
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

router.post('/blog', (req, res)=>{
	var title = req.body.title;
	var content = req.body.content;
	var authorid = Userid;
	  

	// Validation
	req.checkBody('title', 'Title is required').notEmpty();
	req.checkBody('content', 'Content is required').notEmpty();
	// req.checkBody('author', 'Author is not valid').notEmpty();
	 
	// var errors = req.validationErrors();
	var errors = false;
	if(errors){
		res.render('blog',{
			errors:errors	
		});
		 
	} else {
		 
		var newBlog = new Blog({
			title: title,
			content:content,
			authorid: authorid,
			 
		});

		Blog.create(newBlog,(err, blog)=>{
			if(err) throw err;	
		});

		req.flash('success_msg', 'Your Content has been saved');

		res.redirect('/');
	}
});

Blog.findById("5ab7c39f89e6be37c0e33891", function(err, response){
 console.log(response);
});

 router.get('/api/blogs', (req, res) => {
	Blog.getBlogs((err, blogs) => {
		if(err){
			throw err;
		}
		res.json(blogs);
	});
});

router.get('/api/blogs/:_id', (req, res) => {
	Blog.getBlogById(req.params._id, (err, blog) => {
		if(err){
			throw err;
		}
		res.json(blog);
	});
});

router.put('/api/blogs/:_id', (req, res) => {
	var id = req.params._id;
	var blog = req.body;
	Blog.updateBlog(id, blog, {}, (err, blog) => {
		if(err){
			throw err;
		}
		res.json(blog);
	});
});

router.delete('/api/blogs/:_id', (req, res) => {
	var id = req.params._id;
	Blog.removeBlog(id, (err, blog) => {
		if(err){
			throw err;
		}
		res.json(blog);
	});
});

module.exports = router;