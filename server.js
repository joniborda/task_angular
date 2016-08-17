var express = require("express"),
//	bodyParser = require("body-parser"),
	app = express(),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	Schema = mongoose.Schema,
	taskSchemaJSON = {
		title: String,
		description: String
	};

mongoose.connect("mongodb://localhost/task");
var task_schema = new Schema(taskSchemaJSON);
var Task = mongoose.model("Task", task_schema);

app.use("/", express.static("public"));
app.use(bodyParser());

app.post("/api", function(req, res) {
	var task = new Task({
		title: req.body.data.title,
		description: req.body.data.description
	});

	task.save(function() {
		res.send("Guardamos tus datos");	
	});
});

app.get("/api", function(req, res) {

	Task.find({}, function(err, tasks) {
	    var taskMap = {};

	    tasks.forEach(function(task) {
	      taskMap[task._id] = task;
	    });

    	res.send(taskMap);  
	});
});

app.listen(80);