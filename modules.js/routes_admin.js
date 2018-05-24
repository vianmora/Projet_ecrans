var express = require('express'),
    formidable = require('formidable'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    path = require('path');
    unzip = require('unzip');

var outils_messages = require('./messages.js');
var app_admin = express();

app_admin.use(bodyParser.json());
app_admin.use(bodyParser.urlencoded({ extended: false }));

app_admin.get('/', function(req, res, next) {
  res.render('a_admin');
});

// décommenter si le fichier n'est pas encore créé
//fs.writeFileSync("./messages_JSON/Messages.JSON", '{"date":"2018-05-03T17:57:51.888Z","texte":"Prendre son temps est le meilleur moyen de ne pas en perdre _ Nicolas Bouvier"}', 'UTF-8');


app_admin.route('/Nouveau-message') // Pour changer simplement le message de la pae d'accueil
  .get(function(req, res, next){
    res.render('a_new-message');
  })
  .post(function(req, res){
    outils_messages.add_new_message(req.body.new_message);
    res.render('a_new-message-success',  {POST : req.body});
  });

app_admin.route('/Nouvelle-page') // Pour importer une nouvelle page écran
  .get(function(req, res, next){
    res.render('a_new-screen-page');
  })
  .post(function(req, res, next){
    // Lorsqu'un fichier est uploadé:
    // On crée un nouveau recepteur formidable (tableau de fichier)
    var form = new formidable.IncomingForm();

    // L'utilisateur peut importer plusieurs fichiers d'un coup
    form.multiples = false;

    // Enregistrer les uploads dans le fichier /uploads
    form.uploadDir = path.join(__dirname, '..', '/static/uploads');

    // On renomme chaque fichier reçu avec son nom originel
    // A l'origine il a un nom du type "Upload029192..."
    form.on('file', function(field, file) {
      //fs.rename(file.path, path.join(form.uploadDir, file.name));
      fs.renameSync(file.path, path.join(form.uploadDir, '/index.html'));
    });

    // informer en cas d'erreur
    form.on('error', function(err) {
      console.log('An error has occured: \n' + err);
    });

    // On décode la requète contenant les fichiers et on l'upload avec form
    form.parse(req);

    // une fois que le fichier a été enregistré, on envoie une page réponse au client
    form.on('end', function() {
      res.render('a_new-screen-page-success');
    });


  });

  app_admin.route('/zip') // Pour importer une nouvelle page écran
    .get(function(req, res, next){
      res.render('a_new-zip-file');
    })
    .post(function(req, res, next){
      // Lorsqu'un fichier est uploadé:
      // On crée un nouveau recepteur formidable (tableau de fichier)
      var form = new formidable.IncomingForm();

      // L'utilisateur peut importer plusieurs fichiers d'un coup
      form.multiples = false;

      // Enregistrer les uploads dans le fichier /uploads
      form.uploadDir = path.join(__dirname, '..', '/static/archives');

      // On renomme chaque fichier reçu avec son nom originel
      // A l'origine il a un nom du type "Upload029192..."
      form.on('file', function(field, file) {
        //fs.rename(file.path, path.join(form.uploadDir, file.name));
        fs.renameSync(file.path, path.join(form.uploadDir, '/archive.zip'));
      });

      // informer en cas d'erreur
      form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
      });

      // On décode la requète contenant les fichiers et on l'upload avec form
      form.parse(req);

      // une fois que l'archive a été uploadé, on la dézippe et on envoie une page de réponse
      form.on('end', function() {
        var readStream = fs.createReadStream(path.join(__dirname, '..', '/static/archives/archive.zip'));
        readStream.pipe(unzip.Extract({ path: path.join(__dirname, '..', '/static/uploads')}));
        res.render('a_new-screen-page-success');
      });

    });

app_admin.get('/Reinitialisation', function(req, res, next) {
  fs.copyFileSync(path.join(__dirname, '..', '/static/uploads/index0.html'), path.join(__dirname, '..', '/static/uploads/index.html'));
  res.render('a_new-screen-page-success');
});

app_admin.get('/historique_messages', function(req, res, next){

  if (req.query.reinit === "1"){
    outils_messages.reinit_history();
  };

  var dernier_message = JSON.parse(fs.readFileSync('./messages_JSON/Message.JSON', 'UTF-8'));
  var nb_message = dernier_message.numero;

  var tab = [];

  for (var i=0; i<nb_message; i++){
    var fichier_JSON = JSON.parse(fs.readFileSync('./messages_JSON/Message_' + i + '.JSON', 'UTF-8'));
    tab[i] = fichier_JSON;
  };

  tab[nb_message] =  dernier_message;

  res.render('a_historique', {messages : tab} );
});

module.exports = app_admin;
