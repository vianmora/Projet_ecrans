var fs = require('fs');

var modifier_JSON = function (texte){

  var fichier = './Messages.JSON';
  //fs.writeFileSync("Messages.JSON",'hey', "UTF-8");
  i = 0;
  
  var date = new Date();

  var message = JSON.parse(fs.readFileSync(fichier, 'UTF-8'));

  message.date = date;
  message.texte = texte;

  console.log(message);

  chaine = JSON.stringify(message);
  fs.writeFileSync(fichier, chaine, 'UTF-8');
};



module.exports = modifier_JSON;
