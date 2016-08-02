angular.module("Task",["lumx","ngRoute", "ngResource"])
	.config(function($routeProvider) {
		$routeProvider
			.when("/", {
				controller: "MainController",
				templateUrl: "views/home.html"
			})
			.otherwise('/');
	})