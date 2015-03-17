angular.module.controller("TicTacIndexController", function($scope, $http) {
	$scope.games = [];
	$scope.createGameId = function() {
		
		$http({
			url : "games"/*,
			params : {
				country : $scope.country
			},*/
			method: "POST"
		}).success(function(output){

			// alert(output.gameID);
			$scope.games.push(output.gameID);
		});
	}
});