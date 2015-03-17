gameapp.service('Userservice',function($http){
	
	return {
		
		create : function(username,callback){
			
			var request = $http({
                method: "put",
                url: "/api/user/"+username
            });

            request.success(function( data ) {

            	callback(data);

                }
            );
			
		}
		
	};
	
});