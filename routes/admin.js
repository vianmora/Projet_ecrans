var express = require('express');
var app_admin = express();

var formidable = require('formidable');
var fs = require('fs');

var bodyParser = require('body-parser');
var path = require('path');

app_admin.use(bodyParser.json());
app_admin.use(bodyParser.urlencoded({ extended: false }));

app_admin.get('/', function(req, res, next) {
  res.render('Admin');
});

app_admin.route('/Nouveau-message')
  .get(function(req, res, next){
    res.render('Nouveau-message');
  })
  .post(function(req, res){
    res.render('Nouveau-message-success',  {POST : req.body});
  });

app_admin.route('/Nouvelle-page')
  .get(function(req, res, next){
    res.render('Nouvelle-page');
  })
  .post(function(req, res, next){
    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads');

    // every time a file has been uploaded successfully,
    // // rename it to it's orignal name
    form.on('file', function(field, file) {
      fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function(err) {
      console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
      res.render('Nouvelle-page-success');
    });

    // parse the incoming request containing the form data
    form.parse(req);

  });

module.exports = app_admin;
