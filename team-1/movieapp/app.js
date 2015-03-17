var express = require("express");
var app = express();

var http = require('http').Server(app);

app.use('/', express.static(__dirname + '/public/html'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/views', express.static(__dirname + '/public/views'));
app.use('/json', express.static(__dirname + '/public/json'));

http
		.listen(
				4365,
				function() {
					console
							.log('listening on host:localhost, port:4365 ........ ');
					console
							.log('Type http://localhost:4365 in borwser address bar to access application UI');
				});