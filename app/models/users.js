'use strict';

var bcrypt = require('bcrypt'),
    Mongo  = require('mongodb');

function User(a){
  this.name = a.name;
  this.color = a.color;

}

Object.defineProperty(User, 'collection', {
  get: function(){return global.mongodb.collection('users');}
});

User.register = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(user){return cb();}
    console.log(o);
//bcrypt , this is the pass protection in makes a hash, a one way incryption
    o.password = bcrypt.hashSync(o.password, 10);
    User.collection.save(o, cb);
  });
};

User.authenticate = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(!user){return cb();}
    var isOk = bcrypt.compareSync(o.password, user.password);
    if(!isOk){return cb();}

    cb(user);
  });
};

User.all = function(cb){
  User.collection.find().toArray(cb);
};

User.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  User.collection.findOne({_id:_id}, cb);
};
module.exports = User;

