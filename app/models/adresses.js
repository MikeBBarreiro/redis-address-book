'use strict';

var Adress = require('../controllers/adresses');

function Adress(o, id){
  this.name    = o.name;
  this.color   = o.color;
  this.twitter = o.twitter;
  this.userId  = id;
}

Object.defineProperty(Adress, 'collection', {
  get: function(){return global.mongodb.collection('addresses');}
});

Adress.create = function(o, id, cb){
  var a = new Adress(o, id);
  Adress.collection.save(a, cb);
};

Adress.findAllByUserId = function(userId, cb){
  Adress.collection.find({userId:userId}).toArray(cb);
};

module.exports = Adress;
