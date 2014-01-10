'use strict';

angular.module('kalmasNetApp', [
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