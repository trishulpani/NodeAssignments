movieApp.service('MovieAppService',function($http){
	
	
	return {
		
		fetchMovies : function(moviename,callback){
			console.log("In the Service::::"+moviename);
			
			if(moviename){
				$http.get('http://localhost:3030/json/movies.json').success(function (d) {
				      data = d;
				      callback(data);
				     
				    });
			}
			
			
			
		
		}
		
	}
	
});