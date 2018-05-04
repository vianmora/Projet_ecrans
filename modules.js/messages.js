var fs = require('fs');

var messages_liste = [
  {
    "date":"2018-05-03T19:32:42.967Z",
    "texte":"prendre son temps est le meilleur moyen de n'en pas perdre _ Nicolas Bouvier"
  }
];

var modifier_JSON = function (texte, size){

  var date = new Date();

  var message = JSON.parse(fs.readFileSync('./messages_JSON/Message.JSON', 'UTF-8'));

  i = message.numero;

  /*messages_liste[size] = {
    date : date,
    texte : texte
  };*/

  fs.copyFileSync('./messages_JSON/Message.JSON', './messages_JSON/Message_' + i +'.JSON');
  console.log(i);

  var message = JSON.parse(fs.readFileSync('./messages_JSON/Message.JSON', 'UTF-8'));

  message.date = date;
  message.numero = i+1;
  message.texte = texte;

  chaine = JSON.stringify(message);
  fs.writeFileSync('./messages_JSON/Message.JSON', chaine, 'UTF-8');
};

var size = messages_liste.length;

module.exports = modifier_JSON;
