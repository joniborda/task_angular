var express = require("express"),
	app = express(),
	bodyParser = require('body-parser'),
	orm = require("orm");

if (global.Promise == null) {
	global.Promise = require("bluebird");
}

var opts = {
	host:     '10.2.87.142',
	database: 'task_orm',
	user: 'postgres',
	password: 'postgres',
	protocol: 'pg',
	port:     '5432',
	query:    {pool: true}
};

var Task;

orm.connect(opts, function (err, db) {
  if (err) throw err;
 
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
    });
 
    // add the table to the database 
    db.sync(function(err) {

        if (err) throw err;
    });
});

app.use("/", express.static("public"));
app.use(bodyParser());

app.post("/api/", function(req, res) {

	Task.create(req.body.data, function() {
		res.send("Guardamos tus datos");	
	});
});

app.put("/api/", function(req, res) {

	Task.get(req.body.data.id, function (err, task) {
	    task.save(req.body.data, function (err) {
	    	res.send("asdf");
	    });
	});

});

app.get("/api", function(req, res) {

	Task.find({}, { limit : 10}, function(err, tasks) {
	    var taskMap = {};

	    tasks.forEach(function(task) {
	      taskMap[task.id] = task;
	    });

    	res.send(taskMap);  
	});
});

app.get("/api/:id", function(req, res) {

	Task.get(req.params.id, function(err, task) {
    	res.send(task);
	});
});

app.listen(80);