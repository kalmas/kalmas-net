'use strict';

angular.module('kalmasNetApp.services', [])
    .factory("BlogPosts", ['$http', '$q', function($http, $q) {
  var path = 'content/'
      , metaFormat = '.json'
      , contentFormat = '.html';

  return {
    getPost: function(slug) {
      var deferred = $q.defer()
        , metaPath = path + slug + metaFormat
        , contentPath = path + slug + contentFormat;
      $http.get(metaPath).then(function(response) {
        response.data.contentPath = contentPath;
        deferred.resolve(response.data);
      });
      return deferred.promise;
    }
  };
    
}]);


