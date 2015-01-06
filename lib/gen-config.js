var request = require('request'),
  fs = require('fs'),
  config = require('./config');

config.FEED_LIST.forEach(function(feed) {
  request(feed.url).pipe(fs.createWriteStream('config-' + feed.name + '.json'));
});
