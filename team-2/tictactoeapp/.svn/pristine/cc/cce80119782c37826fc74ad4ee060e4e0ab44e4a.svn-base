var express = require('express');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var redisservice = require('./services/redis/redisclient');

app.use(express.bodyParser());
app.use('/', express.static(__dirname + '/public/html'));
app.use('/js', express.static(__dirname + '/public/js'));

app.put('/api/user/:username', function(req,res) {
    var user = req.params.username;
    console.log("User to create:::"+user);
    
    redisservice.createUser(user,function(result){
    	console.log(result);
    });

    res.send(JSON.stringify({username:user}));

});

app.get('/api/user/delete',function(req,res){
	redisservice.deleteAlluser(function(result){
		console.log(result);
	});
	res.end();
});

app.get('/api/users',function(req,res){
	
	fetchExistingUsers(function(userarr){
		 res.send(JSON.stringify(userarr));
	});
	
});

var fetchExistingUsers = function(callback){
	redisservice.fetchusers(callback);
}



io.on('connection', function(socket){
	
	var userConnId = socket.conn.id;
	
	socket.on('createuser',function(data){
		var username = data.username;
		console.log("UserName:::"+username+":::Connection Id:::"+userConnId);
		var user = {username:username,id:userConnId,status:'available'};
		
		 redisservice.createUser(user,function(result){
			 fetchExistingUsers(function(userarr){
					io.emit('users',userarr);
					
			 });
		 });
		
	});
	
	socket.on('gameinvitation',function(player){
		player.status = 'called';
		
		redisservice.updateUser(player,function(){
			fetchExistingUsers(function(userarr){
				io.emit('users',userarr);
				
			});
		});
		
	});
	
	socket.on('disconnect',function() {
		  
		  // Deleting User from Redis when disconnected
		redisservice.deleteUser(userConnId,function(result){
			fetchExistingUsers(function(userarr){
				socket.broadcast.emit('users', userarr);
				
			});
		});
		
		
		
		
		  console.log('The client has disconnected!');
	});
  
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});