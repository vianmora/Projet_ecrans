var express = require('express');
var app_admin = express();

app_admin.get('/', function(req, res, next) {
  res.render('Admin');
});

app_admin.get('/Nouveau-message', function(req, res, next){
  res.render('Nouveau-message');
});

app_admin.post('/Nouveau-message', function(req, res){
  res.render('Nouveau-message-success',  {POST : req.body});
});

module.exports = app_admin;
