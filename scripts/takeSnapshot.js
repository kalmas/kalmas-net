var page = require('webpage').create(),
  system = require('system'),
  url = system.args[1] || '',
  scriptTagRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

var stripScriptTags = function (html) {
  return html.replace(scriptTagRegex, '');
}

page.open(url, function(success) {
  setTimeout(function () {
    var html = page.evaluate(function () {
      return document.getElementsByTagName('html')[0].outerHTML;
    });
      
    console.log(stripScriptTags(html));
    phantom.exit();
  }, 1000);
});