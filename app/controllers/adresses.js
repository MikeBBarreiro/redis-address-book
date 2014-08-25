'use strict';

var Address = require('../models/adresses');

exports.index = function(req, res){
  Address.findAllByUserId(res.locals.user._id, function(err, adresses){
    res.render('addresses/index', {adresses:adresses});
  });
};

exports.init = function(req, res){
  res.render('addresses/init');
};

exports.create = function(req, res){
  Address.create(req.body, res.locals.user._id, function(){
    res.redirect('/addresses');
  });
};
