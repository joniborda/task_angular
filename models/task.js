var Task;
var TaskDao = module.exports = {
	sync: function(db) {

		Task = db.define(
				"task",
			{
		    	id 			: {
		    		type: 'serial',
		    		key: true
		    	},
		        title      	: String,
		        description	: String
		    },
		    {
		        methods: {
		            fullName: function () {
		                return this.id + ' ' + this.title;
		            }
		        }
		    }
	    );
	},
	create: function(data, callback) {

		Task.create(data, function() {
				return callback(null);
		});
	},
	get: function(id, callback) {
		Task.get(id, function(err, task) {
	    	return callback(null, task);
		});
	},
	save: function(id, data, callback) {
		Task.get(id, function (err, task) {
		    task.save(data, function (err) {
		    	return callback(null);
		    });
		});
	},
	getAll: function(callback) {
		Task.find({}, { limit : 10}, function(err, tasks) {
		    var taskMap = {};

		    tasks.forEach(function(task) {
		      taskMap[task.id] = task;
		    });

	    	return callback(null, taskMap);
		});
	}
};

