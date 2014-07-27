/*
 * PhantomJS script to render a url and dump the final html to a file
 *
 * E.G.
 * phantom takeSnapshot.phantom.js http://localhost:9000
 */
var page = require('webpage').create(),
  system = require('system'),
  url = system.args[1];

// strip the script
var stripIt = function (html) {
  var scriptTagRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  return html.replace(scriptTagRegex, '');
}

page.open(url, function(success) {
  setTimeout(function () {
    var html = page.evaluate(function () {
      return document.getElementsByTagName('html')[0].outerHTML;
    });

    // send rendered html to console
    console.log(stripIt(html));
    phantom.exit();
  }, 2000);
});