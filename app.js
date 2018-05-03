var logger = require('./modules.js/logger');
var serveur = require('./modules.js/serveur.js');

var port = 3000;

serveur.listen(port); // Ajout d'un port d'écoute pour la version en dévelopement

//petit message sympa ;)

console.log("c'est bon on t'écoute sur le port " + port.toString());

logger.info("début du log général, on écoute sur le port " + port.toString());
logger.silly("début du log précis en mode 'silly'");

/*dézippe
message simple
ajout d un log : winston
base de donnée pour stocker des messages*/
