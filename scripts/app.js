angular.module("Task",["lumx","ngRoute", "ngResource"])
	.config(function($routeProvider) {
		$routeProvider
			.when("/", {
				controller: "MainController",
				templateUrl: "views/home.html"
			})
			.when("/task/new", {
				controller: "TaskNewController",
				templateUrl: "views/task/new.html"
			})
			.otherwise('/');
	})