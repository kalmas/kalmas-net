var page = require('webpage').create(),
  system = require('system'),
  url = system.args[1] || '',
  scriptTagRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  localhost = 'localhost:3000',
  realhost = 'kalmas.net';

var stripIt = function (html) {
  var stripped = html.replace(localhost, realhost);
  return stripped.replace(scriptTagRegex, '');
}

page.open(url, function(success) {
  setTimeout(function () {
    var html = page.evaluate(function () {
      return document.getElementsByTagName('html')[0].outerHTML;
    });
      
    console.log(stripIt(html));
    phantom.exit();
  }, 1000);
});