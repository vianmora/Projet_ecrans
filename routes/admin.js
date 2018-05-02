var express = require('express'),
    formidable = require('formidable'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    path = require('path');

var app_admin = express();

global.message = '"Prendre son temps est le meilleur moyen de ne pas en perdre _ Nicolas Bouvier"';

app_admin.use(bodyParser.json());
app_admin.use(bodyParser.urlencoded({ extended: false }));

app_admin.get('/', function(req, res, next) {
  res.render('a_admin');
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
    // Lorsqu'un fichier est uploadé:
    // On crée un nouveau recepteur formidable (tableau de fichier)
    var form = new formidable.IncomingForm();

    // L'utilisateur peut importer plusieurs fichiers d'un coup
    form.multiples = false;

    // Enregistrer les uploads dans le fichier /uploads
    form.uploadDir = path.join(__dirname, '..', '/views');

    // On renomme chaque fichier reçu avec son nom originel
    // A l'origine il a un nom du type "Upload029192..."
    form.on('file', function(field, file) {
      //fs.rename(file.path, path.join(form.uploadDir, file.name));
      fs.rename(file.path, path.join(form.uploadDir, 'uploads/salut.html'));
    });

    // informer en cas d'erreur
    form.on('error', function(err) {
      console.log('An error has occured: \n' + err);
    });

    // parse the incoming request containing the form data
    form.parse(req);

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
      res.render('Nouvelle-page-success');
    });


  });

app_admin.get('/Reinitialisation', function(req, res, next) {
  fs.copyFile(path.join(__dirname, '..', '/views/page-ecran0.ejs'), path.join(__dirname, '..', '/views/page-ecran.ejs'), (err) => {
    if (err) throw err;
    console.log("file copied");
  });
  res.render('page-ecran-restaure');
});

module.exports = app_admin;
