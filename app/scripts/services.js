'use strict';

angular.module('kalmasNetApp.services', [])
    .factory("BlogPosts", ['$http', '$q', function($http, $q) {
  var path = 'content/'
      , contentFormat = '.html'
      , tocFile = 'toc.json'
      , toc = undefined;

  /**
   * Given a criteria obj, return the first post obj 
   * that matches
   */
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

  /**
   * Get the complete array of posts (Table of Contents)
   * Returns promise
   */
  var getToc = function() {
    var deferred = $q.defer()
      , tocPath = path + tocFile;
    
    if(toc !== undefined) {
      deferred.resolve(toc);
    } else {
      $http.get(tocPath).then(function(response) {
        toc = response.data.content;
        deferred.resolve(toc);
      });
    }

    return deferred.promise;
  };

  /**
   * Lookup the post data associated with given slug
   * Returns promise
   */
  var lookupSlug = function(slug) {
    var deferred = $q.defer();

    getToc().then(function(toc) {
      var post = findPostWith({"slug": slug}, toc);
      deferred.resolve(post);
    });

    return deferred.promise;
  };  

  /**
   * Lookup the post data associated with given index number
   * Returns promise
   */
  var lookupIndex = function(index) {
    var deferred = $q.defer();

    getToc().then(function(toc) {
      var post = toc[index];
      if(post !== undefined) {
        post.index = index;
      }
      deferred.resolve(post);
    });

    return deferred.promise;
  };

  /**
   * Get post matching criteria
   * Returns promise
   */
  var getPost = function(criteria) {
    var deferred = $q.defer()
      , key = Object.keys(criteria)[0]
      , value = criteria[key]
      , lookupMethod = lookupSlug;

    if(key === 'index') {
      lookupMethod = lookupIndex;
    }  

    lookupMethod(value).then(function(post) {
      if(post !== undefined) {
        post.contentPath = path + post.slug + contentFormat;
      }
      deferred.resolve(post);
    });

    return deferred.promise;
  };

  return {
    getPostBySlug: function(slug) {
      return getPost({"slug": slug});
    },
    getNewestPost: function() {
      return getPost({"index": 0});
    },
    getPostsList: function() {
      return getToc();
    },
    getNextPost: function(post) {
      return getPost({"index": post.index - 1});
    },
    getPrevPost: function(post) {
      return getPost({"index": post.index + 1});
    }
  };
    
}]);
