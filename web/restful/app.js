'use strict';

var express = require('express'); // loads express module
var bodyparser = require('body-parser');

var jsonfile = require('jsonfile'); // module

var routes = require('./routes'); // from routes.js

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

function enableCORS(req, res, next) { // Cross-Origin Request Sharing
    console.log('request received');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
}

app.use(enableCORS);

// var file = './test.json'
// jsonfile.readFile(file, function(err, obj) {
//   console.dir(obj)
// })

routes.configure(app);


var server = app.listen(4000, function() {
   console.log('RESTful service listening on port ' + server.address().port);
});

