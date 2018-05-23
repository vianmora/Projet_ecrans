/* import de modules */

var express = require ('express'); // Pour créer un serveur de type Express
var fs = require('fs'); //traitement des fichiers
var bodyparser = require('body-parser'); // Pour récupérer les données envoyées de page en page
var path = require('path'); //outils de gestion des chemins

var logger = require('./logger'); //logger : winston

/* variables utiles */

var message = JSON.parse(fs.readFileSync('./messages_JSON/Message.JSON', 'UTF-8'));
var ecran = path.join(__dirname,'..', 'static/uploads/index.html');

/* Le serveur en lui même*/

var app = express(); // créer un server vide

app.set('view engine', 'ejs'); // Utiliser le moteur de template ejs

// récupérer les données
app.use(bodyparser.urlencoded({ extended: false }));

// les liens static
app.use('/assets' /*lien à appeler*/, express.static('assets' /*lien réel*/));
//app.use('/static' /*lien à appeler*/, express.static('static' /*lien réel*/));

app.get('/', function(req, res){
  res.render('home');
});

app.get('/Page-message', function(req, res){
  res.render('message-page', {message : message.texte});
});

app.get('/Page-ecran', function(req, res){
  res.sendFile(ecran);
});

/* Utiliser un sous-serveur pour les routes admins */

var serveur_admin = require('./routes_admin');

app.use('/page-admin', serveur_admin);

/* insertion du log dans la console à chaque appel */

app.use(function(req, res, next) {
    logger.debug("url: " + req.originalUrl);
    next();
})

/* La condition 404 */
app.use(function (req, res, next) {
  logger.info("404 for: " + req.originalUrl); //log spécifique pour le 404
  res.status(404).render('404');
});



module.exports = app;
