'use strict';

angular.module('kalmasNetApp.controllers', [])
    .controller('BlogCtrl', ['$scope', '$routeParams', '$location', 'BlogPosts'
              , function ($scope, $routeParams, $location, BlogPosts) {

    var slug = $routeParams.slug;
    if(slug === undefined){
      slug = 'scramble-squares';
    }

    BlogPosts.getPost(slug).then(function(post) {
      $scope.date = post.date;
      $scope.desk = post.desk;
      $scope.title = post.title;
      $scope.contentPath = post.contentPath;
    });

    // BlogPosts.getToc().then(function(toc) {
    //   $scope.toc = toc;
    //   console.log(toc);
    // });
    


}]);
