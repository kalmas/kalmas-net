var page = require('webpage').create(),
  system = require('system'),
  url = system.args[1] || '';

page.open(url, function(success) {
  setTimeout(function () {
    var html = page.evaluate(function () {
      return document.getElementsByTagName('html')[0].outerHTML;
    });
      
    console.log(html);
    phantom.exit();
  }, 1000);
});