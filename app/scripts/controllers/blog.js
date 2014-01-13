'use strict';

angular.module('kalmasNetApp.controllers', [])
    .controller('BlogCtrl', ['$scope', '$routeParams', '$location', 'BlogPosts'
              , function ($scope, $routeParams, $location, BlogPosts) {

    var slug = $routeParams.slug;
    if(slug === undefined){
      slug = 'scramble-squares';
    }

    BlogPosts.getPost(slug).then(function(post) {
      $scope.title = post.title;
      $scope.date = post.date;
      $scope.desk = post.desk;
      $scope.contentPath = post.contentPath;
    });
    


}]);
