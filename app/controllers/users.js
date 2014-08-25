'use strict';

var User = require('../models/users');

exports.init = function(req, res){
  res.render('users/init');
};

exports.create = function(req, res){
  User.register(req.body, function(err, user){
    if(user){
      res.redirect('/');
    }else{
      res.redirect('/register');
    }
  });
};

exports.login = function(req, res){
  console.log('looking into res.locals');
  console.log(res.locals);
  res.render('users/login');
};

exports.authenticate = function(req, res){
  User.authenticate(req.body, function(user){
    if(user){
//req.session.regenerate is just good practice for keeping safe from hack
      req.session.regenerate(function(){
        req.session.userId = user._id;
        req.session.save(function(){
          res.redirect('/');
        });
      });
    }else{
      res.redirect('/login');
    }
  });
};

exports.logout = function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
};


