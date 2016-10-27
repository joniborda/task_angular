angular.module("Task")
.factory("TaskResource", function($resource) {
	return $resource('http://localhost:' + 5000 + '/api/:id', { id : "@id"}, {update: {method: "PUT"}});
})