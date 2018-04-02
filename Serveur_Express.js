var express = require ('express');

/*créer un server vide*/
var app = express();

/*Utiliser le moteur de template ejs*/
app.set('view engine', 'ejs');
  
/*gérer les liens statics avec le middleware 'use' */
app.use('/assets' /*lien à appeler*/, express.static('assets' /*lien réel*/));

/*routing simple
app.get('/', function(req, res){
  res.send("Bienvenue sur ma page d'accueil");
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

app.get('/contact', function(req, res){
  res.render('Contact');
});

app.get('/contact-success', function(req, res){
  res.render('Contact-success');
});

app.get('/profil/:city', function(req, res){
  var données = {pays : 'France', monnaie : 'euro'};
  res.render('Profil', {city : req.params.city, données : données});
});

app.listen (3000);

console.log("c'est bon, je t'écoute sur le port 3000");
