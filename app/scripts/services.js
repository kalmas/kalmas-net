'use strict';

var services = angular.module('kalmasNetApp.services', []);

/**
 * Blog Posts Service
 * Retrieves post content and meta data
 */
services.factory('BlogPosts', ['$http', '$q', function($http, $q) {
  var path = 'blog/content/',
    contentFormat = '.html',
    tocFile = 'toc.json',
    toc;

  /**
   * Given a criteria obj, return the first post obj 
   * that matches
   */
  var findPostWith = function(criteria, posts) {
    var key = Object.keys(criteria)[0],
      value = criteria[key],
      post;

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
    var deferred = $q.defer(),
    tocPath = path + tocFile;
    
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
      var post = findPostWith({'slug': slug}, toc);
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
    var deferred = $q.defer(),
      key = Object.keys(criteria)[0],
      value = criteria[key],
      lookupMethod = lookupSlug;

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
      return getPost({'slug': slug});
    },
    getNewestPost: function() {
      return getPost({'index': 0});
    },
    getPostsList: function() {
      return getToc();
    },
    getNextPost: function(post) {
      return getPost({'index': post.index - 1});
    },
    getPrevPost: function(post) {
      return getPost({'index': post.index + 1});
    }
  };
    
}]);


/**
 * Page Service
 * Service for sharing data about current page between controllers
 */
services.factory('Page', function() {
  var siteName = 'kalmas.net',
    pageName;

  return {
    setPageName: function(name) {
      pageName = name;
    },
    getTitle: function() {
      if(pageName === undefined) {
        return siteName;
      }
      return pageName + ' | ' + siteName;
    }
  };
});


/**
 * About Service
 */
services.factory('About', ['$http', '$q', function($http, $q) {
  var about;

  var fetchAbout = function() {
    var deferred = $q.defer(),
      aboutPath = 'blog/content/about.json';
    
    if(about !== undefined) {
      deferred.resolve(about);
    } else {
      $http.get(aboutPath).then(function(response) {
        about = response.data;
        deferred.resolve(about);
      });
    }

    return deferred.promise;
  };

  return {
    getAbout: function() {
      return fetchAbout();
    }
  };
}]);
