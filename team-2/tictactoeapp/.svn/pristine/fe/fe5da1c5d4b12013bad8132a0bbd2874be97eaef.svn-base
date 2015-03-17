var redis = require("redis");
var redisclient = redis.createClient();
var async = require('async');

module.exports = {
		createUser : function(user,callback){
			redisclient.set('user:'+user.id,JSON.stringify(user),function(){
				callback("SUCCESS");
			});
		},
		fetchusers : function(callback){
			
			var r = [];

			redisclient.keys('user:*', function(err, keys) {
			  async.each(keys, function(key, callback) {
				  	  
				  redisclient.get(key, function(err,user) {
					  console.log(user);
					  r.push(JSON.parse(user));
					  callback(err);
				    
					
			    });
			  }, function() {
			  
				  callback(r);
			  
			  });
			});
			
		},
		deleteUser : function(clientId,callback){
			redisclient.del('user:'+clientId);
			callback("SUCCESS");
		},
		deleteAlluser : function(callback){
			redisclient.keys('user:*', function(err, keys) {
				  async.each(keys, function(key, callback) {
					  redisclient.del(key);
				  }, function() {
				  
					  callback("SUCCESS");
				  
				  });
				});
			
		},
		updateUser : function(user,callback){
			redisclient.set('user:'+user.id,JSON.stringify(user),function(){
				callback("SUCCESS");
			});
		}
}