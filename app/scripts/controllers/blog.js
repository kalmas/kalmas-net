'use strict';

angular.module('kalmasNetApp.controllers', [])
    .controller('BlogCtrl', ['$scope', '$routeParams', '$location', 'BlogPosts'
              , function ($scope, $routeParams, $location, BlogPosts) {

    var slug = $routeParams.slug;

    BlogPosts.getPostBySlug(slug).then(function(post) {
      if(post === undefined){
        // Couldn't find that slug, redirect to most recent post
        BlogPosts.getNewestPost().then(function(post) {
          $location.path('/blog/' + post.slug);
        });
      } else {
        $scope.post = post;
      }
    });


}]);
