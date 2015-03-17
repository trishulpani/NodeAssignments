gameapp.controller("gamecontroller",function($scope,socket,Userservice){
	
	$scope.joinedSession = false;
	$scope.startSession = function(){
		console.log("Starting play session for:::"+$scope.username);
		socket.emit('createuser',{username:$scope.username});
		$scope.joinedSession = true;
		
		/*Userservice.create($scope.username,function(result){
			
			socket.emit('usercreated',{username:$scope.username});
		});*/
	}
	
	socket.on('users',function(data){
		$scope.availableusersflag = false;
		$scope.availableusers = [];
		
			$scope.availableusersflag = true;
			data.forEach(function(user){
				
				
				if(user.username != $scope.username){
					$scope.availableusersflag = true;
					
					$scope.availableusers.push(user);
				}else{
					console.log("Invited By:::: "+user.invitedBy);
					$scope.invitedBy = user.invitedBy;
				}
				
			});
		
		
		//$scope.$apply();
	});
	
	$scope.inviteToPlay = function(player){
		player.invitedBy = $scope.username;
		socket.emit('gameinvitation',player);
		console.log("Invitation send to:: "+player);
	}
	
	
	$scope.$on('$destroy', function (event) {
        socket.removeAllListeners();
        
    });
	
});