'use strict';

angular.module('kalmasNetApp')
  .controller('NavCtrl', function ($scope, $http, $location) {

    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },
    {
      'title': 'Blog',
      'link': '/blog'
    }];

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
