var express = require("express"),
//	bodyParser = require("body-parser"),
	app = express(),
	mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	taskSchemaJSON = {
		title: String,
		description: String
	};

mongoose.connect("mongodb://localhost/task");
var task_schema = new Schema(taskSchemaJSON);
var Task = mongoose.model("Task", task_schema);

app.use("/", express.static("public"));

app.post("/api", function(req, res) {

console.log(req);
/*
	var task = new Task({
		title: $scope.post.title,
		description: $scope.post.description
	});

	task.save(function() {
	});
	*/
		res.send("Guardamos tus datos");	
});

app.listen(80);