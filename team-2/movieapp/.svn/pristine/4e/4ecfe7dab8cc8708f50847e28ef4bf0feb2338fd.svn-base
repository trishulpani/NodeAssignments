var express = require("express");
var app = express();

var http = require('http').Server(app);

app.use('/', express.static(__dirname + '/public/html'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/views', express.static(__dirname + '/public/views'));
app.use('/json', express.static(__dirname + '/public/json'));

http.listen(3030, function(){
	  console.log('listening on *:3030');
});