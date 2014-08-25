'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    less           = require('less-middleware'),
//cookie////////////////
    session        = require('express-session'),
    security       = require('../lib/security'),
    RedisStore     = require('connect-redis')(session),
////////////////////////
    home           = require('../controllers/home'),
    users          = require('../controllers/users'),
    adresses       = require('../controllers/adresses');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(less(__dirname + '/../static'));
  app.use(function(req, res, next){
    console.log('I am right befor the static directory');
    next();
  });
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());
//cookie
  app.use(session({store:new RedisStore(),
    secret:'keyboard cat',
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge:null}
  }));


  app.use(security.authenticate);
  app.get('/', home.index);

  app.get('/register', users.init);
  app.post('/register', users.create);
  app.get('/login', users.login);
  app.post('/login', users.authenticate);
  app.get('/logout', users.logout);

//this only allways somone who is loged to see this page
  app.use(security.bounce);

  app.delete('/logout', users.logout);
  app.get('/adresses', adresses.index);
  app.post('/adresses', adresses.create);
  app.get('/adresses/new', adresses.init);

  console.log('Express: Routes Loaded');
};

