'use strict';

var path = require('path');

exports.serveToRobots = function (snapshotPath) {

  return (function (req, res, next) {
    var fragment = req.query._escaped_fragment_;
    if (fragment === undefined) {
      return next();
    }

    if (fragment === '' || fragment === '/') {
      fragment = '/index.html';
    }

    if (fragment.charAt(0) !== '/') {
      fragment = '/' + fragment;
    }

    if (fragment.indexOf('.html') == -1) {
      fragment = fragment + '.html';
    }

    try {
      var file = path.join(snapshotPath, fragment);
      res.sendfile(file);
    } catch (err) {
      res.send(404);
    }
  });

};

