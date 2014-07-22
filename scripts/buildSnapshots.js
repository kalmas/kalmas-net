/*
 * JS script to render completed markup and write it to a file so
 * we can serve it to robots.
 *
 * node buildSnapshots.js
 */
var exec = require('child_process').exec,
  fs = require('fs'),
  path = require('path'),
  contentDir = path.join(__dirname, '../app/content'),
  snapshotsDir = path.join(contentDir, 'snapshots'),
  blogTocFile = path.join(contentDir, 'blog/toc.json'),
  blogToc = JSON.parse(fs.readFileSync(blogTocFile)),
  host = 'http://localhost:9000'
  staticPages = [
  	{ path: '/', file: 'index.html'}
  ];

if(!fs.existsSync(snapshotsDir)){
  fs.mkdirSync(snapshotsDir);
}

if(!fs.existsSync(path.join(snapshotsDir, 'blog'))){
  fs.mkdirSync(path.join(snapshotsDir, 'blog'));
}

/*
 * Call our handy phantom script, which will dump rendered html to the console
 */
var saveMarkup = function (url, file) {
  exec('phantomjs ' + __dirname + '/takeSnapshot.phantom.js ' + url, function (error, stdout, stderr) {
    var wstream = fs.createWriteStream(file);
	  wstream.write(stdout);
  });
};

/*
 * Render each blog post
 */
blogToc.content.forEach(function (post) {
  var url = host + '/blog/' + post.slug,
  	file = snapshotsDir + '/blog/' + post.slug + '.html';
  
  saveMarkup(url, file);
});

/*
 * Render the static pages (i.e. the index
 */
staticPages.forEach(function (page) {
  var url = host + page.path,
  	file = snapshotsDir + '/' + page.file;
  
  saveMarkup(url, file);
});



