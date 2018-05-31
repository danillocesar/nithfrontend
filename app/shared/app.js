'use strict';
angular.module('nithapp', ['ui.router', 'ui.router.state.events', 'ngCookies', 'base64', 'ngMaterial', 'ngMessages', 'ui.mask'])
.config(function($stateProvider, $urlRouterProvider, $cookiesProvider) {
	$stateProvider
     .state('home', {
      url: '/home',
      templateUrl: 'views/home/home.html',
      controller: 'HomeController'
    })
    .state('login', {
    	url: '/login',
    	templateUrl: 'views/login/login.html',
    	controller: 'LoginController'
    })
	$urlRouterProvider.otherwise('/login');
});
angular.module('nithapp').constant('API', 'https://nithbackend.herokuapp.com');