'use strict';

angular.module('kalmasNetApp.controllers')
    .controller('IndexCtrl', ['$scope', 'About', function ($scope, About) {

  About.getAbout().then(function(about) {
  	$scope.skills = about.skills;
  	$scope.projects = about.projects;
  });


}]);
