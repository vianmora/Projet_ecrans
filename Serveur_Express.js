var express = require ('express');
var bodyparser = require('body-parser');

/*créer un server vide*/
var app = express();

/*Utiliser le moteur de template ejs*/
app.set('view engine', 'ejs');

/*gérer les liens statics avec le middleware 'use' */
app.use('/assets' /*lien à appeler*/, express.static('assets' /*lien réel*/));

/*gérer les requète POST avec le middleware 'body-parser'*/
var urlencodedParser = bodyparser.urlencoded({ extended: false })

/*routing simple
app.get('/', function(req, res){
  res.send("Bienvenue sur ma page d'accueil hahaha");
});*/

/*router des pages avec paramètres
app.get('/profil/:name', function(req, res){
  res.send('bonjour, bienvenue sur ton profil' + req.params.name);
});*/

/*router des pages html
app.get('/', function(req, res){
  res.sendFile('/index.html');
});*/

/*router des pages avec le moteur de template*/
app.get('/Home', function(req, res){
  res.render('Home');
});

app.get('/', function(req, res){
  res.render('Home');
});

/* gérer la page contact avec des requète en query string et POST */
app.get('/contact', function(req, res){
  res.render('Contact', {qs:req.query});
});

app.post('/contact', urlencodedParser, function(req, res){
  if (!req.body) return res.sendStatus(400)
  res.render('Contact-success', {POST : req.body});
});

app.get('/profil/:city', function(req, res){
  var données = {pays : 'France', monnaie : 'euro'};
  res.render('Profil', {city : req.params.city, données : données});
});

/* ajout d'une condition 404 avec un middleware*/
app.use(function (req, res, next) {
      res.status(404).render('404');
})

app.listen (3000);

console.log("c'est bon, je t'écoute sur le port 3000");
