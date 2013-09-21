//dependencies
var knox = require('knox');
var fs = require('fs');
var uuid = require('node-uuid');
var imageData = require('../app/controllers/ImageData.js');

module.exports.helper = {
  //send response statusCode and body
  write: function(req, res, statusCode, body) {
    res.writeHead(statusCode, responseHeaders);
    res.end(body);
  },

  //configure AWS client
  awsClient: function() {
    return knox.createClient({
      key: process.env.AWS_ACCESS_KEY,
      secret: process.env.AWS_SECRET_KEY,
      bucket: process.env.AWS_BUCKET
    });  
  },

  //upload requested image to to s3 bucket
  upload: function(req, res, path, prefix, key) {
    var data = '';
    var readStream = fs.createReadStream(path);

    readStream.on('data', function(chunk) {
      data += chunk;
    });

    readStream.on('close', function() {
      var req = client.put(prefix + '/' + key, {
        'Content-Length': data.length,
        'Content-Type': 'image/jpeg',
        'x-amz-acl': 'public-read'
      });

      req.end(data);
      addToDb(req, res, key);
    });
  },

  //delete requested image from s3 bucket
  //when s3 response has ended
  deleteFromS3: function(req, res) {
    var s3del = client.del(req.key);

    s3del.on('response', function(res) {
      res.on('error', function(err) {
        console.error('</3');
        throw err;
      });
    });

    s3del.end();
  },


  //delete requested image from local fs
  //if the file exists
  deleteFromFs: function(req, res) {
    fs.exists(process.env.LOCAL_FILE_PATH + '/' + req.key + '.jpg', function(exists) {
      if (exists) {
        fs.unlink(process.env.LOCAL_FILE_PATH + '/' + req.key + '.jpg', function(err) {
          if (err) {
            console.error('</3');
            throw err;
          }
        });
      }
    }); 
  }
};

//CORS
var responseHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

//store s3 key in db 
var addToDb = function(req, res, key) {
  var imgKey = imageData.imageData(key);

  response(req, res, imgKey.key);
};

//send response object
var response = function(req, res, key) {
  var response = {};

  response.createdAt = new Date();
  response.imgId = key;

  res.writeHead(200, responseHeaders);
  res.end(JSON.stringify(response));
};

var client = knox.createClient({
  key: process.env.AWS_ACCESS_KEY,
  secret: process.env.AWS_SECRET_KEY,
  bucket: process.env.AWS_BUCKET
});


