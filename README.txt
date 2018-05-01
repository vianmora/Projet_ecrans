Ce repertoire contient le code qui sera dipos sur le serveur auquel se connectera le Raspberry.

Les routes :

app.js : serveur principal
  |-- ecran.js : serveur pour afficher la page ecran
  |-- admin.js : serveur secondaire

fonctionnalités :

ecran.js :
  | -> affiche une page fixe défini par l'utilisateur. par défault, cette page affiche un simple message modifiable dans le menu app_admin

admin.js : permet de modifier la page écran
  | -> en modifiant le message envoyé. tous les messages sont stockés dans un fichier txt, précédé par leur date de création
  | -> en important sa propre page web static sous format zip
  | -> en réinitialisant la page originale
