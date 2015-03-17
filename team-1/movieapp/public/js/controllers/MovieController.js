// controller for searching movies and displaying search results or previously-searched results
movieDB.controller("SearchMoviesController", function($scope, $rootScope,
		$location, MovieService) {

	var movieName = $location.search().movieName;
	console.log(movieName);

	// store the last searched movie name in a root-scope variable to be
	// accessed inside the list controller
	$rootScope.lastSearchedMovieName = movieName;

	MovieService.fetchMovieList(function(response) {
		var movieList = response.movies;
		$scope.movieList = movieList;

	});

	$scope.searchMovies = function(selectedMovieName) {

		var movieNameToBeSearched = '';

		// if previously searched movie name hyperlink clicked, flush out any
		// movie name entered by user
		if (selectedMovieName) {
			movieNameToBeSearched = selectedMovieName;
		}
		// search button clicked after entering the movie name in the text box
		else {

			var tempMovieName = $scope.moviename;

			if (tempMovieName) {
				movieNameToBeSearched = $scope.moviename;
			}
			// if user did not enter anything in the search text box and clicked
			// on the search button
			else {
				alert('Please enter a movie name in the search text box');
				return;
			}
		}

		$location.path('/').search({
			movieName : movieNameToBeSearched
		});

		var movieList = $scope.movieList;
		$scope.moviesMatchedList = [];

		if (movieList) {
			movieList.forEach(function(movie) {

				if (movieNameToBeSearched == movie.title) {
					alert("Found movie : " + movie.title);
					$scope.moviesMatchedList.push(movie);
				}

			});
		}

	}

});

// controller for listing previously searched movies
movieDB.controller("ListMoviesController", function($scope, $rootScope) {

	$scope.movieNameArray = [];

	var previouslySearchedMovies = localStorage.getItem("movieNameArr");
	console.log(previouslySearchedMovies);

	var lastSearchedMovieName = $rootScope.lastSearchedMovieName;

	if (lastSearchedMovieName) {
		$scope.movieNameArray.push(lastSearchedMovieName);
	}

	if (previouslySearchedMovies) {

		previouslySearchedMovies.split(",").forEach(function(item) {
			if (lastSearchedMovieName && item != lastSearchedMovieName) {
				$scope.movieNameArray.push(item);
			}
		});
	}

	localStorage.setItem("movieNameArr", $scope.movieNameArray);

});
