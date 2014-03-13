'use strict';

angular.module('kalmasNetApp.controllers')
  .controller('IndexCtrl', ['$scope', 'About', 'Page',
  function ($scope, About, Page) {

    Page.setTitle(undefined);
    Page.setDesc('Hi, my name is Kyle and my username is kalmas. ' +
      'This is my blog. I\'m a web developer by trade with a hobbyist\'s ' +
      'interest in anything programming related.');

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