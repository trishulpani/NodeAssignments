movieDB.service('MovieService', function($http) {

	return {

		fetchMovieList : function(callback) {

			console.log("Fetching list of all movies....");

			$http.get('http://localhost:4365/json/movies.json').success(
					function(data) {
						callback(data);

					});

		}

	}

});