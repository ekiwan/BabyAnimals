// Dependencies
var path = require('path'),
  mongoose = require('mongoose'),
  cronJob = require('cron').CronJob,
  removefileforce = require('./removefileforce'),
  rootPath = path.join('/tmp/uploads/');

// Remove all files from image folder
// Currently inactive
module.exports = function(app, config) {
  var job = new cronJob('* * * * *', function() {
    removefileforce(rootPath);
  }, function() {
    console.log('cron job stopped');
  });

  job.start();
};

