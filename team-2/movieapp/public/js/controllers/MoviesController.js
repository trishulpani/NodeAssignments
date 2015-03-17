movieApp.controller("moviescontroller",function($scope,MovieAppService,$location,$rootScope){
	
	var movieName = $location.search().movieName;
	console.log(movieName);
	
	var searchedArr = [];
	var existingSearchedMovies = localStorage.getItem("movienameArr");
	
	if(!existingSearchedMovies) {
		searchedArr.push(movieName);
	} else {
		existingSearchedMovies.split(",").forEach(function(item){
			if(movieName && item!=movieName){
				searchedArr.push(item);
			}
			
		});
		
		searchedArr.push(movieName);
	}
	

	localStorage.setItem("movienameArr", searchedArr);
	
	
	
	MovieAppService.fetchMovies(movieName,function(response){
		var moviesArr = response.movies;
		$scope.movies = moviesArr;
		
	});
	
	
	$scope.searchMovies = function(movie){
		var movieName = $scope.moviename || movie;
		$location.path('/').search({movieName: movieName});
		/*var movieName = $scope.moviename || movie;
		$rootScope.movieName = movieName;
		
		var searchedArr = [];
		var existingSearchedMovies = localStorage.getItem("movienameArr");
		
		if(!existingSearchedMovies) {
			searchedArr.push(movieName);
		} else {
			existingSearchedMovies.split(",").forEach(function(item){
				if(item!=movieName){
					searchedArr.push(item);
				}
				
			});
			
			searchedArr.push(movieName);
		}
		

		localStorage.setItem("movienameArr", searchedArr);
		
		
		
		MovieAppService.fetchMovies(movieName,function(response){
			var moviesArr = response.movies;
			$scope.movies = moviesArr;
			
		});*/
		

		
	}
	
	$scope.showPreviousItems = function(){
		console.log("Init Called");
		$scope.searhedArr = [];
		var existingSearchedMovies = localStorage.getItem("movienameArr");
		if(existingSearchedMovies){
			existingSearchedMovies.split(",").forEach(function(item){
				$scope.searhedArr.push(item);
			});
		}
		
		
		
	}
	

	
	
});
