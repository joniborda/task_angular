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
			console.log($scope.task);
			Task.save({data: $scope.task}, function(data) {
			console.log(data);
			$location.path("/");
		});
		}
	});
