var fs = require("fs");

module.exports = {
	read : function(name,callback){
		fs.readFile(name,function(err,data){
			if(err){
				var message = "Error reading file " + name;
				message += "\nReason: " + err.message;
				throw new Error(message);
			}
			callback(data);
		});
	},
	write : function(name,contents,callback){
		fs.writeFile(name,contents,function(err){
			if(err){
				var message = "Error writting to file " + name;
				message += "\nReason: " + err.message;
				throw new Error(message);
			}
			callback(null);
		});
	},
	appendToFile: function(name, contents, callback) {
		fs.appendFile(name, contents, function(err) {
			if(err) {
				throw new Error("Error append to file " + name + " due to " + err.message);
			}
			callback(null);
		});
	}
}