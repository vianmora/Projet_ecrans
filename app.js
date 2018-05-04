var express = require ('express'); // Pour créer un serveur de type Express
var bodyparser = require('body-parser'); // Pour récupérer les données envoyées de page en page

var app = express(); // créer un server vide

app.set('view engine', 'ejs'); // Utiliser le moteur de template ejs

/* Paramétrer les middlewares */

// les liens static
app.use('/assets' /*lien à appeler*/, express.static('assets' /*lien réel*/));

// récupérer les données
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/', function(req, res){
  res.render('Home');
});

app.get('/Page-message', function(req, res){
  res.render('message-page');
});

app.get('/Page-ecran', function(req, res){
  res.render('screen-page');
});

var app_admin = require('./routes/admin');
app.use('/page-admin', app_admin);

/* ajout d'une condition 404 avec un middleware*/
app.use(function (req, res, next) {
      res.status(404).render('404');
});

app.listen (3000); // Ajout d'un port d'écoute pour la version en dévelopement

console.log("c'est bon, je t'écoute sur le port 3000"); //petit message sympa ;)*

/*dézippe
message simple
ajout d un log : winston
base de donnée pour stocker des messages*/
