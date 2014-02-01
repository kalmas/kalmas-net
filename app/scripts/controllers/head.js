'use strict';

angular.module('kalmasNetApp.controllers')
  .controller('HeadCtrl', ['$scope', 'Page',
  function ($scope, Page) {
    $scope.Page = Page;
  }]);