var express = require("express"),
    app = express(),
    server = require("http").createServer(app).listen(3000),
    fileUtils = require("./helpers/FileUtils.js"),
    io = require("socket.io").listen(server),
    gameController = require("./controllers/game_controller.js")(io);

var fs = require('fs');
// This is temporary for CloudFoundry deployment
// since CloudFoundry doesn't support web sockets
io.set("transports", [
    "flashsocket",
    "htmlfile",
    "xhr-polling",
    "jsonp-polling"
]);


    app.use(express.static("public"));
  
    app.use(express.bodyParser()); 
    
   
    
app.post("/games", gameController.create);
app.get("/games/:id.:format?", gameController.show);
app.put("/games/:id", gameController.update);
app.del("/games/:id", gameController.destroy);

//Send records.json file as response from server

app.get("/getRecords",function(request,response){
	response.sendfile("records.json");	
});

io.on("connection", function(socket){
    console.log("Connected through socket ..");
    
    socket.on("event-play", function(data) {
        console.log("Event received " + data);
    });
}); 
