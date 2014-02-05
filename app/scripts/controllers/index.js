'use strict';

angular.module('kalmasNetApp.controllers')
  .controller('IndexCtrl', ['$scope', 'About',
  function ($scope, About) {

    About.getAbout().then(function(about) {
      $scope.bio = about.bio;
      $scope.skills = about.skills;
      $scope.projects = about.projects;
      $scope.code = about.interests.code;
      $scope.book = about.interests.book;
      $scope.music = about.interests.music;
      $scope.tv = about.interests.tv;
    });

  }]);