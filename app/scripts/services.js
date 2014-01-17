'use strict';

angular.module('kalmasNetApp.services', [])
    .factory("BlogPosts", ['$http', '$q', function($http, $q) {
  var path = 'content/'
      , contentFormat = '.html'
      , tocFile = 'toc.json';

  var findPostWith = function(criteria, posts) {
    var key = Object.keys(criteria)[0]
      , value = criteria[key]
      , post = undefined;

    for (var i = 0; i < posts.length; i++) {
      if(posts[i][key] === value){
        post = posts[i];
        post.index = i; 
        return post;
      }
    }
  };

  var getToc = function() {
    var deferred = $q.defer()
      , tocPath = path + tocFile;

    $http.get(tocPath).then(function(response) {
      deferred.resolve(response.data);
    });

    return deferred.promise;
  };

  var lookupSlug = function(slug) {
    var deferred = $q.defer();

    getToc().then(function(toc) {
      var post = findPostWith({"slug": slug}, toc.content);
      deferred.resolve(post);
    });

    return deferred.promise;
  };  

  var lookupIndex = function(index) {
    var deferred = $q.defer();

    getToc().then(function(toc) {
      var post = toc[index];
      deferred.resolve(post);
    });

    return deferred.promise;
  }

  return {
    getPostBySlug: function(slug) {
      var deferred = $q.defer();

      lookupSlug(slug).then(function(post) {
        if(post !== undefined) {
          post.contentPath = path + slug + contentFormat;
        }
        deferred.resolve(post);
      });

      return deferred.promise;
    },
    getPostByIndex: function(index){
      var deferred = $q.defer();

      lookupIndex(index).then(function(post) {
        if(post !== undefined){
          post.contentPath = path + post.slug + contentFormat;
          post.index = index;
        }
        deferred.resolve(post);
      });

      return deferred.promise;
    },
    getPostsList: function() {
      var deferred = $q.defer();

      getToc().then(function(toc) {
        deferred.resolve(toc.content);
      });

      return deferred.promise;
    }
  };
    
}]);
