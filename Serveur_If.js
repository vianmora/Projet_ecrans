-var http = require ('http');
var fs = require ('fs');

/* serveur simple */

var server = http.createServer(function (req, res) {
  console.log('request was made from :' + req.url);

  /* écrire du texte
  res.writeHead (200, {'content-Type' : 'text/plain'});
  res.end ('Salut toi !!'); */

  /*écrire du HTML
  res.writeHead (200, {'content-Type' : 'text/html'});
  res.end ("<p> Salut toi, j'ecris dans un paragraphe HTML</p>");*/

  /*Streamer des données : res est en réalité un stream éditable
  res.writeHead (200, {'content-Type' : 'text/html'});
  var MyReadStream = fs.createReadStream (__dirname + '/pages/Home.ejs')
  MyReadStream.pipe(res);*/

  /* Les Objets JSON
  res.writeHead (200, {'content-Type' : 'application/json'});
  var Villes = {
    Nom : 'Marseille',
    Departement : 'Bouches du Rhône',
    NbHabitant : 861635
  };
  var Villes_String = JSON.stringify(Villes);
  res.end (Villes_String);
  console.log('format string : ' + Villes_String);
  console.log('autre format JSON');
  console.log(JSON.parse(Villes_String)); */

  /* Routing */

  if (req.url === '/' || req.url === '/Home'){
    res.writeHead (200, {'content-Type' : 'text/html'});
    var MyReadStream = fs.createReadStream (__dirname + '/views/Home.ejs')
    MyReadStream.pipe(res);
  }

  else if (req.url === '/Contact'){
    res.writeHead (200, {'content-Type' : 'text/html'});
    var MyReadStream = fs.createReadStream (__dirname + '/views/Contact.ejs')
    MyReadStream.pipe(res);
  }

  else if (req.url === '/Mes_villes'){
    res.writeHead (200, {'content-Type' : 'application/json'});
    var Villes = [{Nom : 'Marseille', Departement : 'Bouches du Rhône', NbHabitants : 861635},
                  {Nom : 'Paris', Departetment : 'Ile-de-France', NbHabitants : 2229621}];

    res.end(JSON.stringify(Villes));
  }

  else{
    res.writeHead (200, {'content-Type' : 'text/html'});
    var MyReadStream = fs.createReadStream (__dirname + '/views/404.ejs')
    MyReadStream.pipe(res);
  }

});

server.listen (3000, '127.0.0.1');
console.log("c'est bon, je t'écoute sur le port 3000");
