Here is some code. It's fairly meta.

```javascript
'use strict';

angular.module('kalmasNetApp.controllers', [])
    .controller('BlogCtrl', ['$scope', '$routeParams', '$location', 'BlogPosts'
              , function ($scope, $routeParams, $location, BlogPosts) {

    var slug = $routeParams.slug;

    // Get a list of recent posts
    BlogPosts.getPostsList().then(function(posts) {
      return posts;
    }).then(function(posts) {
      // Then get this post
      BlogPosts.getPostBySlug(slug).then(function(post) {
        if(post === undefined){
          $location.path('/blog/' + posts[0].slug);
        } else {
          $scope.post = post;
          $scope.posts = posts;
        }
      });
    });


}]);
```