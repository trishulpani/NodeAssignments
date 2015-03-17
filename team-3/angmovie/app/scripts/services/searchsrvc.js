'use strict';
angular.module('angNodeApp').service('SearchService', function($q, $http){

	return {

		searchData : { total : 0, movies : [] },

		searchForMovie : function( searchTerm ){

			var deferred = $q.defer();

			var searchURL = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?callback=JSON_CALLBACK&apikey=edpyxhran22urr7g7m7pdek8&q=' + searchTerm;

			var self = this;

			$http.jsonp( searchURL ).then( function( response ){
				
				console.log( response.data );
				
				var movies = response.data.movies;
				self.searchData.total = response.total;

				movies.forEach( function( elem ){
    				self.searchData.movies.push( self.extractMovieDetails( elem ));
    			} );

				deferred.resolve( self.searchData );
			},

			function( err ){
				deferred.reject( 'Error fetching data ' + err);
			});

			return deferred.promise;
		},


		extractMovieDetails : function( movie ){

			var details = {};

			details.thumbnail = movie.posters.thumbnail;
			details.title = movie.title;
			details.cast = ( movie.abridged_cast.length > 0 ) ? movie.abridged_cast.map(function( elem ){
				return elem.name;
			}).join(',') :  '';
			details.releaseYear = movie.year;
			details.runtime = movie.runtime;
			details.rating = movie.mpaa_rating;


			return details;
		}

	};
});