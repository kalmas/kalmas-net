var exec = require('child_process').exec,
  fs = require('fs'),
  path = require('path'),
  contentDir = path.join(__dirname, '../app/blog/content'),
  snapshotsDir = path.join(contentDir, 'snapshots'),
  blogTocFile = path.join(contentDir, 'toc.json'),
  blogToc = JSON.parse(fs.readFileSync(blogTocFile)),
  host = 'http://localhost:9000'
  staticPages = [
  	{ path: '/', file: 'index.html'}
  ];

var saveMarkup = function (url, file) {
  exec('phantomjs takeSnapshot.js ' + url, function (error, stdout, stderr) {
    var wstream = fs.createWriteStream(file);
	wstream.write(stdout);
  });
};

blogToc.content.forEach(function (post) {
  var url = host + '/blog/' + post.slug,
  	file = snapshotsDir + '/blog/' + post.slug + '.html';
  
  saveMarkup(url, file);
});

staticPages.forEach(function (page) {
  var url = host + page.path,
  	file = snapshotsDir + '/' + page.file;
  
  saveMarkup(url, file);
});



