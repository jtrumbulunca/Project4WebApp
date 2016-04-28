(function () {
	"use strict";
	
	var Express = require('express'),
			bodyParser = require('body-parser'),
			mongoose = require('mongoose'),
			app = new Express();

	app.use(Express.static(__dirname));
	app.use(bodyParser.urlencoded({ extended: true }));
	
	mongoose.connect('mongodb://localhost/contacts');
	mongoose.db = mongoose.connection;
	
	var ContactSchema = mongoose.Schema({
		"firstName": String,
		"lastName" : String,
		"address": String,
		"phoneNumber": String
	});
	var Contact = mongoose.model('Contact', ContactSchema);
	
	app.use(function(req, res, next) {
  		console.log('%s %s', req.method, req.url);
  		next();
	});
	
	app.get("/getContact", function(req, res, next) {
		Contact.find(req.query, function(err, Contact) {
			if (err) {
				console.log(err);
			} else {
				res.json(Contact);
			}
			res.end();
		});
	});
	
	app.post("/putContact", function(req, res, next) {
		var newContact = new Contact(req.body);
		newContact.save(function(error, data) {
			if (error) console.log(error); 
		});
		res.end();
	});
	
	// This route only updates instrument. It should be made more general to 
	// update anything.
	app.post("/updateContact", function(req, res, next) {
		var conditions = {"firstName" : req.body.firstName};
		var update = {$set : {"phoneNumber" : req.body.phoneNumber}};
		Contact.update(conditions, update, {multi : false}, function(error, result) {
			if (error) console.log(error);
		});
		res.end();
	});
	
	app.post("/removeContact", function(req, res, next) {
		var oldContact = new Contact(req.body);
		oldContact.remove(function(error, data) {
			if (error) console.log(error);
		});
		res.end();
	});

	app.listen(3000);
	console.log("Server listening on port 3000."); 

}());