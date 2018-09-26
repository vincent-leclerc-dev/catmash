var { filter, map, head } = require('lodash');
var { createEntity, getEntities, updateEntity, deleteEntity
} = require('../common/firebase');

const TYPE_CAT = 'cat';

exports.createCat = function(input){
  let entity = {
    type: TYPE_CAT,
    path:'cats',
    input: input
  };
  return createEntity(entity).then(function(data){
    return data;
  });
}

exports.readCat = function(id) {
  return getEntities('cats').then(function(data){
    var coll = map(data, function(value) {
      return value;
    });
    var filtered = filter(coll, { 'id' : id });
    return head(filtered);
  });
}

 exports.updateCat = function(id, input) {
  return updateEntity('cats/'+id, input).then(function(data){
    return data;
  });
}

 exports.deleteCat = function(id) {
  return deleteEntity('cats/'+id).then(function(result){
    return result;
  });
}

exports.listCats = function() {
  return getEntities('cats').then(function(data){
    var coll = map(data, function(value) {
      return value;
    });
    return coll;
  });
}
