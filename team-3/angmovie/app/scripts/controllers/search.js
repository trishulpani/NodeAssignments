'use strict';

/**
 * 
 * This is the Controller definition for Movie Search. 
 * It uses the SearchService to do the actual search, manipulates the received response
 * and displays them accordingly
 * 
 */
angular.module('angNodeApp')
  .controller('MovieSearchController', function ($scope, SearchService) {
    
    $scope.searchTerm = '';
    
   

    $scope.doSearch = function(){
    	console.log('Searching for ' + $scope.searchTerm );

    	SearchService.searchForMovie( $scope.searchTerm ).then(

    		function( data ){
    			
    			$scope.searchData = data;


    		},

    		function( error ){
    			alert('Unable to fetch movie data');
    		}
    	);

    };
  });

