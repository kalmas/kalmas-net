'use strict';

angular.module('kalmasNetApp')
  .controller('NavCtrl', function ($scope, $http, $location) {

    $scope.menu = [{
      'title': 'Home',
      'link': 'http://kalmas.net',
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
