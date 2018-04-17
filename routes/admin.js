var express = require('express'),
    formidable = require('formidable'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    path = require('path');

var app_admin = express();

app_admin.use(bodyParser.json());
app_admin.use(bodyParser.urlencoded({ extended: false }));

app_admin.get('/', function(req, res, next) {
  res.render('Admin');
});

app_admin.route('/Nouveau-message') // Pour changer simplement le message de la pae d'accueil
  .get(function(req, res, next){
    res.render('Nouveau-message');
  })
  .post(function(req, res){
    console.log(req.body.new_message);
    global.message = req.body.new_message;
    res.render('Nouveau-message-success',  {POST : req.body});
  });

app_admin.route('/Nouvelle-page') // Pour importer une nouvelle page écran
  .get(function(req, res, next){
    res.render('Nouvelle-page');
  })
  .post(function(req, res, next){
    // create an incoming form object
    var form = new formidable.IncomingForm();

    // L'utilisateur peut importer plusieurs fichiers d'un coup
    form.multiples = true;

    // enregistrer les uploads dans le fichier /uploads
    form.uploadDir = path.join(__dirname, '/uploads');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
      fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function(err) {
      console.log('An error has occured: \n' + err);
    });

    // parse the incoming request containing the form data
    form.parse(req, (err, fields, files) => {
      console.log("ok, file uploaded");
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
      res.render('Nouvelle-page-success');
    });


  });

module.exports = app_admin;
