var app = angular.module('meanBelt2', ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'partials/login.html',
		controller: 'usersController',
		controllerAs: 'uc'
	})
	.when('/dashboard',{
		templateUrl: 'partials/dashboard.html',
		controller: 'angularController',
		controllerAs: 'ac'
	})
	.when('/create',{
		templateUrl: 'partials/create_poll.html',
		controller: 'angularController',
		controllerAs: 'ac'
	})
	.when('/poll/:id',{
		templateUrl: 'partials/poll.html',
		controller: 'angularController',
		controllerAs: 'ac'
	})
	.otherwise({
		redirectTo: '/'
	})

});