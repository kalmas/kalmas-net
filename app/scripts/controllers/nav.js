'use strict';

angular.module('kalmasNetApp')
  .controller('NavCtrl', function ($scope, $http, $location) {

    $scope.menu = [{
      'title': 'Home',
      'link': '/',
      'pattern': /^\/$/
    },
    {
      'title': 'Blog',
      'link': '/blog',
      'pattern': /^\/blog.*$/

    }];

    $scope.isActive = function(pattern) {
      return $location.path().match(pattern);
    };
  });
