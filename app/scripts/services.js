'use strict';

angular.module('kalmasNetApp.services', [])
    .factory("BlogPosts", ['$http', '$q', function($http, $q) {
  var path = 'content/'
      , metaFormat = '.json'
      , contentFormat = '.html'
      , tocFile = 'toc.json';

  var findPost = function(criteria, toc) {
    var key = Object.keys(criteria)[0]
      , value = criteria[key];

    for (var i = 0; i < toc.length; i++) {
      if(toc[i][key] === value){
        return toc[i];
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

  var getPostMetadata = function(slug) {
    var deferred = $q.defer();

    getToc().then(function(toc) {
      var post = findPost({"slug": slug}, toc.content);
      post.contentPath = path + slug + contentFormat;
      deferred.resolve(post);
    });

    return deferred.promise;
  };  

  return {
    getPost: function(slug) {
      var deferred = $q.defer();

      getPostMetadata(slug).then(function(metadata) {
        deferred.resolve(metadata);
      });

      return deferred.promise;
    },
    getToc: function(slug) {}
  };
    
}]);
