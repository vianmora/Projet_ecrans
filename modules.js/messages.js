var fs = require('fs');

var modifier_JSON = function (texte){

  var date = new Date();

  var fichier = JSON.parse(fs.readFileSync('./messages_JSON/Message.JSON', 'UTF-8'));
  i = fichier.numero;

  fs.copyFileSync('./messages_JSON/Message.JSON', './messages_JSON/Message_' + i +'.JSON');
  console.log(i);

  var message = JSON.parse(fs.readFileSync('./messages_JSON/Message.JSON', 'UTF-8'));

  message.date = date;
  message.numero = i+1;
  message.texte = texte;

  chaine = JSON.stringify(message);
  fs.writeFileSync('./messages_JSON/Message.JSON', chaine, 'UTF-8');
};

module.exports = modifier_JSON;
