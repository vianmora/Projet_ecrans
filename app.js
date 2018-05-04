var logger = require('./modules.js/logger');
var serveur = require('./modules.js/serveur.js');

var port = 3000;

serveur.listen(port); // Ajout d'un port d'écoute pour la version en dévelopement

//petit message sympa ;)

console.log("c'est bon on t'écoute sur le port " + port.toString());

<<<<<<< HEAD
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
=======
logger.info("début du log général, on écoute sur le port " + port.toString());
logger.silly("début du log précis en mode 'silly'");
>>>>>>> 1d8db3d8c857384c985e9f76e9c88ebc2cdaa49f

/*dézippe
message simple
ajout d un log : winston
base de donnée pour stocker des messages*/
