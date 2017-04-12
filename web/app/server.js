'use strict';

var express = require('express') // loads express module
var util = require('util');
var path = require('path');

var http_proxy = require('http-proxy');
var proxy_server = require('http-route-proxy');

const PORT = 8010;

var app = express();


var staticPath = path.resolve(__dirname,'.');
app.use(express.static(staticPath));

var proxy = http_proxy.createProxyServer({});

app.all('/restful/*', function(req, res) {
    //console.log("req: "); console.log(req);
    proxy.web(req, res, {target: "http://localhost:4000"})
    // proxy.web(req, res, {target: "http://localhost:3000"});
});

app.listen(PORT);

console.log("Running for practice app.......,on http://localhost: "+PORT);