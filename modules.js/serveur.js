var express = require ('express'); // Pour créer un serveur de type Express
var fs = require('fs');
var bodyparser = require('body-parser'); // Pour récupérer les données envoyées de page en page
var logger = require('./logger');

/* Le serveur en lui même*/

var app = express(); // créer un server vide

app.set('view engine', 'ejs'); // Utiliser le moteur de template ejs

// récupérer les données
app.use(bodyparser.urlencoded({ extended: false }));

// les liens static
app.use('/assets' /*lien à appeler*/, express.static('assets' /*lien réel*/));

app.get('/', function(req, res){
  res.render('home');
});

app.get('/Page-message', function(req, res){
  var message = JSON.parse(fs.readFileSync('./Messages.JSON', 'UTF-8'));
  console.log(message);
  res.render('message-page', {message : message.texte});
});

/*app.get('/Page-ecran', function(req, res){
  res.render('screen-page');
});*/

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
