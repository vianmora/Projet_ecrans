var fs = require('fs');

var modifier_JSON = function (texte){

  var date = new Date();

  var message = JSON.parse(fs.readFileSync('./messages_JSON/Message.JSON', 'UTF-8'));

  var i = message.numero;

  fs.copyFileSync('./messages_JSON/Message.JSON', './messages_JSON/Message_' + i +'.JSON');

  var message = JSON.parse(fs.readFileSync('./messages_JSON/Message.JSON', 'UTF-8'));

  message.date = date;
  message.numero = i+1;
  message.texte = texte;

  chaine = JSON.stringify(message);
  fs.writeFileSync('./messages_JSON/Message.JSON', chaine, 'UTF-8');
};

var reinit_history = function (){
  var dernier_message = JSON.parse(fs.readFileSync('./messages_JSON/Message.JSON', 'UTF-8'));
  var nb_messages = dernier_message.numero;
  for (var i=0 ; i<nb_messages ; i++){
    fs.unlinkSync('./messages_JSON/Message_' + i +'.JSON');
  };
  dernier_message.numero = 0;
  chaine = JSON.stringify(dernier_message);
  fs.writeFileSync('./messages_JSON/Message.JSON', chaine, 'UTF-8');
};

module.exports = {
  add_new_message : modifier_JSON,
  reinit_history : reinit_history
};
