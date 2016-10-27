angular
	.module('Task')
	.controller("HomeController", function($scope, $resource, TaskResource) {
		Task = TaskResource;
		$scope.tasks = Task.get();
		
	})
	.controller("TaskNewController", function($scope, $resource, TaskResource, $location) {
		Task = TaskResource;
		$scope.task = {};
		$scope.saveTask = function() {
			Task.save({data: $scope.task}, function(data) {
			$location.path("/");
		});
		}
	})
	.controller("TaskEditController", function($scope, $resource, TaskResource, $location, $routeParams) {
		Task = TaskResource;
		$scope.task = Task.get({id:$routeParams.id});

		$scope.saveTask = function() {
			Task.update($scope.task.id, {data: $scope.task}, function(data) {
				$location.path("/");
			});
		}
	})
	.controller("UserLoginController", function($scope, $resource, $location, $routeParams, $http) {
		$scope.user = {};
		$scope.login = function() {
			$http.post(
				"/user/login",
				{
					username: $scope.user.username,
					password: $scope.user.password
				}
			).then(function successCallback(response) {
			    if (response.data.success) {
			    	$location.path("/");
			    } else {
			    }
			  }, function errorCallback(response) {
			  });
		}
	});
