'use strict';

angular.module('kalmasNetApp', [
  'ui.bootstrap',
  'ngResource',
  'ngRoute',
  'kalmasNetApp.controllers',
  'kalmasNetApp.services'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/index',
        controller: 'IndexCtrl'
      })
      .when('/blog', {
        templateUrl: 'partials/blog',
        controller: 'BlogCtrl'
      })
      .when('/blog/:slug', {
        templateUrl: 'partials/blog',
        controller: 'BlogCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });

angular.module('kalmasNetApp.controllers', []);