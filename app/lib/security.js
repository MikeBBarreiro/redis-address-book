'use strict';

var User = require('../models/users');

// authentication step
exports.authenticate = function(req, res, next){
  console.log('Looking into session');
  console.log(req.session);
  if(req.session.userId){
    User.findById(req.session.userId, function(err, user){
      console.log(user);
      res.locals.user = user;
      next();
    });
  }else{
    next();
  }
};

//this only allways somone who is loged to see this page
exports.bounce = function(req, res, next){
  if(res.locals.user){
    next();
  }else{
    res.redirect('/login');
  }
};
