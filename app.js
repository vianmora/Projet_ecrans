var express = require ('express'); // Pour créer un serveur de type Express
var bodyparser = require('body-parser'); // Pour récupérer les données envoyées de page en page

var app = express(); // créer un server vide

app.set('view engine', 'ejs'); // Utiliser le moteur de template ejs

/* Paramétrer les middlewares */
// les liens static
app.use('/assets' /*lien à appeler*/, express.static('assets' /*lien réel*/));
// récupérer les données
app.use(bodyparser.urlencoded({ extended: false }));

var admin = require('./routes/admin');

global.message = '"Prendre son temps est le meilleur moyen de ne pas en perdre _ Nicolas Bouvier"';

/* premier routage */

/*router des pages avec le moteur de template*/
app.get('/Home', function(req, res){
  res.render('Home');
});

app.get('/', function(req, res){
  res.render('Home');
});

app.get('/Page-ecran', function(req, res){
  res.render('page-ecran', {message : global.message});
});


/* gérer la page contact avec des requète en query string et POST */

app.route('/contact')
  .get(function(req, res){
    res.render('Contact');
  })
  .post(function(req, res){
    if (!req.body) return res.render('Contact', {qs:req.query});
    res.render('Contact-success', {POST : req.body});
  });

/* routage parallèle pour la page admin*/
app.use('/Page-admin', admin);

/* ajout d'une condition 404 avec un middleware*/
app.use(function (req, res, next) {
      res.status(404).render('404');
});

app.listen (3000); // Ajout d'un port d'écoute pour la version en dévelopement

console.log("c'est bon, je t'écoute sur le port 3000"); //petit message sympa ;)
