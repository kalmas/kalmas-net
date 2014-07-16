'use strict';

// Module dependencies.
var express = require('express'),
  app = express();

// Express Configuration
require('./lib/config/express')(app);

// Controllers
var index = require('./lib/controllers');

// Angular Routes
app.get('/partials/*', index.partials);
app.get('/*', index.index);

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});

// Expose app
exports = module.exports = app;