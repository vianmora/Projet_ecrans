Ce repertoire contient le code qui sera dipos sur le serveur auquel se connectera le Raspberry.

Les routes :

app.js : application principale qui utilise les sous-serveurs et modules annexes de modules_js
  |-- routes_admin.js : serveur pour gérer la page admin
  |-- serveur.js : routes principales utilisées par la Page
  |-- messages.js : quelques fonctions pour gérer la page message du jour
  |-- logger.js : logger winston utilisé par le projet

fonctionnalités :

du serveur principal :
  | -> afficher une page avec un message du jour
  | -> affiche une page html fixe défini par l'utilisateur.

du serveur admin : permet de modifier les données utilisées par le serveur principal
  | -> en modifiant le message du jour. tous les messages sont stockés dans des fichier JSON
  | -> en important sa propre page web static sous format zip
  | -> en réinitialisant la page originale
  | -> en consultant l'historique des messages envoyés
