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
	});
