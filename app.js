var logger = require('./modules.js/logger');
var app = require('./modules.js/serveur.js');


app.listen (3000); // Ajout d'un port d'écoute pour la version en dévelopement

console.log("c'est bon, je t'écoute sur le port 3000"); //petit message sympa ;)*

logger.info("début du log général, on écoute sur le port 3000");
logger.silly("début du log précis en mode 'silly'");


/*dézippe
message simple
ajout d un log : winston
base de donnée pour stocker des messages*/
