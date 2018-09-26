var firebase = require('firebase');
var { assign } = require('lodash');

var config = require('../config/app');

firebase.initializeApp({
  apiKey: config.db.firebase.FIREBASE_API_KEY,
  authDomain: config.db.firebase.FIREBASE_AUTH_DOMAIN,
  databaseURL: config.db.firebase.FIREBASE_DB_URL,
  projectId: config.db.firebase.FIREBASE_PROJECT_ID,
  storageBucket: config.db.firebase.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.db.firebase.FIREBASE_MESSANGING_SENDER_ID
});

var exports = module.exports = {};

exports.getEntities = function(path){
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref(path);
    ref.once('value').then(function(snapshot) {
    	var value = snapshot.val();
      resolve(value);
    });
  });
}

exports.updateEntity = function(path, entity){
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref(path);
    ref.once('value').then(function(snapshot) {
      var data = snapshot.val();
      var merge = assign(data, entity);
      ref.update(merge);
      resolve(merge);
    });
  });
}

exports.createEntity = function(entity){
  if(!entity.type || !entity.path || !entity.input){
    return false;
  }
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref(entity.path);
    var newRef = ref.child(entity.input.id).set(entity.input);
    resolve(entity.input);
  });
}

exports.deleteEntity = function(path){
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref(path);
    ref.once('value').then(function(snapshot) {
      var data = snapshot.val();
      if(data){
        ref.remove();
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}
