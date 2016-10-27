angular.module("Task",["lumx","ngRoute", "ngResource"])
	.config(function($routeProvider) {
		$routeProvider
			.when("/", {
				controller: "HomeController",
				templateUrl: "views/home.html"
			})
			.when("/task/new", {
				controller: "TaskNewController",
				templateUrl: "views/task/new.html"
			})
			.when("/task/edit/:id", {
				controller: "TaskEditController",
				templateUrl: "views/task/edit.html"
			})
			.when("/user/login", {
				controller: "UserLoginController",
				templateUrl: "views/user/login.html"
			})
			.otherwise('/');
	})