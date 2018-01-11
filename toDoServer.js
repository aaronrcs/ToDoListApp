var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs('toDoList', ['toDoList']);
var bodyParser = require("body-parser");




//Handle get request

// app.get("/contact_list", function(req,res){

// 	// res.send("Hello World");

// 	console.log("I recieved a GET request, sending data!");


// });

//serve an HTML page

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//Gettting a 'Get' request from controller
app.get('/toDoList', function(req, res){

	console.log("I recieved a GET request, sending data!");


	db.toDoList.find(function(err, docs){

		console.log(docs);
		res.json(docs);

	});


});

//Passing the data to the controller 
app.post('/toDoList', function(req, res){

	console.log(req.body);

	db.toDoList.insert(req.body,function(err, docs){

		res.json(docs);

	});

});

//Deleting from the database
app.delete('/toDoList/:id', function(req, res){

	var id = req.params.id;

	console.log(id);

	db.toDoList.remove({_id: mongojs.ObjectId(id)}, function(err, doc){

		res.json(doc);
	});

});

//For Edition a Contact 
app.get('/toDoList/:id', function(req, res){

	var id = req.params.id;

	db.toDoList.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);

	});

});

//to Update info
app.put('/toDoList/:id', function(req, res){
	var id = req.params.id;
	// console.log(req.body.name);
	db.toDoList.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {title: req.body.title, text: req.body.text, due: req.body.due, status: req.body.status}},
		new: true}, function(err, doc){
			res.json(doc);
	});
});


//to update the status of a to-do list item 
// app.put('/toDoList/:id', function(req, res){
// 	var id = req.params.id;
// 	// var getStatus = req.params.status;
// 	// console.log(req.body.name);
// 	db.toDoList.findAndModify({query: {_id: mongojs.ObjectId(id)},
// 		update: {$set: {status: 'Done'}},
// 		new: true}, function(err, doc){
// 			res.json(doc);
// 	});
// });



app.listen(3000);

console.log("Server running on port 3000");

