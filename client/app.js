var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller:'BlogssController',
		templateUrl: 'views/blogss.html'
	})
	.when('/blogs', {
		controller:'BlogsController',
		templateUrl: 'views/blogs.html'
	})
	.when('/blogs/details/:id',{
		controller:'BlogsController',
		templateUrl: 'views/log_details.html'
	})
	.when('/blogs/add',{
		controller:'BlogsController',
		templateUrl: 'views/add_blog.html'
	})
	.when('/blogs/edit/:id',{
		controller:'BlogsController',
		templateUrl: 'views/edit_blog.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});