angular.module("Task")
.factory("TaskResource", function($resource) {
	return $resource('http://localhost/api/:id', { id : "@id"}, {update: {method: "PUT"}});
})