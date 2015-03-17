var movieApp = angular.module("movieapp",['ngRoute']);

movieApp.config(['$routeProvider',
                    function($routeProvider) {
                        $routeProvider.
                        when("/", {
                            templateUrl: "views/movies/search.html",
                            controller: 'moviescontroller'
                        });
                    }
                ]);